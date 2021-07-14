# Auth
-------------------

## Login Endpoints:

###  /auth/login/requestOTP<br>
 request an OTP for registered riders or requesters. also works as resend OTP.

#### request body:
```json
	{
		"phone":"<phone number here>",
		"type":"<requester/rider>"
	}
```
#### response:
```json
	{
		"status":"failure/success",
		"message":"<message>"
	}
 	note: 	The generated OTP will be printed by the server on the console.
		On success, the message will contain the token.
		On failure, the message will contain the error message.
```


###  /auth/login/verifyOTP<br>
get OTP verified for registered riders/requesters.

#### request body:
```json
	{
		"phone":"<10 digit phone number>",
		"OTP":"<6 digit OTP here>",
		"type":"<userType here>"
	}
```
#### response:
```json
	{
		"status":"failure/success",
		"message":"<message>"
	}
```
## Registration Endpoints:

###  /auth/register/requestOTP<br>
request OTP for registration for a new rider/requester.

#### request body:
```json
	{
		"type":"<rider/requester>",
		"phone":"<10 digit phone number>"
	}
```
#### response:
```json
	{
		"status":"failure/success",
		"message":"<message>"
	}
```
