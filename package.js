Package.describe({
	name: 'nathantreid:rocketchat-joinme',
	version: '0.0.1',
	summary: '',
	git: '',
	documentation: 'README.md'
});


// Loads all i18n.json files into tapi18nFiles
//var _ = Npm.require('underscore');
//var fs = Npm.require('fs');
//tapi18nFiles = fs.readdirSync('packages/rocketchat-gitlab/i18n').forEach(function (filename) {
//	if (fs.statSync('packages/rocketchat-gitlab/i18n/' + filename).size > 16) {
//		return 'i18n/' + filename;
//	}
//});


Package.onUse(function (api) {
	api.versionsFrom('1.1.0.3');

	//api.use('tap:i18n@1.5.1');
	api.use('coffeescript');
	api.use('rocketchat:lib@0.0.1');

	//api.addFiles('package-tap.i18n');
	//api.addFiles(tapi18nFiles);

	api.addFiles([
		'startup.coffee',
		'server/methods/saveJoinMeAccessToken.js'
	], 'server');

	api.addFiles([
		'client/hello-shim-module.js',
		'vendor/hello.min.js',
		'client/hello-shim-export.js',
		'vendor/hello.joinme.js',
		'client/joinme.js'
	], 'client');

	api.export('hello');
});
