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

    static from(json){
        return Object.assign(new Request(),json)
    }
}
