var Barke = require("../../index.js")
  , barke
  , email
  ;

var nock  = require("nock");

var defaultMessage = {
  to : "to@example.com",
  from : "from@example.com",
  subject : "[barke]",
  text : "This is a text body",
  html : "<h2>This is an html body</h2>"
}

describe("barke.js", function () {
	it("should have uri set to the default", function() {
		assert("https://esp.embarkemail.com/sendgrid/api/mail.send.json", barke.options.uri);
	});

	it("should allow uri to change", function() {
		var options   = { "protocol" : "http", "host" : "barke.org", "endpoint" : "/send", "port" : "80" };
		var barkebarke = Barke("api_user", "api_key", options);
		assert("http://barke.org:80/send", barkebarke.options.uri);
	});

	it("should send a post to the endpoint", function () {
		var embarke = nock("https://esp.embarkemail.com")
						.post("/sendgrid/api/mail.send.json")
						.reply(200, function (uri, requestBody) {
							assert.notEqual(undefined, requestBody);
							return { message: "success" };
						});
		barke.send(email, function (err, res) {
			assert.equal(null, err);
		});
	});

	describe("#Email", function () {
		it("should export the Email object", function() {
			assert.notEqual(undefined, barke.Email);
		});

		describe("#embarkeapi", function () {
			describe("#setSendDate", function () {
				it("should create an embarkeapi object when set", function() {
					email.setSendDate();
					assert.notEqual(undefined, email.embarkeapi);
				});

				it("should set sendDate", function() {
					email.setSendDate();
					assert.notEqual(undefined, email.embarkeapi.sendDate);
				});

				it("should set sendDate to a Date object", function() {
					email.setSendDate();
					assert.strictEqual(Date, email.embarkeapi.sendDate.constructor);
				});

				it("should accept Date input", function() {
					var date = new Date("2011-11-11T11:11:11.111Z");
					email.setSendDate(date);
					assert.strictEqual(date, email.embarkeapi.sendDate);
				});


				it("should accept string input", function() {
					var date = "2011-11-11T11:11:11.111Z";
					email.setSendDate(date);
					assert.strictEqual((new Date(date)).toISOString(), email.embarkeapi.sendDate.toISOString());
				});
			});

			describe("#setMaxSendHours", function () {
				it("should create an embarkeapi object when set", function() {
					email.setMaxSendHours();
					assert.notEqual(undefined, email.embarkeapi);
				});

				it("should set maxSendHours", function() {
					email.setMaxSendHours(24);
					assert.strictEqual(24, email.embarkeapi.maxSendHours);
				});
			});

			describe("#setCampaignId", function () {
				it("should create an embarkeapi object when set", function() {
					email.setCampaignId();
					assert.notEqual(undefined, email.embarkeapi);
				});

				it("should set campaignId", function() {
					email.setCampaignId("happy");
					assert.strictEqual("happy", email.embarkeapi.campaignId);
				});
			});

			describe("#setMailAccount", function () {
				it("should create an embarkeapi object when set", function() {
					email.setMailAccount();
					assert.notEqual(undefined, email.embarkeapi);
				});

				it("should set mailAccount", function() {
					email.setMailAccount("my-favorite-sendgrid");
					assert.strictEqual("my-favorite-sendgrid", email.embarkeapi.mailAccount);
				});
			});

			describe("#addTag", function () {
				it("should create an embarkeapi object when set", function() {
					email.addTag();
					assert.notEqual(undefined, email.embarkeapi);
				});

				it("should add a tag", function() {
					email.addTag("cool");
					assert.deepEqual(["cool"], email.embarkeapi.tags);
				});

				it("should add tags", function() {
					email.addTag("cool");
					email.addTag("awesome");
					assert.deepEqual(["cool", "awesome"], email.embarkeapi.tags);
				});
			});

			describe("#setTags", function () {
				it("should create an embarkeapi object when set", function() {
					email.setTags();
					assert.notEqual(undefined, email.embarkeapi);
				});

				it("should set tags", function() {
					email.setTags(["rockin", "neat"]);
					assert.deepEqual(["rockin", "neat"], email.embarkeapi.tags);
				});

				it("should set tags as strings", function() {
					email.setTags("nifty");
					assert.deepEqual(["nifty"], email.embarkeapi.tags);
				});
			});

			it("should create an embarkeapi object before sending", function() {
				barke.sendgrid.send = function (email, cb) {
					// console.log(email);
					assert.notEqual(undefined, email.embarkeapi);
				}
				barke.send(email);
			});

			it("should set a sendDate in the embarkeapi object", function() {
				barke.sendgrid.send = function (email, cb) {
					assert.notEqual(undefined, email.embarkeapi.sendDate);
				}
				barke.send(email);
			});

			it("should place an x-embarkeapi object in the message headers before sending", function() {
				barke.sendgrid.send = function (email, cb) {
					assert.notEqual(undefined, email.headers["x-embarkeapi"]);
				}
				barke.send(email);
			});

			it("should set the x-embarkeapi to be valid json", function() {
				barke.sendgrid.send = function (email, cb) {
					assert.doesNotThrow(function () {
						JSON.parse(email.headers["x-embarkeapi"])
					});
				}
				barke.send(email);
			});
		});
	});

	beforeEach(function() {
		barke = Barke("api_user", "api_key");
		email = new barke.Email(defaultMessage);
	});
});