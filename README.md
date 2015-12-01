# angular-digits

This is an angular wrapper for [twitter fabric's digits sdk](https://dev.twitter.com/twitter-kit/web/digits). It bridges the gap between Angular's digest cycle and the foreign SDK by applying the asynchronous events to the digest cycle. It also provides convenient models to provide insight to the responses from the API (if the workflow was closed by the user, popup was blocked, etc).


## Example usage

```js
angular.module('app', ['atticoos.digits'])

.config(function (DigitsProvider) {
  // configure the provider before the application's run phase
  DigitsProvider.setConsumerKey('XXX');
})

.run(function (Digits) {
  var options = {
    accountFields: Digits.AccountFields.Email // Access Email Addresses
  };


  Digits.login(options).then(function (loginResponse) {
    // successfully logged in
  }).catch(function (error) {
    // a decorated error object describing the issue logging in
    if (error.wasPopupBlocked()) {
      // popup blocked
    } else if (error.wasWindowClosed()) {
      // user closed the window
    } else {
      // something else
    }
  });
});
```

## Login Options

You can customize the Digits for Web sign in flow to collect user email addresses or pre-fill phone number information, based on your app’s needs.

For more informations go to [Digits SDK Sign in Options Doc](https://docs.fabric.io/web/digits/sign-in-options.html#callback-url)

## Response Objects
This wrapper comes with some convenient models for better transparency of state and response information from the Digits SDK. It is suggested by the [Digits SDK Docs](https://dev.twitter.com/twitter-kit/web/digits) that you securely verify the response data when logging in.

### Login Response
```js
Digits.login().then(function (loginResponse) { });
```
#### loginResponse.getOAuthHeaders()
Returns: `Object`

Returns the headers used to perform verification of the login response (`X-Verify-Credentials-Authorization` and `X-Auth-Service-Provider`)
```js
{
  authorization: 'xx',
  url: 'https://xx'
}
```

### Error Response
```js
Digits.login().catch(function (loginError) { });
```

#### loginError.wasWindowClosed()
Returns: `Boolean`

Indicates if the workflow was aborted directly by the user closing the window before the process had completed

#### loginError.wasPopupBlocked()
Returns: `Boolean`

Indicates if the browser prevented the workflow by blocking the popup


#### loginError.type
The `type` attribute from the original response object

#### loginError.message
The `message` attribute from the original response object
