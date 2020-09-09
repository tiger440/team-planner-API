const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../database/db");

router.post("/register", (req,res) => {
    db.user.findOne({
            where: {email: req.body.email}
        })
        .then(user => {
            if(!user){
                password = bcrypt.hashSync(req.body.password, 50);
                db.user.create({
                    nom: req.body.nom,
                    prenom: req.body.prenom,
                    email: req.body.email,
                    password: password
                })
                .then(clientitem => {
                    let token = jwt.sign(useritem.dataValues,
                        process.env.SECRET_KEY, {
                            expiresIn: 1440
                        });
                    
                    res.status(200).json({ token: token })
                })
                .catch(err => {
                    res.send(err)
                })
            } else {
                res.json("client déjà dans la base")
            }
        })
        .catch( err => {
            res.json({ error: err })
        })
});

router.get("/profile/:id", (res, res) => {
    db.user.findOne({
            where: { id: req.params.id }
        })
        .then(client => {
            if (client) {
                let token = jwt.sign(client.dataValues,
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

router.post("/login", (req, res) => {
    db.user.findOne({
            where: { email: req.body.email }
        })
        .then(client => {
            if(client) {
                if (bcrypt.compareSync(req.body.password, 
                        user.password)) {
                    let token = jwt.sign(client.dataValues,
                        process.env.SECRET_KEY, {
                            expiresIn: 1440
                        });
                    res.status(200).json({ roken: token })
                } else {
                    res.status(520).json("wrong email or password")
                }
            } else {
                return res.status(520).json("user don't exist")
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
                        let oken = jwt.sign(client.dataValues,
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
})