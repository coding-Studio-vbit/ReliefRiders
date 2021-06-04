import User from "./user"
export default class Requester extends User {

    constructor(number,name,yearOfBirth){
        super(name)
        this.number = number
        this.yearOfBirth = yearOfBirth
    }
    /**
     * Logout the user and destroy user related data
     */
    logout(){
        //TODO
    }
}