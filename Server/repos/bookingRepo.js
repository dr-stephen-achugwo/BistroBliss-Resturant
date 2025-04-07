const Booking = require('../models/Booking');

const createBooking = async (booking) => {
  try{
      const newBooking = new Booking(booking);
      return await newBooking.save();
  }catch(err){
      throw new Error(err.message);
  }
}

const getAllPendingBookings = async () => {
  try{
      return await Booking.find({status: "pending"});
  }catch(err){
      throw new Error(err.message);
  }
}

const getAllUserBookings = async (id) => {
  try{
      return await Booking.find({userId: id});
  }catch(err){
      throw new Error(err.message);
  }
}
const mongoose = require('mongoose');

const updateBookingStatus = async (id, status) => {
  try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new Error("Invalid Booking ID");
      }
      if (!["pending", "rejected", "accepted"].includes(status)) {
          throw new Error("Invalid status value");
      }
      return await Booking.findByIdAndUpdate(id, { status }, { new: true });
  } catch (err) {
      throw new Error(err.message);
  }
};

const findBookingById = async (id) => {
  try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new Error("Invalid Booking ID");
      }
      return await Booking.findById(id);
  } catch (err) {
      throw new Error(err.message);
  }
};


module.exports = { 
	createBooking ,
	updateBookingStatus, 
	getAllPendingBookings , 
	getAllUserBookings,
	findBookingById
}