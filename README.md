# barke

_A simple node library for Embarke, built off SendGrid's node library._

**This library is entirely a proof of concept and not recommended for use, _yet_.** 

## Usage

This library may be used just as [SendGrid's Node library](https://github.com/sendgrid/sendgrid-nodejs), however you must specify your Embarke header:

```js
var barke = require("barke")("your_embarke_username", "your_embarke_password");
barke.send({
  to:       'example@example.com',
  from:     'other@example.com',
  headers : {
    'x-embarkeapi' : '{ "sendDate": "2013-05-26T18:00Z",  "maxSendHours": 24, "campaignId": "My Campaign", "mailAccount": "esp-account-username", "tags": ["My custom tag1", "My tag 2"] }'
  },
  subject:  'Hello World',
  text:     'My first email through Embarke.'
}, function(err, json) {
  if (err) { return console.error(err); }
  console.log(json);
});
```

## Future

In the future, it would be great to have an Embarke header generator, similar to SendGrid's [smtpapi generator](https://github.com/sendgrid/smtpapi-nodejs).