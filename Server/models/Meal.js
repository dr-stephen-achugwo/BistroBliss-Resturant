const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	image: {
		type: String,
		required: true,
		default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
	},
	category: {
		type: String,
		enum: ["Breakfast", "Drinks", "Main Dishes", "Desserts"],
		required: true
	}
});


module.exports = mongoose.model('Meal', mealSchema)