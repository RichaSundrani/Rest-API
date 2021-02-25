const { authenticator } = require('otplib');
const base32 = require('base32');
// const secret = authenticator.generateSecret();


let getOTP = (email) => {
    const secret = base32.encode(email);
    //const secret = "abcgmailcom";
    const token = authenticator.generate(secret);
    console.log(token);
    return token
};

let validateOTP = (otp, email) => {
    try {
        const isValid = authenticator.check(otp, base32.encode(email));
        // const isValid = authenticator.verify(otp, secret);
        console.log(isValid);
        return isValid;
    } catch (err) {
        console.error(err);
        return false;
    }
    // if (sessionOTP == otp) {
    //     console.log("Access with otp");
    //     return true;
    // } else {
    //     console.log("invalid otp");
    //     return false;
    // }
}

module.exports.getOTP = getOTP;
module.exports.validateOTP = validateOTP;




