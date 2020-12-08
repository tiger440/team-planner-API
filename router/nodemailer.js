const express = require("express");
const router = express.Router();

//CHECK
router.post("/sendmail", (req, res) => {

    const nodemailer = require("nodemailer");


    var transporter = nodemailer.createTransport({
        host: 'mail.teamplanner.fr',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CONTACT_EMAIL,
            pass: process.env.CONTACT_PASSWORD,
        },
        tls: {
            //do not fail on invalid certs
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        from: "",
        to: req.body.email,
        subject: req.body.obj,
        text: req.body.text
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.json(error);
            console.log(error);
        } else {
            console.log("email sent" + info.response);
            res.json("email sent" + info.response);
        }
    })
});

module.exports = router;