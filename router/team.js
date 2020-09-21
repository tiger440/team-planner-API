const express = require('express');
const db = require('../database/db');
const router = express.Router();

router.post('/newTeam', (req, res) => {
    db.user.findOne()
});

router.post("/addTeamUser", (req, res) => {
    db.user.findOne({
        where: {id: req.params.id}
    })
        .then(user => {
            if(user){
            user.addTeam([req.body.teamId], { through:{ chef: false }})
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