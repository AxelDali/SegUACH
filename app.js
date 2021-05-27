const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();

const alumnoRoutes = require('./routes/alumno.routes')
const calificacionRoutes = require('./routes/calificacion.routes')
const carreraRoutes = require('./routes/carrera.routes')
const facultadRoutes = require('./routes/facultad.routes')
const grupoRoutes = require('./routes/grupo.routes')
const horarioRoutes = require('./routes/horario.routes')
const kardexRoutes = require('./routes/kardex.routes')
const materiaRoutes = require('./routes/materia.routes')
const professorRoutes = require('./routes/player.routes')
const homeRoutes = require('./routes/index.routes')
const port = 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'sega'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app

app.use('/', homeRoutes);
app.use('/alumno', alumnoRoutes)
app.use('/calificacion', calificacionRoutes)
app.use('/carrera', carreraRoutes)
app.use('/facultad', facultadRoutes)
app.use('/grupo', grupoRoutes)
app.use('/horario', horarioRoutes)
app.use('/kardex', kardexRoutes)
app.use('/materia', materiaRoutes)
app.use('/professor', professorRoutes)
app.get('*', function(req, res, next){
    res.status(404);

    res.render('404.ejs', {
        title: "Page Not Found",
    });

});

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
