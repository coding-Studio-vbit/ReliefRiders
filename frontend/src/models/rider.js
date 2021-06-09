import User from "./user"
export default class Rider extends User {
    /**
     * 
     * @param {string} number User's phone number
     * @param {string } name User's name
     */
    constructor(number,name){
        super(name)
        this.number = number
    }
    
}