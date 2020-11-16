const dotenv = require("dotenv");
const express = require("express");
const BodyParser = require("body-parser");
const Cors = require("cors");
const https = require('https');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

dotenv.config();

app.use(Cors());

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));

https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/teamplanner.fr/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/teamplanner.fr/fullchain.pem'),
}, app).listen(port);

app.use("/user", require('./router/user'));
app.use("/task", require('./router/task'));
app.use("/team", require('./router/team'));
app.use("/", require("./router/nodemailer"));


app.listen(port, function() {
    console.log(`App listening on ${process.env.DB_HOST}:${port}`);
});