const express = require('Express');
const db = require('../database/db');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//CHECK
router.post("/create", (req, res) => {
    const taskinfo = {
        task_name: req.body.task_name,
        start: req.body.start,
        end: req.body.end,
        description: req.body.description,
        lieu: req.body.lieu,
        status: true,
    }
    const userId = req.body.userId
    db.user.findOne({
        where: { id: userId }
    })
    .then(user => {
        if (user) {
            db.task.findOne({
                where: {
                    [Op.and]: {
                        task_name: {
                            [Op.like]: taskinfo.task_name
                        },
                        start: {
                            [Op.like]: taskinfo.start
                        },
                        end: {
                            [Op.like]: taskinfo.end
                        }
                    }
                }
            })
            .then((task) => {
                if (!task){
                    const debut = Date.parse(taskinfo.start);
                    const fin = Date.parse(taskinfo.end);
                    if(fin - debut > 0) {
                        db.task.create(taskinfo)
                        .then((task) => {
                            if (task) {
                                user.addTask([task.id], { through: { status: true }})
                                res.json("task successfully created")
                            } else {
                                res.json("cannot link the task")
                            }
                        })
                        .catch((err) => {
                            res.json(err);
                        });
                        
                    } else {
                        res.json("date incohérente")
                    } 
                } else {
                    res.json("cette tâche existe déjà")
                }
            })
            .catch((err) => {
                res.json(err)
            })
        } else {
            res.json("can't find this user")
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
            } else {
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