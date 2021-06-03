
/**
 * A class which provides auth operations.
 */
class AuthProvider{
    constructor(){
        //empty for now
    }
    /**
     * 
     * @param {string} number 
     * @param {boolean} requester default true.
     * Pass false , if you want to logout the rider

     */
    login(number,requester=true){
        
    }
   
    /**
     * 
     * @param {number} otp 
     */
    verify(otp){

    }
    /**
     * 
     * @param {string} number 
     * @param {string} name 
     * @param {number} yearOfBirth 
     */
    registerRequester(number,name,yearOfBirth){

    }
    /**
     * 
     * @param {string} number 
     * @param {string} name 
     */
    registerRider(number,name){

    }
    /**
     * 
     * @param {string} id User id
     * @param {boolean} requester Default - true.
     * Pass false , if you want to logout the rider
     */
    logout(id,requester=true){

    }
}