const mongoose = require("mongoose");

const user = new mongoose.Schema({

  phoneNumber: {
    type: Number,
    required: [true, "Phone Number is required"],
    min: 1000000000,
    max: 9999999999,
    validate:{
          validator: (phone)=> {
            var patt = /^[789]\d{9}$/; return patt.test(phone)
          }
        }
  },
  name: {
      type: String,
      required: [true, "Name is required"],
      minLength: 3,
      maxLength: [40, "Exceeded Characters"]
  },
  dateOfBirth: {
    type: Date,
    required: true,
    trim: true
},
 defaultAddress: {
       addressLine:{
         type:String,
         required:true
       },
       state: {
         type:String,
         required:true
       },
       city:{
         type:String,
         required:true
       },
       Pincode:{
         type:Number,
         required:true,
         validate:{
              validator: (pincode)=>{return (pincode>=100000 && pincode<=999999)}
          }
        }
 },
 location: {
   latitude : {
     type: Number,
     minimum: -90,
     maximum: 90,
     default: null
   },
   longitude : {
     type: Number,
     minimum: -180,
     maximum: 180,
     default: null
   }
 }
});


const requesters = mongoose.model("requesters", user);

module.exports = requesters;
