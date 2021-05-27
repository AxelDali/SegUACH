const fs = require('fs');

exports.addCarreraPage = (req, res) => {
    res.render('carrera_add.ejs', {
        title: "Welcome to Seguach | Add a new Carrera",
        message: ''
    });
};

exports.addCarrera = (req, res) => {

    let message = '';
    let facultad_id = req.body.facultad_id;
    let carrera_nombre = req.body.carrera_nombre;
    let descripcion = req.body.descripcion;

    let usernameQuery = "SELECT * FROM `carrera` WHERE carrera_nombre = '" + carrera_nombre + "'";

    db.query(usernameQuery, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        if (result.length > 0) {
            message = 'Username already exists';
            res.render('carrera_add.ejs', {
                message,
                title: "Welcome to Seguach | Add a new Carrera"
            });
        } else {
            let query = "INSERT INTO `carrera` (facultad_id, carrera_nombre, descripcion) VALUES ('" +
                        facultad_id + "', '" + carrera_nombre + "', '" + descripcion + "')";
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.redirect('/');
                    });
        }
    });
}

exports.editCarreraPage = (req, res) => {
    let carrera_id = req.params.id;
    console.log(carrera_id);
    let query = "SELECT * FROM `carrera` WHERE carrera_id = '" + carrera_id + "' ";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('carrera_edit.ejs', {
            title: "Edit  Carrera",
            carrera: result[0],
            message: ''
        });
    });
}

exports.editCarrera = (req, res) => {
    let carrera_id = req.params.id;
    let facultad_id = req.body.facultad_id;
    let carrera_nombre = req.body.carrera_nombre;
    let descripcion = req.body.descripcion;

    let query = "UPDATE `carrera` SET `carrera_nombre` = '" + carrera_nombre + "', `facultad_id` = '" + facultad_id + "', `descripcion` = '" + descripcion + "' WHERE `carrera_id` = '" + carrera_id + "'";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
}

exports.deleteCarrera = (req, res) => {
    let carrera_id = req.params.id;
    let deleteUserQuery = 'DELETE FROM carrera WHERE carrera_id = "' + carrera_id + '"';
    db.query(deleteUserQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
}

exports.getHomePage = (req, res) => {
    let query = "SELECT * FROM `carrera` ORDER BY carrera_id ASC"; // query database to get all the players

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.redirect('/');
        }

        res.render('carrera.ejs', {
            title: "Welcome to Seguach | View Carreras",
            carreras: result
        });
    });
};
