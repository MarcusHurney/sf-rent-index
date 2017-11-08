var nodemailer = require('nodemailer');
var nodemailerMgTransport = require('nodemailer-mailgun-transport');
var AUTH = {
	auth: {
		api_key: 'key-a2e26645866d651c5c05ff89d3681a2c',
		domain: 'sandbox352d336996184a8480c4b98213e74cf2.mailgun.org'
	}
};
exports.TRANSPORT = nodemailer.createTransport(nodemailerMgTransport(AUTH));
exports.DEFAULT_FROM = "Marcus <Marcus@sfrentindex.com>";