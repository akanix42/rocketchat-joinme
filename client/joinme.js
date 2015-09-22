hello.init({
	joinme: RocketChat.settings.get('API_JoinMe')
}, {
	redirect_uri: '/packages/rocketchat-joinme/client/redirect.html',
	scope: 'user,scheduler,start_meeting'
});

RocketChat.slashCommands.add('joinme', joinMe, {description: 'Start a join.me chat'});


function joinMe(command, params, item) {
	var joinme = hello('joinme');
	loginIfNeedsAccessToken(joinme, item);
}

function loginIfNeedsAccessToken(joinme, item) {
	var settings = Meteor.user().settings;
	var accessToken;
	if (!settings || !(accessToken = settings.joinMeAccessToken))
		authorizeJoinMe(joinme, item, createMeeting);
	else {
		hello.utils.store('joinme', {
			access_token: accessToken,
			expires: '-1'
		});
		createMeeting(joinme, item);
	}
}

function createMeeting(joinme, item) {
	joinme.api('/meetings/start', 'post', function (result) {
		var msg = item;
		msg.msg = 'join.me viewer link: ' + result.viewerLink;

		Meteor.call('sendMessage', msg);
		window.open(result.presenterLink, '_blank');
	});
}

function authorizeJoinMe(joinme, item) {
	joinme.login().then(function (result) {
		Meteor.call('saveJoinMeAccessToken', result.authResponse.access_token, function (err, results) {
			if (err)
				alert('Unable to create meeting: \n' + JSON.stringify(err));
		});
		createMeeting(joinme, item);
	});
}
