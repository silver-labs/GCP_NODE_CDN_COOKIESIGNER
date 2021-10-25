# GCP_NODE_CDN_COOKIESIGNER

A simple node helper to create a signed cookie for access to a secure GCP CDN endpoint, as per: https://cloud.google.com/cdn/docs/using-signed-cookies.

There are 2 exports:

## signCookie

Base function to sign a cookie

### parameters

* urlPath: url Path that cookie provides access for
* keyName: keyname as difined in CDN configuration
* key: the base64 key for CDN cookie generation
* expires: expires in Epoch time

## cdnCookieMiddleware

A basic Express middlware using signCookie.

### parameters

* urlPath: url Path that cookie provides access for
* keyName: keyname as difined in CDN configuration
* key: the base64 key for CDN cookie generation
* expiresInMillisecondsFromNow: How many millisends from now is the generated cookie valid for
* extraOptions: extra cookie options available for Express