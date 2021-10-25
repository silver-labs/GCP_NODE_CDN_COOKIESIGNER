const  assert = require('assert');
const cookieSigner = require('./cdnCookieSigner')

describe('Sign', function() {
  describe('sign distinct url: http://35.186.234.33/index.html', function() {
    it('should return signed URLPrefix', function() {
      assert.equal(cookieSigner.signCookie('http://35.186.234.33/index.html','my-key',
      'nZtRohdNF9m3cKM24IcK4w==',1549751401), 'URLPrefix=aHR0cDovLzM1LjE4Ni4yMzQuMzMvaW5kZXguaHRtbA==:Expires=1549751401:KeyName=my-key:Signature=uImwlOBCPs91mlCyG9vyyZRrNWU=');
    });
  });
  describe('sign distinct url: http://www.example.com/foo/', function() {
    it('should return signed URLPrefix', function() {
      assert.equal(cookieSigner.signCookie('http://www.example.com/foo/','my-key',
      'nZtRohdNF9m3cKM24IcK4w==',1549751401), 'URLPrefix=aHR0cDovL3d3dy5leGFtcGxlLmNvbS9mb28v:Expires=1549751401:KeyName=my-key:Signature=Z9uYAu73YHioRScZDxnP-TnS274=');
    });
  });
});

