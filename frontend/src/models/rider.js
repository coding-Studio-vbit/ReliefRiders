import User from "./user"
export default class Rider extends User {

    constructor(number,name){
        super(name)
        this.number = number
    }
    /**
     * Logout the user and destroy user related data
     */
    logout(){

    }
}