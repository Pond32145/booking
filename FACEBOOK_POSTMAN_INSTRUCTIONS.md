# Testing Facebook OAuth with Postman

## Step 1: Get Authorization Code

1. Open your browser and visit this URL:
```
https://www.facebook.com/v19.0/dialog/oauth?client_id=1147647373893210&redirect_uri=http://localhost:5212/api/auth/facebook/callback&scope=public_profile
```

2. Log in with your Facebook account and grant permissions
3. You'll be redirected to a URL like:
```
http://localhost:5212/api/auth/facebook/callback?code=AQD234...#_=_ 
```
4. Copy the code parameter value (everything between `code=` and `#_=_`)

## Step 2: Test with Postman

1. Open Postman
2. Create a new POST request to:
```
http://localhost:5212/api/auth/facebook/callback
```

3. In the "Body" tab:
   - Select "x-www-form-urlencoded"
   - Add a key-value pair:
     - Key: `code`
     - Value: [paste the authorization code you copied]

4. Click "Send"

## Expected Response

If successful, you should get a redirect response (HTTP 302) with a Location header that contains the frontend URL with token parameters:
```
Location: http://localhost:5175?token=eyJhbGci...&email=user@example.com&firstName=John&lastName=Doe
```

## Alternative: Direct User Info Test

You can also test by sending user information directly as query parameters:

```
POST http://localhost:5212/api/auth/facebook/callback?email=test@example.com&firstName=John&lastName=Doe&providerId=12345
```

With an empty body (or x-www-form-urlencoded with no parameters).

This simulates the fallback scenario where user info is provided directly rather than obtained through the OAuth flow.