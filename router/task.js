const express = require('Express');
const db = require('../database/db');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//CHECK
router.post("/create", (req, res) => {
    db.task.findOne({ 
        where: {
            task_name: {
                [Op.like]: req.body.task_name
            },
            start: {
                [Op.like]: req.body.start
            },
            end: {
                [Op.like]: req.body.end
            }
        }
    })
    .then(task => {
    if (!task){
        const debut = Date.parse(req.body.start);
        const fin = Date.parse(req.body.end);
        if(fin - debut > 0) {
            db.task.create(req.body)
            res.json("task successfully created")
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

//CHECK
router.post("/updateTask/:id", (req, res) => {
    db.task.findOne({
        where: { id: req.params.id }
    })
    .then(task => {
        if(task) {
            db.task.update(req.body, { where: {id: task.id} })
        } else {
            res.json("can't update the task")
        }
    })
    .catch(err => {
        res.json('error' + err)
    });
});

//CHECK
router.delete("/deleteTask/:id", (req, res) => {
    db.task.findOne({
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

//CHECK - AJOUTER FOR POUR QUE PLUSIEURS EMAIL SOIT PRIS EN COMPTE DANS UNE REQUEST
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

//CHECK
router.get("/findUserTasks", (req, res) => {
    db.user.findOne({
        where: {id: req.body.id},
        include: [
            {model: db.task}
        ]
    })
    .then(task => {
        res.json(task)
    })
    .catch(err =>{
        res.json("error" + err)
    })
});

//CHECK
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