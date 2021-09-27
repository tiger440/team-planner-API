const express = require('express');
const db = require('../database/db');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//CHECK
router.post("/create", (req, res) => {
    const taskinfo = {
        Subject: req.body.Subject,
        StartTime: new Date(req.body.StartTime),
        EndTime: new Date(req.body.EndTime),
        StartTimeZone: req.body.StartTimeZone,
        EndTimeZone: req.body.EndTimeZone,
        Description: req.body.Description,
        location: req.body.Location,
        isAllDay: req.body.isAllDay,
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
                                Subject: {
                                    [Op.like]: taskinfo.Subject
                                },
                                StartTime: {
                                    [Op.like]: taskinfo.StartTime
                                },
                                EndTime: {
                                    [Op.like]: taskinfo.EndTime
                                }
                            }
                        }
                    })
                    .then((task) => {
                        if (!task) {
                            const debut = Date.parse(taskinfo.StartTime);
                            const fin = Date.parse(taskinfo.EndTime);
                            if (fin - debut > 0) {
                                db.task.create(taskinfo)
                                    .then((task) => {
                                        if (task) {
                                            user.addTask([task.Id], { through: { status: true } })
                                            res.json(task)
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
router.get("/updateTask/:id", (req, res) => {
    db.task.findOne({
            where: { id: req.params.id }
        })
        .then(task => {
            if (task) {
                db.task.update(req.body, { where: { id: task.id } })
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
            if (task) {
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
            where: { email: req.body.email }
        })
        .then(user => {
            if (user) {
                user.addTasks([req.body.taskId], { through: { Status: req.body.status } })
                    .then(rep => {
                        res.json(rep)
                    })
            } else {
                res.json("not found")
            }
        })
        .catch(err => {
            res.sendTime('error' + err)
        })
});

//CHECK
router.get("/findUserTasks/:id", (req, res) => {
    db.user.findOne({
            where: { id: req.params.id },
            include: [{
                model: db.task,
                attributes: {
                    include: [],
                    exclude: ["createdAt", "updatedAt"]
                },
                through: {
                    attributes: []
                }
            }, ],
        })
        .then(user => {
            res.json(user.tasks)
        })
        .catch(err => {
            res.json("error" + err)
        })
});

router.get("/findTeamTasks/:id", (req, res) => {
    db.team.findOne({
            where: { id: req.params.id },
            include: [{
                model: db.user,
                through: {
                    attributes: []
                },
                include: [{
                    model: db.task,
                    through: {
                        attributes: []
                    }
                }]
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
router.post("/removeTaskUser", (req, res) => {
    db.user.findOne({
            where: { email: req.body.email }
        })
        .then(user => {
            if (user) {
                user.removeTasks([req.body.taskId], { through: { Status: req.body.status } })
                    .then(rep => {
                        res.json(rep)
                    })
            } else {
                res.json("not found")
            }
        })
        .catch(err => {
            res.sendTime('error' + err)
        })
});

module.exports = router;