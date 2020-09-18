const express = require('Express');
const db = require('../database/db');
const router = express.Router();


router.post("/create", (req, res) => {
    db.task.findOne({ 
        where: {
            nom: req.body.nom,
            start: req.body.start,
            end: req.body.end
        }
    })
    .then(task => {
    if (!task){
        if(req.body.start.getTime() < req.body.end.getTime()) {
            db.task.create(req.body)
        } else {
            res.json("date incohérente")
        } 
    } else {
        res.json("cette tâche existe déjà")
    }
    })
    .catch(err => {
        res.json("error" + err)
    })
});

router.post("/updateTask", (req, res) => {
    db.task.findOne({
        where: { id: req.params.id }
    })
    .then(task => {
        task.update()
    })
})

router.delete("/deleteTask/:id", (req, res) => {
    db.addtask.findOne({
        where: { id: req.params.id }
    })
    .then(task => {
        if(task) {
            task.destroy()
            .then(() => {
                res.json("task deleted")
            })
            .catch(err => [
                res.json("error" + err)
            ])
        } else {
            res.json({
                err: "can't delete the task"
            })
        }
    })
    .catch(err => {
        res.json("error" + err)
    })
});

router.get("/findUserTasks", (req, res) => {
    db.addtask.findAll({
        include: [
            {model: db.user}
        ]
    })
    .then(task => {
        res.json(task)
    })
});

router.post("/addTaskUser", (req, res) => {
    db.user.findOne({
        where: {email: req.body.email}
    })
        .then(user => {
            if(user){
            user.addTasks([req.body.taskId], { through:{ Status: req.body.status }})
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

router.post("/removeTaskUser", (req, res) => {
    db.user.findOne({
        where: {email: req.body.email}
    })
        .then(user => {
            if(user){
            user.removeTasks([req.body.taskId], { through:{ Status: req.body.status }})
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

module.exports = router;