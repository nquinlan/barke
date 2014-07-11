# barke

_A simple node library for Embarke, built off SendGrid's node library._

## Usage

This library may be used just as [SendGrid's Node library](https://github.com/sendgrid/sendgrid-nodejs), however it further implements [Embarke's API options](http://www.embarke.com/embarke-web-api/):

```js
var barke = require("barke")("your_embarke_username", "your_embarke_password");
barke.send({
  to:             "example@example.com",
  from:           "other@example.com",
  subject:        "Hello World",
  text:           "My first email through Embarke.",
  embarkeapi:     { 
    sendDate:     new Date(), 
    maxSendHours: 24,
    campaignId:   "My Campaign",
    mailAccount:  "esp-account-username",
    tags:         ["My custom tag1", "My tag 2"]
  }
}, function(err, json) {
  if (err) { return console.error(err); }
  console.log(json);
});
```

### Email
Email helps you more powerfully prepare your message to be sent, it is built off [SendGrid's Email Object](https://github.com/sendgrid/sendgrid-nodejs#email).

To get started create an Email object where params is a javascript object. You can pass in as much or as little to `params` as you want.

```js
var barke = require("barke")(api_user, api_key);
var email = new barke.Email(params);
```

#### Sample

Here is a sample for using it.

```js
var barke = require("barke")(api_user, api_key);
var email = new barke.Email({
  to:            "foo@example.com",
  from:          "you@example.org",
  subject:       "Subject goes here",
  text:          "Hello world",
  embarkeapi: {
    sendDate:     new Date(),
    maxSendHours: 24,
	campaignId:   "My Campaign",
	mailAccount:  "esp-account-username",
	tags:         ["My custom tag1", "My tag 2"]
  }
});
barke.send(email, function(err, json) {
  if (err) { return console.error(err); }
  console.log(json);
});
```

#### Available params

```javascript
var params = {
  smtpapi:  new sengrid.SmtpapiHeaders(),
  embarkeapi: {
    sendDate: (new Date() | ""),
    maxSendHours: null,
    campaignId: "",
    mailAccount: "",
    tags: []
  }
  to:       [],
  toname:   [],
  from:     "",
  fromname: "",
  subject:  "",
  text:     "",
  html:     "",
  bcc:      [],
  replyto:  "",
  date:     new Date(),
  files: [
    {
      filename:     "",           // required only if file.content is used.
      contentType:  "",           // optional
      cid:          "",           // optional, used to specify cid for inline content
      path:         "",           //
      url:          "",           // == One of these three options is required
      content:      ("" | Buffer) //
    }
  ],
  file_data:  {},
  headers:    {}
};
```

NOTE: anything that is available in the Email constructor is available for use in the `barke.send` function.

#### Setting params

You can set params like you would for any standard JavaScript object.

```js
var barke  = require("barke")(api_user, api_key);
var email     = new barke.Email({to: "person@email.com"});
email.to      = "different@email.com";
email.subject = "This is a subject";
email.embarkeapi.maxSendHours = 48;
```

#### SendGrid Default Parameters
There are a number of SendGrid default parameters that can be set using [a variety of methods](https://github.com/sendgrid/sendgrid-nodejs#setting-params) provided in the [SendGrid Node Library Documentation](https://github.com/sendgrid/sendgrid-nodejs#setting-params).

#### Embarke Specific Parameters
A description of these parameters and their meanings can be found in the [Embarke API docs](http://www.embarke.com/embarke-web-api/).

##### setSendDate
You may set the send date a variety of ways.

Setting a send date with no options sets the date to the current time. (This is also the default, if you do nothing.)

```js
var email = new barke.Email(); 
email.setSendDate();
barke.send(email, function(err, json) { });
```

You can set the send date with a `Date` object.

```js
var email = new barke.Email(); 
var date = new Date("2011-11-11T11:11:11.111Z");
email.setSendDate(date);
barke.send(email, function(err, json) { });
```

You can set the send date with a `string`.

```js
var email = new barke.Email(); 
email.setSendDate("2011-11-11T11:11:11.111Z");
barke.send(email, function(err, json) { });
```

##### setMaxSendHours
```js
var email = new barke.Email(); 
email.setMaxSendHours(20);
barke.send(email, function(err, json) { });
```

##### setCampaignId
```js
var email = new barke.Email(); 
email.setMaxSendHours("The Coolest Campaign Ever");
barke.send(email, function(err, json) { });
```

##### setMailAccount
```js
var email = new barke.Email(); 
email.setMailAccount("my-sendgrid-account");
barke.send(email, function(err, json) { });
```

##### addTag
You may add multiple tags using addTag.

```js
var email = new barke.Email(); 
email.addTag("happy");
email.addTag("go");
email.addTag("lucky");
barke.send(email, function(err, json) { });
```

##### setTags
You may set the tags using setTags.

```js
var email = new barke.Email(); 
email.setTags(["super", "nifty"]);
barke.send(email, function(err, json) { });
```

You may also provide a string if you wish.

```js
var email = new barke.Email(); 
email.setTags("awesome");
barke.send(email, function(err, json) { });
```

## Options
All options provided by the options parameter are passed through to [sendgrid-nodejs](https://github.com/sendgrid/sendgrid-nodejs), to learn more about what they do see [the options in the library's readme](https://github.com/sendgrid/sendgrid-nodejs#options).

## Issues
When filing an issue please include your ```package.json``` and the output of
```npm ls barke``` to help us isolate and reproduce the issue

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Running Tests

The existing tests can be run using [Mocha](http://visionmedia.github.io/mocha/) with the following command:

```bash
npm test
```

You can run individual tests with the following command:

```bash
./node_modules/.bin/mocha [path to test].js
```


## Future

In the future, it would be great to tear out embarkeapi to create an Embarke header generator, similar to SendGrid's [smtpapi generator](https://github.com/sendgrid/smtpapi-nodejs).

## License

Licensed under the MIT License.

Significant portions of this README and library are taken from or inspired by [sendgrid-nodejs](https://github.com/sendgrid/sendgrid-nodejs) and [smtpapi-nodejs](https://github.com/sendgrid/smtpapi-nodejs), both are licensed MIT.
