const express = require('Express');
const db = require('../database/db');
const router = express.Router();


router.post("/create", (req, res) => {
    db.task.findOne()
})