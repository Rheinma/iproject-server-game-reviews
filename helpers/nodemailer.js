const nodemailer = require("nodemailer");

async function main(email) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "applepine272@gmail.com",
            pass: "xcyxnpxxehpwuyti",
        },
    });

    const mailOptions = {
        from: "applepine272@gmail.com",
        to: email,
        subject: "Successful Registration",
        text: `You have successfully registered an account on our site.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });

}

module.exports = main;