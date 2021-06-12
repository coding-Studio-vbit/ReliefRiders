**Auth**
==========

Login Endpoints:
----------------

	/auth/requestOTP - Request OTP for Login.

	request body:
	{
		"phone":"<phone number here>",
		"type":"<requester/rider>"
	}

	response:
	{
		"status":"failure/success"
		"message":""
	}
 	note: 	The generated OTP will be printed by the server on the console.
		On success, the message will contain the token.
		On failure, the message will contain the error message.


	/auth/verifyOTP - Verify OTP

	request body:
	{
		"phone":"<phone number here>",
		"OTP":"<6 digit OTP here>"
	}
	response:
	{
		"status":"failure/success"
		"message":""
	}
