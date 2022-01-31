const express = require('express');
const db = require('../database/db');
const router = express.Router();


router.post('/', (req, res) => {
    const teamname = {
        team_name: req.body.team_name
    }
    db.user.findOne({
            where: { id: req.body.userId },
            include: [
                { model: db.team }
            ]
        })
        .then((user) => {
            if (user) {
                db.team.findOne({
                        where: { team_name: teamname.team_name }
                    })
                    .then((team) => {
                        if (!team) {
                            db.team.create(teamname)
                                .then((team) => {
                                    if (team) {
                                        user.addTeam([team.id], { through: { chef: true } })
                                        res.status(200).json("team created succesfully")
                                    } else {
                                        res.json("the team hasn't been created")
                                    }
                                })
                                .catch((err) => {
                                    res.json(err)
                                })
                        } else {
                            res.json("this team already exist")
                        }
                    })
                    .catch((err) => {
                        res.json(err)
                    })
            } else {
                res.json("can't find this user")
            }
        })
        .catch((err) => {
            res.json(err)
        })
});

router.get("/:id", (req, res) => {
    db.team.findOne({
            where: { id: req.params.id },
            include: [{
                model: db.user,
                through: {
                    attributes: []
                }
            }]
        })
        .then(team => {
            if (team) {
                res.json(team)
            } else {
                res.json("cannot find team")
            }
        })
        .catch(err => {
            res.json("error" + err)
        })
});

router.delete("/:id", (req, res) => {
    db.team.findOne({
            where: { id: req.params.id }
        })
        .then(team => {
            if (team) {
                team.destroy()
                    .then(() => {
                        res.json("team deleted")
                    })
                    .catch(err => [
                        res.json("error" + err)
                    ])
            } else {
                res.json({
                    err: "can't delete the team"
                })
            }
        })
        .catch(err => {
            res.json("error" + err)
        })
});


module.exports = router;