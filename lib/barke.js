"use strict";

var package_json = require('./../package.json');
var Sendgrid = require('sendgrid');

var Barke = function(api_user, api_key, options) {
	if( !(this instanceof Barke) ) {
	  return new Barke(api_user, api_key, options);
	}

	var options = options || {};
	
	options.protocol = options.protocol || "https";
	options.host = options.host || "esp.embarkemail.com";
	options.port = options.port || "";
	options.endpoint = options.endpoint || "/sendgrid/api/mail.send.json";

	var sendgrid = Sendgrid(api_user, api_key, options);

	/*
	 * Expose public API calls
	 */
	this.version         = package_json.version;
	this.sendgrid        = sendgrid;
	this.Email           = sendgrid.Email;
	this.api_user        = api_user;
	this.api_key         = api_key;
	this.send            = sendgrid.send;
	this.options         = this.options;
	return this;

}

module.exports = Barke;