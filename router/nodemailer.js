const express = require("express");
const router = express.Router();

router.post("/sendmail",(req,res) => {

    const nodemailer = require("nodemailer");


    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "azerty789258@gmail.com",
            pass: "kRXEf674SMpEq3E",
        }
    });

    var mailOptions = {
        from: "",
        to: req.body.email,
        subject: req.body.obj,
        text: req.body.text
    }

    transporter.sendMail(mailOptions,(error, info) => {
        if(error){
            res.json(error);
            console.log(error);
        } else {
            console.log("email sent" + info.response);
            res.json("email sent" + info.response);
        }
    })
});

module.exports = router;