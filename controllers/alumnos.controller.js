const fs = require('fs');

exports.addAlumnoPage = (req, res) => {
    res.render('alumnos_add.ejs', {
        title: "Welcome to Seguach | Add a new Alumno",
        message: ''
    });
};

exports.addAlumno = (req, res) => {

    let message = '';
    let alumno_nombre = req.body.alumno_nombre;
    let alumno_apellido = req.body.alumno_apellido;
    let alumno_email = req.body.alumno_email;
    let carrera_ID = req.body.carrera_ID;

    let usernameQuery = "SELECT * FROM `alumnos` WHERE alumno_email = '" + alumno_email + "'";

    db.query(usernameQuery, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        if (result.length > 0) {
            message = 'Username already exists';
            res.render('alumnos_add.ejs', {
                message,
                title: "Welcome to Seguach | Add a new Alumno"
            });
        } else {
            let query = "INSERT INTO `alumnos` (alumno_nombre, alumno_apellido, alumno_email, carrera_ID) VALUES ('" +
                        alumno_nombre + "', '" + alumno_apellido + "', '" + alumno_email + "', '" + carrera_ID + "')";
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.redirect('/');
                    });
        }
    });
}

exports.editAlumnoPage = (req, res) => {
    let alumno_id = req.params.id;
    console.log(alumno_id);
    let query = "SELECT * FROM `alumnos` WHERE alumno_id = '" + alumno_id + "' ";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('edit-alumno.ejs', {
            title: "Edit  Alumno",
            alumnos: result[0],
            message: ''
        });
    });
}

exports.editAlumno = (req, res) => {
    let alumno_id = req.params.id;
    let alumno_nombre = req.body.alumno_nombre;
    let alumno_apellido = req.body.alumno_apellido;
    let alumno_email = req.body.alumno_email;

    let query = "UPDATE `alumnos` SET `alumno_nombre` = '" + alumno_nombre + "', `alumno_apellido` = '" + alumno_apellido + "', `alumno_id` = '" + alumno_id + "' WHERE `alumno_id` = '" + alumno_id + "'";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
}

exports.deleteAlumno = (req, res) => {
    let alumno_id = req.params.id;
    let deleteUserQuery = 'DELETE FROM alumnos WHERE alumno_id = "' + alumno_id + '"';
    db.query(deleteUserQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
}

exports.getHomePage = (req, res) => {
    let query = "SELECT * FROM `alumnos` ORDER BY alumno_id ASC"; // query database to get all the players

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.redirect('/');
        }

        res.render('alumnos.ejs', {
            title: "Welcome to Seguach | View Alumnos",
            alumnos: result
        });
    });
};
