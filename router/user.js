const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../database/db");

process.env.SECRET_KEY = "secret";

router.post("/register",(req,res) => {
    db.user.findOne({
        where: {email: req.body.email}
    })
    .then(user => {
        if(!user){
            const hash = bcrypt.hashSync(req.body.password,10);
            req.body.password = hash;
            db.user.create(req.body)
            .then(itemuser => {
                res.status(200).json({
                    message: "Vous devez valider votre email",
                    email: itemuser.email
                })
            })
            .catch(err => {
                res.json(err)
            })
        } else {
            res.json("cette adresse mail est déjà utilisée")
        }
    })
    .catch(err => {
        res.json(err)
    })
});

router.get("/profile/:id", (req, res) => {
    db.user.findOne({
            where: { id: req.params.id }
        })
        .then(user => {
            if (user) {
                let token = jwt.sign(user.dataValues,
                    process.env.SECRET_KEY, {
                        expiresIn: 1440
                    });
                res.status(200).json({ token: token })
            } else {
                res.json("error cet utilisateur n'existe pas")
            }
        })
        .catch(err => {
            res.json(err)
        })
});

router.put("/update/:id", (req, res) => {
    db.user.findOne({
        where: { id: req.params.id }
    })
    .then(user => {
        if(user) {
            password = password.hashSync(req.body.password, 10);
            req.body.password = password;
            user.update(req.body)
                .then(useritem => {
                    db.user.findOne({
                        where: { id: useritem.id }
                    })
                    .then(user => {
                        let oken = jwt.sign(user.dataValues,
                            process.env.SECRET_KEY, {
                                expiresIn: 1440
                            });
                        res.status(200).json({ token: token })
                    })
                    .catch(err => {
                        res.status(402).send(err + "wrong request")
                    })
                })
                .catch(err => {
                    res.status(402).send(err + "mise à jour impossible")
                })
        } else {
            res.json("user inconnu")
        }
    })
    .catch(err => {
        res.json(err);
    })
});

router.delete("/delete/:id", (req, res) => {
    db.user.findOne({
        where: { id: req.params.id }
    })
    .then(user => {
        if(user) {
            user.destroy()
            .then(() => {
                res.json("user deleted")
            }) 
            .catch(err => {
                res.json("error" + err)
            })
        } else {
            res.json({
                err: "can't delete the user"
            })
        }
    })
    .catch(err => {
        res.json("error" + err)
    })
});

router.get("/login",(req,res) => {
    db.user.findOne({
        where: { email: req.body.email }
    })
    .then(user => {
        if(user.Status === true){
            if(bcrypt.compareSync(req.body.password, user.password)){
            let userdata = {
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                image: user.image
            };
            let token = jwt.sign(userdata,process.env.SECRET_KEY,{
                expiresIn: 1440,
            })
            res.status(200).json({token: token})
            } else {
                res.json("error mail or password")
            }
        } else {
            res.json({ message: "vous devez valider votre mail"})
        } 
    })
    .catch(err => {
        res.json(err)
    })
    
});

module.exports = router;