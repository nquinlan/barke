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

	sendgrid.Email.prototype.setSendDate = function(date) {
		if(typeof this.embarkeapi == "undefined") {
			this.embarkeapi = {};
		}
		var dateObj;

		if (typeof date == "undefined") {
			dateObj = new Date();
		}

		if (typeof date == "string") {
			dateObj = new Date(date);
		}

		if (typeof date == "object") {
			dateObj = date;
		}

		this.embarkeapi.sendDate = dateObj;
	};

	sendgrid.Email.prototype.setMaxSendHours = function(hours) {
		if(typeof this.embarkeapi == "undefined") {
			this.embarkeapi = {};
		}
		this.embarkeapi.maxSendHours = hours;
	};

	sendgrid.Email.prototype.setCampaignId = function(id) {
		if(typeof this.embarkeapi == "undefined") {
			this.embarkeapi = {};
		}
		this.embarkeapi.campaignId = id;
	};


	sendgrid.Email.prototype.setMailAccount = function(account) {
		if(typeof this.embarkeapi == "undefined") {
			this.embarkeapi = {};
		}
		this.embarkeapi.mailAccount = account;
	};


	sendgrid.Email.prototype.addTag = function(tag) {
		if(typeof this.embarkeapi == "undefined") {
			this.embarkeapi = {};
		}

		if(typeof this.embarkeapi.tags == "undefined") {
			this.embarkeapi.tags = [];
		}

		this.embarkeapi.tags.push(tag);
	};

	sendgrid.Email.prototype.setTags = function(tags) {
		if(typeof this.embarkeapi == "undefined") {
			this.embarkeapi = {};
		}

		if(typeof tags == "string"){
			tags = [tags];
		}

		this.embarkeapi.tags = tags;
	};



	var send = function (email, cb) {

		if(typeof email !== "object") {
			if(typeof cb === "function") {
				cb(new Error("send requires the first argument be an Email object or javascript object"));
			}
			return false;
		}

		if (email.constructor !== sendgrid.Email) {
			email = new sendgrid.Email(email);
		}

		if(typeof email.embarkeapi == "undefined" || typeof email.embarkeapi.sendDate == "undefined"){
			email.setSendDate();
		}

		if(email.embarkeapi.sendDate.constructor !== Date) {
			email.setSendDate(email.embarkeapi.sendDate);
		}

		email.embarkeapi.sendDate = email.embarkeapi.sendDate.toISOString();

		email.addHeader("x-embarkeapi", JSON.stringify(email.embarkeapi));

		sendgrid.send(email, cb);
	}

	/*
	 * Expose public API calls
	 */
	this.version         = package_json.version;
	this.sendgrid        = sendgrid;
	this.Email           = sendgrid.Email;
	this.api_user        = api_user;
	this.api_key         = api_key;
	this.send            = send;
	this.options         = this.sendgrid.options;
	return this;

}

module.exports = Barke;