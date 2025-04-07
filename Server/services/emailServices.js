const transporter = require("../config/email");

const sendEmail = async (to, subject, message) => {
  try {
    const mailOptions = {
      from: `"Bistro Bliss Restaurant" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
};

module.exports = sendEmail;