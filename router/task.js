const express = require('Express');
const { task } = require('../database/db');
const db = require('../database/db');
const router = express.Router();


router.post("/create", (req, res) => {
    db.task.findOne({ where: {nom: req.body.nom} })
    .then(task => {
       if(req.body.start.getTime() < req.body.end.getTime()) {
        db.task.create(req.body)
    } else {
        res.json("date incohérente")
    }
    })
    .catch()
    
})


router.post("/addTaskToUser", (req, res) => {
    db.user.findOne({
        where: {email: req.body.email}
    })
        .then(user => {
            if(user){
            user.addTasks([req.body.taskId], { through:{ task_name: req.body.task_name, start: req.body.start, end:req.body.end }})
            .then(reps => {
                res.json(reps)
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