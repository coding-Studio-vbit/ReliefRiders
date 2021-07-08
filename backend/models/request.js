const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	
	date:{
		type: String,
		default: ()=>{
			var now = new Date();
			return (now.getDate() + '/' + (now.getMonth()+1) + '/' + now.getFullYear());
		}
	},
	
	requestNumber: {type: Number, required: [true, 'request number is required.']},
	
	requesterID: mongoose.Schema.Types.ObjectId,
	riderID:{
		type: mongoose.Schema.Types.ObjectId,
		default: null
	},
	
	requesterCovidStatus: Boolean,

	noContactDelivery: Boolean, // Added No Contact Delivery

	requestStatus: {
		type: String,
		default: 'PENDING',
		uppercase:true,
		enum: ['PENDING', 'UNDER DELIVERY', 'DELIVERED', 'CANCELLED BY REQUESTER', 'RIDER CONFIRMED', 'CANCELLED BY RIDER']
		},
	
	requestType:{
		required: [true, 'request type is required.'],
		type: String,
		uppercase:true,
		enum: ['GENERAL', 'P&D']
		},
	
	itemsListImages: [String],
	
	itemsListList:[{
		itemName: {type: String},
		quantity: {type: String} //Yeah String only. Thank revanth. cuz units are different for things. The world is weird and the units are weirder.
	}],
	
	itemCategories: [
		{
			type: String,
			enum: ['GROCERIES', 'MEDICINES', 'MISC'], 
			uppercase:true,
	}],
	
	remarks: {type: String, maxLength: 240},
	
	billsImageList: [String], 

	rideImages: [String],


	// [ longitude, latitude ]

	pickupLocationCoordinates:{
		type: {type: String, default: "Point"},
		coordinates: [Number]
	},

	//Pickup location address MUST be there if the request is P&D and pickup coordinates have not been specified.
	pickupLocationAddress:{
		address: { type: String, maxLength: 240},
		area: String,
		city: String,
	},

	dropLocationCoordinates:{
		type: {type: String, default: "Point"},
		coordinates: [Number]
	},

	//drop location address MUST be there if the drop coordinates have not been specified.
	dropLocationAddress:{
		address: { type: String, maxLength: 240},
		area: String,
		city: String,
	}
})


const requests = mongoose.model("requests", schema);
module.exports= requests;
