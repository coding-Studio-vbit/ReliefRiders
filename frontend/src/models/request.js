/**
 * Request Model class for request placed by requester.
 * 
 * Check the class for it's properties.
 */
export default class Request {

       
    constructor(){
        this.requesterID = "";

        this.requestStatus="";
        this.requestType="";
        this.itemsListImages=[
            ""
        ];
        this.itemsListList=[
            {
                itemName:"",
                quantity:""
            }
        ];
        this.itemCategories=[
            
                "",
                ""
            
        ];
        this.remarks= "";
        this.billsImageList=[""];
        this.rideImages=[""];
        this.pickupLocationAddress={
            addressLine:"",
            area:"",
            city:"",
            pincode:""

        };
        this.dropLocationAddress={
            addressLine:"",
            area:"",
            city:"",
            pincode:""

        };
    }
    /**
     * @param {any} json Request json from server
     * @returns new Request object from json
     */
    static from(json){
        return Object.assign(new Request(),json)
    }
}
