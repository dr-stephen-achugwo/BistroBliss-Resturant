const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const {createBooking} = require('../validators/bookingValidator');
const {validationResult} = require('express-validator');
const {authenticateToken} = require('../middlewares/authentication');
const {authorizeAdmin} = require('../middlewares/authorization');

router.post('/', createBooking, authenticateToken, (req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    bookingController.createBooking(req, res, next);
    });
// (admin)
router.get('/', authorizeAdmin, bookingController.getPendingBookings);
// (admin)
router.put('/:id', authorizeAdmin, bookingController.updateBookingStatus);




module.exports = router;