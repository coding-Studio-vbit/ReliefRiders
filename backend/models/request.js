const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	
	requestNumber: {type: Number, required: [true, 'request number is required.']},
	
	requesterID: mongoose.Schema.Types.ObjectId,
	
	requesterCovidStatus: Boolean,
	
	requestStatus: {
		type: String,
		default: 'PENDING',
		uppercase:true,
		enum: ['PENDING', 'UNDER DELIVERY', 'DELIVERED', 'CANCELLED', 'RIDER CONFIRMED']
		},
	
	requestType:{
		required: [true, 'request type is required.'],
		type: String,
		uppercase:true,
		enum: ['GENERAL', 'P&D']
		},
	
	itemsListType:{
		required: [true, 'request type is required.'],
		type: String,
		uppercase:true,
		enum: ['IMAGE', 'LIST']
		},
	
	itemsListImages: [String],
	
	itemsListList:[{
		itemName: {type: String},
		quantity: {type: Number}
	}],
	
	itemCategories: [
		{
			type: String,
			enum: ['GROCERIES', 'MEDICINES', 'MISC'], 
			uppercase:true,
	}],
	
	Remarks: {type: String, maxLength: 240},
	
	billsImageList: [String],

	rideImages: [String],


	// [ longitude, latitude ]

	pickupLocationCoordinates:{
		type: {type: String, default: "Point"},
		coordinates: [Number]
	},


	//Pickup location address MUST be there if the request is P&D and pickup coordinates have not been specified.
	pickupLocationAddress:{
		required: function(){return (this.requestType == "P&D" && !this.pickupLocationCoordinates)},
		addressLine: { type: String, maxLength: 240},
		area: String,
		city: String,
		pincode:{type:String, minLength: 6, maxLength:6},
	}

	dropLocationCoordinates:{
		type: {type: String, default: "Point"},
		coordinates: [Number]
	},

	//drop location address MUST be there if the drop coordinates have not been specified.
	dropLocationAddress:{
		required: function(){return !(this.dropLocationCoordinates)},
		addressLine: { type: String, maxLength: 240},
		area: String,
		city: String,
		pincode:{type:String, minLength: 6, maxLength:6},
	}
})


const requests = mongoose.model("requests", schema);
module.exports= requests;
