const crypto = require('crypto')

function base64Encode(input) {

    return Buffer.from(input).toString('base64')
    .replace(/\+/g, '-') 
    .replace(/\//g, '_') //urlsafe
    

}
function base64Decode(input) {

    input += Array(5 - input.length % 4).join('=');

    input = input
      .replace(/\-/g, '+') 
      .replace(/\_/g, '/'); //urlsafe

    return Buffer.from(input, 'base64');

}

function cdnCookieMiddleware(urlPath, keyName, key, expiresInMillisecondsFromNow, extraOptions = {}) {

    return (req, res, next) => {

    const cookie = signCookie(urlPath, keyName, key, Math.floor(( new Date(Date.now() + expiresInMillisecondsFromNow)).getTime()/1000))  
    res.cookie('Cloud-CDN-Cookie',cookie, {httpOnly: true, maxAge: expiresInMillisecondsFromNow, secure:true, encode: v => v, ...extraOptions});
  
    next()
  }

}

function signCookie(urlPrefix, keyName, key, expires) {

    const encodedURLPrefix = base64Encode(urlPrefix)
    const input = `URLPrefix=${encodedURLPrefix}:Expires=${expires}:KeyName=${keyName}`;

    const sig = base64Encode(crypto.createHmac('sha1', base64Decode(key)).update(Buffer.from(input, "ascii")).digest());



    return `${input}:Signature=${sig}`
}


module.exports = {signCookie, cdnCookieMiddleware}


