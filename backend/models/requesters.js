const mongoose = require("mongoose");

const user = new mongoose.Schema({

  phoneNumber: {
    type: Number,
    required: [true, "Phone Number is required"],
    min: 1000000000,
    max: 9999999999,
    validate:{
          validator: (phone)=> {
            var patt = /^[6789]\d{9}$/; return patt.test(phone)
          }
        }
  },
  name: {
      type: String,
      required: [true, "Name is required"],
      minLength: 3,
      maxLength: [40, "Exceeded Characters"]
  },
  yearOfBirth: {
    type: Number,
    required: true,
    minLength: 4,
    maxLength: 4,
    validate:{
          validator: (yearOfBirth)=>{
            var date = new Date();
            var year = date.getFullYear();
            return (year >= year - 100 && year <= year + 15)
          }
        }
},
 defaultAddress: {
       addressLine:{
         type:String
       },
       city:{
         type:String
       },
       pincode:{
         type:Number,
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
