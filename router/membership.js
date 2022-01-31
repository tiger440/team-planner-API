const express = require('express');
const db = require('../database/db');
const router = express.Router();


router.post("/", (req, res) => {
    db.user.findOne({
            where: { email: req.body.email }
        })
        .then(user => {
            if (user) {
                user.addTeam([req.body.teamId], { through: { chef: false } })
                    .then(rep => {
                        res.json("user added to team" + rep)
                    })
                    .catch(err => {
                        res.json("error" + err)
                    })
            } else {
                res.json("not found")
            }
        })
        .catch(err => {
            res.send('error' + err)
        })
});

router.post("/remove", (req, res) => {
    db.user.findOne({
            where: { email: req.body.email }
        })
        .then(user => {
            if (user) {
                user.removeTeam([req.body.teamId], { through: { chef: 0 } })
                    .then(rep => {
                        res.json("L'utilisateur a bien été retirer de l'équipe")
                    })
            } else {
                res.json("not found")
            }
        })
        .catch(err => {
            res.send('error' + err)
        })
});

router.get("/:id", (req, res) => {
    db.user.findOne({
            where: { id: req.params.id },
            include: [
                { model: db.team }
            ]
        })
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.json("error" + err)
        })
});


module.exports = router;