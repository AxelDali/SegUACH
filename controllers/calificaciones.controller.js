const fs = require('fs');

exports.addCalificacionPage = (req, res) => {
    res.render('calificaciones_add.ejs', {
        title: "Welcome to Seguach | Add a new Calificacion",
        message: ''
    });
};

exports.addCalificacion = (req, res) => {

    let message = '';
    let calificacion = req.body.calificacion;
    let materia_id = req.body.materia_id;
    let alumno_id = req.body.alumno_id;

    let usernameQuery = "SELECT * FROM `calificaciones` WHERE calificacion = '" + calificacion + "'";

    db.query(usernameQuery, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        if (result.length > 0) {
            message = 'Username already exists';
            res.render('calificaciones_add.ejs', {
                message,
                title: "Welcome to Seguach | Add a new Calificacion"
            });
        } else {
            let query = "INSERT INTO `calificaciones` (calificacion, materia_id, alumno_id) VALUES ('" +
                        calificacion + "', '" + materia_id + "', '" + alumno_id +  "')";
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.redirect('/');
                    });
        }
    });
}

exports.editCalificacionPage = (req, res) => {
    let calificacion = req.params.id;
    console.log(calificacion);
    let query = "SELECT * FROM `calificaciones` WHERE calificacion = '" + calificacion + "' ";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('calificaciones_edit.ejs', {
            title: "Edit  Calificacion",
            calificaciones: result[0],
            message: ''
        });
    });
}

exports.editCalificacion = (req, res) => {
    let calificacion = req.params.id;
    let materia_id = req.body.materia_id;
    let alumno_id = req.body.alumno_id;

    let query = "UPDATE `calificaciones` SET `calificacion` = '" + calificacion + "', `materia_id` = '" + materia_id + "', `alumno_id` = '" + alumno_id + "' WHERE `calificacion` = '" + calificacion + "'";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
}

exports.deleteCalificacion = (req, res) => {
    let calificacion = req.params.id;
    let deleteUserQuery = 'DELETE FROM calificaciones WHERE calificacion= "' + calificacion + '"';
    db.query(deleteUserQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
}

exports.getHomePage = (req, res) => {
    let query = "SELECT * FROM `calificaciones` ORDER BY calificacion ASC"; // query database to get all the players

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.redirect('/');
        }

        res.render('calificaciones.ejs', {
            title: "Welcome to Seguach | View Calificaciones",
            calificaciones: result
        });
    });
};
