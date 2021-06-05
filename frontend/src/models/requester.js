import User from "./user"
export default class Requester extends User {
    /**
     * 
     * @param {string} number User's phone number
     * @param {string } name User's name
     * @param {number} yearOfBirth Year of Birth
     */
    constructor(number,name,yearOfBirth){
        super(name)
        this.number = number
        this.yearOfBirth = yearOfBirth
    }
    /**
     * Logout the user and destroy user related data
     * //TODO
     */
    logout(){
        //TODO
    }
}