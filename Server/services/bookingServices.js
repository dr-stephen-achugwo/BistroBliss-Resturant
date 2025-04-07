const bookingRepo = require('../repos/bookingRepo');
const userRepo = require('../repos/userRepo');
const sendEmail = require('./emailServices');
const { format, parse } = require("date-fns");

const createBooking = async (booking) => {
  try{
    const newBooking = await bookingRepo.createBooking(booking);
    const user = await userRepo.findUserById(booking.userId);
    user.bookings.push(newBooking._id);
    await userRepo.updateUser(user._id, user);
    return newBooking;
  }catch(err){
    throw new Error(err.message);
  }
}

const updateBookingStatus = async (id, status) => {
  try {
    const newBookingStatus = await bookingRepo.updateBookingStatus(id, status);
    const booking = await bookingRepo.findBookingById(id);
    const user = await userRepo.findUserById(booking.userId);

    const formattedDate = format(new Date(booking.date), "PPP"); 
    const formattedTime = format(parse(booking.time, "HH:mm", new Date()), "p");

    await sendEmail(
      user.email,
      `Booking Update: Status Changed to ${status}`,
      `<body style="margin: 0; padding-top: 50px; padding-bottom: 50px; font-family: Arial, 
          sans-serif; background-color: #F9F9F7; text-align: center; hight: 70svh;">
          <table role="presentation" width="100%" height="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td align="center" valign="middle">
                <div style="width: 50%; max-width: 500px; border-top: 10px solid #AD343E; background: #ffffff;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1); padding: 20px;">
                  <h2 style="color: #AD343E; font-size: 22px; margin-bottom: 10px;">Booking Status Update</h2>
                  <p style="font-size: 16px; color: #333;">Hello <strong>${user.username}</strong>,</p>
                  <p style="font-size: 16px; color: #555; line-height: 1.6; ">
                    ${
                      status === 'accepted' 
                      ? `
                      Your booking with name <strong>${booking.name}</strong> 
                      <br>
                      on <strong>${formattedDate}</strong>
                      at <strong>${formattedTime}</strong> 
                      <br>
                      has been <strong style="color: #28A745;">Accepted</strong>.
                      <br><br>
                      🎉 We look forward to serving you!`
                      : `
                      Unfortunately, your booking with name <strong>${booking.name}</strong> 
                      <br>
                      on <strong>${formattedDate}</strong> 
                      at <strong>${formattedTime}</strong> 
                      <br>
                      has been <strong style="color: #DC3545;">Rejected</strong>.
                      <br><br>
                      ❌ Please try again with a different date or time.`
                    }
                  </p>
                  <p style="font-size: 14px; color: #777; margin-top: 20px;">Thank you for choosing us.</p>
                </div>
              </td>
            </tr>
          </table>
      </body>` 
    );

    return newBookingStatus;
  } catch (err) {
    console.error("Error:", err.message);
    throw new Error(err.message);
  }
};



const getAllPendingBookings = async () => {
  try {
    const pendingBookings = await bookingRepo.getAllPendingBookings();
    return pendingBookings;
  } catch (error) {
    throw new Error(error.message);
  }
}

const getAllUserBookings = async (id) => {
  try {
    const userBookings = await bookingRepo.getAllUserBookings(id);
    return userBookings;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { createBooking, updateBookingStatus, getAllPendingBookings, getAllUserBookings }