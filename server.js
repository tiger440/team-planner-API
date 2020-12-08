const dotenv = require("dotenv");
const Express = require("express");
const BodyParser = require("body-parser");
const Cors = require("cors");

const port = process.env.PORT || 3000;
const app = Express();

dotenv.config();

app.use(Cors());

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));

app.use("/user", require('./router/user'));
app.use("/admin", require('./router/admin'));
app.use("/task", require('./router/task'));
app.use("/team", require('./router/team'));
app.use("/", require("./router/nodemailer"));


app.listen(port, function() {
    console.log(`App listening on ${process.env.DB_HOST}:${port}`);
});