const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const userRepo = require('../repos/userRepo');
const bookingService = require('./bookingServices');
const mealService = require('./mealServices');
const { WrongEmailOrPassword } = require('../errors/CustomErrors');


const signUp = async (user) => {
	try {
		const foundUser = await userRepo.findUserByEmail(user.email);
		if (foundUser) {
			throw new Error('Email already exists.');
		}
		const newUser = await userRepo.createUser(user);
		const token = jwt.sign({
			id:newUser._id,
			isAdmin: newUser.isAdmin,
			email: newUser.email, 
			username: newUser.username
		}, config.jwt.secret, {expiresIn: '1d'});
		return {newUser, token};
	} catch (error) {
		throw new Error(error.message);
	}
}


const login = async (email, password) => {
	try {
			const foundUser = await userRepo.findUserByEmail(email);
			if (!foundUser) {
					const err = new WrongEmailOrPassword();
					throw err;
			}
			const isMatch = await bcrypt.compare(password, foundUser.password);
			
			if (!isMatch) {
					const err = new WrongEmailOrPassword();
					throw err;
			}
			
			const token = jwt.sign({
					id: foundUser._id ,
					isAdmin: foundUser.isAdmin,
					email: foundUser.email, 
					username: foundUser.username
			}, config.jwt.secret, { expiresIn: config.jwt.expiration });
			return {token, user: foundUser};
	} catch (error) {
			throw new Error(error.message);
	}
}

const bookTable = async (booking) => {
	try {
			const newBooking = await bookingService.createBooking(booking);
			return newBooking;
	} catch (error) {
			throw new Error(error.message);
	}
}

const viewMenu = async () => {
	try {
			const meals = await mealService.getAllMeals();
			return meals;
	} catch (error) {
			throw new Error(error.message);
	}
}

const getUser = async (id) => {
	try {
			const user = await userRepo.findUserById(id);
			return user;
	} catch (error) {
			throw new Error(error.message);
	}
}

const getUsers = async () => {
	try {
			const users = await userRepo.findAllUsers();
			return users;
	} catch (error) {
			throw new Error(error.message);
	}
}

const updateUser = async (id, user) => {
	try {
			const updatedUser = await userRepo.updateUser(id, user);
			const token = jwt.sign({
					id: updatedUser._id,
					isAdmin: updatedUser.isAdmin,
					email: updatedUser.email, 
					username: updatedUser.username
			}, config.jwt.secret, { expiresIn: config.jwt.expiration });
		
			return {updatedUser, token};
	} catch (error) {
			throw new Error(error.message);
	}
}

const getBookings = async (id) => {
	try {
			const bookings = await bookingService.getAllUserBookings(id);
			return bookings;
	} catch (error) {
			throw new Error(error.message);
	}
}

module.exports = {
	signUp,
	login,
	bookTable,
	viewMenu,
	getUser,
	getUsers,
	updateUser,
	getBookings
}