const bookingServices = require("../services/bookingServices");
const jsend = require("jsend");


const createBooking = async (req, res) => {
    try {
        const booking = req.body;
        booking.userId = req.user.id;
        const newBooking = await bookingServices.createBooking(booking);
        res.json(jsend.success({ newBooking }));
    } catch (err) {
        res.status(500).json(jsend.error({ message: err.message }));
    }
};

const getPendingBookings = async (req, res) => {
    try {
        const bookings = await bookingServices.getAllPendingBookings();
        res.json(jsend.success({ bookings }));
    } catch (err) {
        res.status(500).json(jsend.error({ message: err.message }));
    }
};

const updateBookingStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;
        const updatedBooking = await bookingServices.updateBookingStatus(id, status);
        res.json(jsend.success({ updatedBooking }));
    } catch (err) {
        res.status(500).json(jsend.error({ message: err.message }));
    }
};


module.exports = { createBooking, getPendingBookings, updateBookingStatus };