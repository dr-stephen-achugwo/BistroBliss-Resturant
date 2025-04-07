const User = require('../models/User');

const createUser = async (user) => {
	try{
			const newUser = new User(user);
			return await newUser.save();
	}catch(err){
			throw new Error(err.message);
	}
}

const findUserByEmail = async (email) => {
	try{
			return await User.findOne({email});
	}catch(err){
			throw new Error(err.message);
	}
}

const updateUser = async (id, updatedUser) => {
    try {
        const user = await User.findById(id);
        if(!user) {
            throw new Error('User not found');
        }
        user.username = updatedUser.username;
        user.email = updatedUser.email;
        user.password = updatedUser.password;
        await user.save();
        return user;
    } catch(err) {
        throw new Error(err.message);
    }
}

const findUserById = async (id) => {
    try{
        return await User.findById(id);
    }catch(err){
        throw new Error(err.message);
    }
}

const findAllUsers = async () => {
    try{
        return await User.find({});
    }catch(err){
        throw new Error(err.message);
    }
}

const updatedUser = async (id, user) => {
    try{
        return await user.findByIdAndUpdate(id, user, {new: true})
    }catch(err){
        throw new Error(err.message);
    }
}
module.exports = {createUser, findUserByEmail , updateUser, findUserById, findAllUsers, updatedUser};