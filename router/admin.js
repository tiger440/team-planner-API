var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var db = require("../database/db");

process.env.SECRET_KEY = 'secret';

router.post("/register", (req, res) => {
    if (req.body.role != "admin") {
        role = "user"
    } else {
        role = "admin"
    }
    db.admin.findOne({
            where: { email: req.body.email }
        })
        .then(admin => {
            if (!admin) {
                password = bcrypt.hashSync(req.body.password, 10);
                db.admin.create({
                        nom: req.body.nom,
                        prenom: req.body.prenom,
                        email: req.body.email,
                        password: password,
                        role: role,
                    })
                    .then(adminitem => {
                        var admindata = {
                            id: adminitem.id,
                            role: adminitem.role,
                            nom: adminitem.nom,
                            prenom: adminitem.prenom
                        }
                        let token = jwt.sign(admindata,
                            process.env.SECRET_KEY, {
                                expiresIn: 1440
                            });

                        res.status(200).json({ token: token })
                    })
                    .catch(err => {
                        res.send({ err })
                    })
            } else {
                res.json("admin déja dans la base");
            }
        })
        .catch(err => {
            res.json({ error: err })
        })
});

router.get("/profile/:id", (req, res) => {
    db.admin.findOne({
            where: { id: req.params.id }
        })
        .then(admin => {
            if (admin) {
                let token = jwt.sign(admin.dataValues,
                    process.env.SECRET_KEY, {
                        expiresIn: 1440
                    });
                res.status(200).json({ token: token })
            } else {
                res.json("error le admin n'a pas dans la base !!")
            }
        })
        .catch(err => {
            res.json(err)
        })
});

router.post("/login", (req, res) => {
    console.log(req.body);
    db.admin.findOne({
            where: { email: req.body.email }
        }).then(admin => {
            if (admin) {
                if (bcrypt.compareSync(req.body.password,
                        admin.password)) {
                    var admindata = {
                        id: admin.id,
                        role: admin.role,
                        nom: admin.nom,
                        prenom: admin.prenom
                    }
                    let token = jwt.sign(admindata,
                        process.env.SECRET_KEY, {
                            expiresIn: 1440
                        });
                    res.status(200).json({ auth: true, token: token })
                } else {
                    res.status(520).json({
                        auth: false,
                        message: "error email or password"
                    })
                }
            } else {
                return res.status(520).json('admin not found')
            }
        })
        .catch(err => {
            res.json(err)
        })
});


router.put("/update/:id", (req, res) => {
    db.admin.findOne({
            where: { id: req.params.id }
        })
        .then(admin => {
            if (admin) {
                password = bcrypt.hashSync(req.body.password, 10);
                req.body.password = password;
                admin.update(req.body)
                    .then(adminitem => {
                        console.log(adminitem);
                        db.admin.findOne({
                                where: { id: adminitem.id }
                            })
                            .then(admin => {
                                let token = jwt.sign(admin.dataValues,
                                    process.env.SECRET_KEY, {
                                        expiresIn: 1440 //s
                                    });
                                res.status(200).json({ token: token })
                            })
                            .catch(err => {
                                res.status(402).send(err + 'bad request')
                            })
                    })
                    .catch(err => {
                        res.status(402).send("impossible de metter a jour le admin" + err);
                    })
            } else {
                res.json("admin n'est pas dans la base ")
            }
        })
        .catch(err => {
            res.json(err);
        })
})





module.exports = router;