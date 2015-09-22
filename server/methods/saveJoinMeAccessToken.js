Meteor.methods({
	saveJoinMeAccessToken: function (accessToken) {
		console.log('saveJoinMeAccessToken')
		if (!Meteor.userId()) return false;

		Meteor.users.update(Meteor.userId(), {$set: {"settings.joinMeAccessToken": accessToken}});
		return true;
	}
});
