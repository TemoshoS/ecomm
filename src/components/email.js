const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// Initialize a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'temoshomaduane@gmail.com',
    pass: 'Maduane15',
  },
});

// Define the Firebase Function
exports.sendOrderConfirmationEmail = functions.firestore
  .document('orders/{orderId}')
  .onCreate((snapshot, context) => {
    const orderData = snapshot.data();

    // Create the email template (HTML or plain text)
    const mailOptions = {
      from: 'temoshomaduane@gmail.com',
      to: orderData.address.email,
      subject: 'Order Confirmation',
      html: `<p>Thank you for your order!</p>
             <p>Order ID: ${context.params.orderId}</p>
             <p>Total Price: R ${orderData.total}</p>
             <p>...</p>`, // Add more order details here
    };

    // Send the email
    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  });
