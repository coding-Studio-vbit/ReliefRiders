/**
 * Base user class for both rider and requester
 */
export default class User {
    /**
     * 
     * @param {string} name 
     */
    constructor(name,mobile){
        this.name = name;
        this.mobile = mobile;
    }
}