const { SMTPClient } = require('emailjs');

let sendEmail = (email, otp) => {
    const client = new SMTPClient({
        user: 'everesttop00@gmail.com',
        password: 'Covid@2021',
        host: 'smtp.gmail.com',
        ssl: true,
    });

    // send the message and get a callback with an error or details of the message that was sent
    client.send(
        {
            text: `OTP : ${otp}`,
            from: 'everesttop00@gmail.com',
            to: email,
            subject: 'Your otp here...'
        },
        (err, message) => {
            console.log(err || message);
        }
    );
}

module.exports.sendEmail = sendEmail;