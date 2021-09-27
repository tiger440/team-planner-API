const express = require('express');
const db = require('../database/db');
const router = express.Router();

//CHECK
router.post('/newTeam', (req, res) => {
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
                                        res.status(200).json("task linked succesfully")
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

//CHECK
router.post("/addTeamUser", (req, res) => {
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

//CHECK
router.post("/removeTeamUser", (req, res) => {
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

//CHECK
router.get("/userTeam", (req, res) => {
    db.user.findOne({
            where: { id: req.body.id },
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

//CHECK
router.get("/displayTeam/:id", (req, res) => {
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

//CHECK
router.delete("/deleteTeam/:id", (req, res) => {
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