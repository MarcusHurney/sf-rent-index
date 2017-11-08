var async = require('async');
var mailgun = require('../config/mailgun');
var nodemailer = require('nodemailer');
var nodemailerMgTransport = require('nodemailer-mailgun-transport');
var TRANSPORT = mailgun.TRANSPORT;

exports.sendInternalEmail = function() {
	TRANSPORT.sendMail({
		to: ['varun.bhartia@gmail.com', 'marcushurney@gmail.com'],
		from: 'varun.bhartia@gmail.com',
		subject: 'New Form Submission',
		text: "test"
	});
};