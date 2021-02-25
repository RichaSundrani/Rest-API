const express = require('express');
const sendEmail = require('./sendEmail');
const OTP = require('./otp');
var validator = require("email-validator");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// cors allows cross origin requests
app.use(cors());

app.post('/sendOTP', function (req, res) {
    if (req && req.body) {
        if (req.body.email && validator.validate(req.body.email)) {
            console.log(req.body.email);
            let otp = OTP.getOTP(req.body.email);
            sendEmail.sendEmail(req.body.email, otp);
            res.send({
                'status': 200,
                'message': 'Email sent!',
                'otp': otp
            });
        } else {
            res.send({
                'status': 500,
                'message': 'Internal error, please enter a correct email id!'
            });
        }
    }
});   


app.post('/validateOTP', function (req, res) {
    if (req && req.body) {
        if (req.body.otp && req.body.email && req.body.ClientID) {
            if (OTP.validateOTP(req.body.otp, req.body.email)) {
                console.log(req.body.ClientID);
                res.send({
                    'otp': req.body.otp,
                    'ClientID': req.body.ClientID,
                    'message': 'Registeration complete!'
                });
            } else {
                res.send({
                    'status': 401,
                    'otp': req.body.otp,
                    'message': 'Access denied! Invalid OPT or Email!'
                });
            }
        } else {
            res.send({
                'status': 500,
                'message': 'please enter a otp and email!'
            });
        }
    }
});

app.listen(3333);