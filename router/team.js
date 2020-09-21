const express = require('express');
const db = require('../database/db');
const router = express.Router();

//CHECK - Essayer de créer team uniquement si !team associé au user
router.post('/newTeam/:id', (req, res) => {
    db.user.findOne({
        where: { id: req.params.id }
    })
    .then(user => {
            if(user) {   
                db.team.create(req.body)
                .then(team => {
                    if(team){
                    user.addTeam([team.id], { through:{ chef: true }})
                    res.json("team linked successfully")
                    } else {
                        res.json("team already exist")
                    }
                })
                .catch(err => {
                    res.json("error:" + err)
                })
            } else {
                res.json("this team already exist")
            }
    })
    .catch(err => {
        res.json("cannot find user, error:" + err)
    })
});

//CHECK
router.post("/addTeamUser", (req, res) => {
    db.user.findOne({
        where: {id: req.body.id}
    })
        .then(user => {
            if(user){
                user.addTeam([req.body.teamId], { through:{ chef: false }})
                .then(rep => {
                    res.json(rep)
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
        where: {email: req.body.email}
    })
        .then(user => {
            if(user){
            user.removeTeam([req.body.teamId], { through:{ chef: 0}})
            .then(rep => {
                res.json(rep)
              })
            }
            else{
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
        where: {id: req.body.id},
        include: [
            {model: db.team}
        ]
    })
    .then(team => {
            res.json(team) 
    })
    .catch(err =>{
        res.json("error" + err)
    })
});

//CHECK
router.get("/displayTeam", (req, res) => {
    db.team.findOne({
        where: {id: req.body.id},
        include: [
            {model: db.user}
        ]
    })
    .then(team => {
        if(team) {
           res.json(team) 
        } else {
            res.json("cannot find team")
        }
    })
    .catch(err =>{
        res.json("error" + err)
    })
});

//CHECK
router.delete("/deleteTeam/:id", (req, res) => {
    db.team.findOne({
        where: { id: req.params.id }
    })
    .then(team => {
        if(team) {
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