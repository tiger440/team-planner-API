const dotenv = require("dotenv");
const Express = require("express");
const BodyParser = require("body-parser");
const cors = require("cors");
const https = require('https');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = Express();

dotenv.config();

app.use(cors());

/* 
EXPRESS
Express est une infrastructure d'applications Web Node.js minimaliste et flexible qui fournit
 un ensemble de fonctionnalités robuste pour les applications Web et mobiles. 
*/

/*
BODY-PARSER
In short; body-parser extracts the entire body portion of an incoming request stream and 
exposes it on req.body as something easier to interface with. You don't need it per se, 
because you could do all of that yourself. However, it will most likely do what you want 
and save you the trouble.

To go a little more in depth; body-parser gives you a middleware which uses nodejs/zlib to 
unzip the incoming request data if it's zipped and stream-utils/raw-body to await the full, 
raw contents of the request body before "parsing it" (this means that if you weren't going to 
use the request body, you just wasted some time)
*/

/*
CORS
Le «  Cross-origin resource sharing » (CORS) ou « partage des ressources entre origines 
multiples » (en français, moins usité) est un mécanisme qui consiste à ajouter des en-têtes 
HTTP afin de permettre à un agent utilisateur d'accéder à des ressources d'un serveur situé 
sur une autre origine que le site courant. Un agent utilisateur réalise une requête HTTP 
multi-origine (cross-origin) lorsqu'il demande une ressource provenant d'un domaine,
d'un protocole ou d'un port différent de ceux utilisés pour la page courante. 
 */

/*
DOTENV
To create environnement variable .env 
 */

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));

/* https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/teamplanner.fr/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/teamplanner.fr/fullchain.pem'),
}, app).listen(port); */

app.use("/user", require('./router/user'));
app.use("/admin", require('./router/admin'));
app.use("/task", require('./router/task'));
app.use("/team", require('./router/team'));
app.use("/membership", require('./router/membership'));
app.use("/", require("./router/nodemailer"));


app.listen(port, function() {
    console.log(`App listening on ${process.env.DB_HOST}:${port}`);
});