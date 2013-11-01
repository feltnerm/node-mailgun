# mailgun

Mailgun API client.

## Getting Started
Install the module with: `npm install mailgun`

```javascript
var Mailgun = require('mailgun')
  , mg = new Mailgun('API_KEY', 'domain');

mailgun.post_message({ from: 'mark@feltner.me', to: 'president@whitehouse.gov', text: "Hello, Mr. President", callback: function (err, data) {
    console.log(data);
}});
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

### 0.0.1 - 1 Nov 2013
- Initial public release

## License
Copyright (c) 2013 Mark Feltner
Licensed under the MIT license.
