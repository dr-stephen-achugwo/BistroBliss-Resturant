const userServices = require('../services/userServices');
const jsend = require('jsend');


const getUser = async (req, res) => {
    try{
        const user = await userServices.getUser(req.user.id);
        res.json(jsend.success({user}));
    }catch(err){
        res.status(500).json(jsend.error({message: err.message}));
    }
}

const getUsers = async (req, res) => {
    try{
        const users = await userServices.getUsers();
        res.json(jsend.success({users}));
    }catch(err){
        res.status(500).json(jsend.error({message: err.message}));
    }
}

const updateUser = async (req, res) => {
    try{
        const { updatedUser, token } = await userServices.updateUser(req.user.id, req.body);
        res.cookie("token", token, { httpOnly: true });
        res.json(jsend.success({ token , user: updatedUser }));
    }catch(err){
        res.status(500).json(jsend.error({message: err.message}));
    }
}

const getBookings = async (req, res) => {
    try{
        const bookings = await userServices.getBookings(req.user.id);
        res.json(jsend.success({bookings}));
    }catch(err){
        res.status(500).json(jsend.error({message: err.message}));
    }
}


module.exports = {
    getUser,
    getUsers,
    updateUser,
    getBookings
}