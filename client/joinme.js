hello.init({
	joinme: RocketChat.settings.get('API_JoinMe')
}, {
	redirect_uri: '/packages/rocketchat-joinme/client/redirect.html',
	scope: 'user,scheduler,start_meeting'
});

RocketChat.slashCommands.add('joinme', joinMe, {description: 'Start a join.me chat'});


function joinMe(command, params, item) {
	var joinMe = hello('joinme');
	Q.fcall(getAccessToken)
		.then(createMeeting);


	function getAccessToken() {
		var settings = Meteor.user().settings;
		var accessToken;
		if (!settings || !(accessToken = settings.joinMeAccessToken))
			return authorizeJoinMe();
		else {
			hello.utils.store('joinme', {
				access_token: accessToken,
				expires: '-1'
			});
		}
	}

	function authorizeJoinMe() {
		var deferred = Q.defer();
		joinMe.login().then(function (result) {
			Meteor.call('saveJoinMeAccessToken', result.authResponse.access_token);
			deferred.resolve();
		});

		return deferred.promise;
	}

	function createMeeting() {
		joinMe.api('/meetings/start', 'post', function (result) {
			var msg = item;
			msg.msg = 'join.me viewer link: ' + result.viewerLink;

			Meteor.call('sendMessage', msg);
			window.open(result.presenterLink, '_blank');
		});
	}

}
