# Requester
-------------------

Note: All these endpoints are protected and need the Auth header to be set.

##  Profile:

###  GET /requester/profile<br>
 Get the profile details of a requester.

#### request body:
```json
	No request Body. Just set the auth header.
```
#### response:
```json
	{
		"status":"failure/success",
		"message":"<message>",
        "result": {}
	}
 ```


###  PUT /requester/profile<br>
Update the requester profile details.
#### request body:
```json
	{
		 "name":"newName",
     "yearOfBirth":"newYOB",
     "defaultAddress": 
       {
          "addressLine":"",
          "city":"",
          "pincode":""
       }
	}
```
#### response:
```json
	{
		"status":"failure/success",
		"message":"<message>"
	}
```
## My Requests:

### GET /requester/myRequests<br>
Get a list of all the requester's past and current requests.

#### request body:
```json
	No request body
```
#### response:
```json
	{
		"status":"failure/success",
		"message":[<This will be an array of request objects.>]
	}
```
## Cancel and Confirm Request:

### GET /requester/cancelRequest/:requestID<br>
cancel request specified by the requestID which is the request number of the request
#### request body:
```json
	No request body
```
#### response:
```json
	{
		"status":"failure/success",
		"message":""
	}
```
### GET /requester/confirmRequest/:requestID<br>
confirm request specified by the requestID which is the request number of the request
#### request body:
```json
	No request body
```
#### response:
```json
	{
		"status":"failure/success",
		"message":""
	}
```
