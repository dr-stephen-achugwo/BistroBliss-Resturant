const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
	username: {
			type: String,
			required: true
	},    
	email: {
			type: String,
			required: true,
			unique: true
	},
	password: {
			type: String,
			required: true
	},
	isAdmin: {
			type: Boolean,
			required: true,
			default: false
	},
	bookings: [
			{
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Booking',
					default: []
			}
	]
});

userSchema.pre('save', async function(next){
	if(this.isModified('password') || this.isNew){
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(this.password, salt);
		this.password = hashedPassword;
		next();
	}
})

module.exports = mongoose.model('User', userSchema);