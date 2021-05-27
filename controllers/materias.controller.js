const fs = require('fs');

exports.addMateriaPage = (req, res) => {
    res.render('materia_add.ejs', {
        title: "Welcome to Seguach | Add a new Materia",
        message: ''
    });
};

exports.addMateria = (req, res) => {

    let message = '';
    let carrera = req.body.carrera;
    let professor_id = req.body.professor_id;
    let descripcion = req.body.descripcion;
    let materia_nombre = req.body.materia_nombre;

    let usernameQuery = "SELECT * FROM `materias` WHERE materia_nombre = '" + materia_nombre + "'";

    db.query(usernameQuery, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        if (result.length > 0) {
            message = 'Username already exists';
            res.render('materia_add.ejs', {
                message,
                title: "Welcome to Seguach | Add a new Materia"
            });
        } else {
            let query = "INSERT INTO `materias` (carrera, professor_id, descripcion, materia_nombre) VALUES ('" +
                        carrera + "', '" + professor_id + "', '" + descripcion + "', '" + materia_nombre + "')";
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.redirect('/');
                    });
        }
    });
}

exports.editMateriaPage = (req, res) => {
    let materia_id = req.params.id;
    console.log(materia_id);
    let query = "SELECT * FROM `materias` WHERE materia_id = '" + materia_id + "' ";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('materia_edit.ejs', {
            title: "Edit  Materia",
            materias: result[0],
            message: ''
        });
    });
}

exports.editMateria = (req, res) => {
    let materia_id = req.params.id;
    let carrera = req.body.carrera;
    let professor_id = req.body.professor_id;
    let descripcion = req.body.descripcion;
    let materia_nombre = req.body.materia_nombre;

    let query = "UPDATE `materias` SET `materia_nombre` = '" + materia_nombre + "', `carrera` = '" + carrera + "', `descripcion` = '" + descripcion + "', `professor_id` = '" + professor_id + "' WHERE `materia_id` = '" + materia_id + "'";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
}

exports.deleteMateria = (req, res) => {
    let materia_id = req.params.id;
    let deleteUserQuery = 'DELETE FROM materias WHERE materia_id = "' + materia_id + '"';
    db.query(deleteUserQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
}

exports.getHomePage = (req, res) => {
    let query = "SELECT * FROM `materias` ORDER BY materia_id ASC"; // query database to get all the players

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.redirect('/');
        }

        res.render('materia.ejs', {
            title: "Welcome to Seguach | View Materias",
            materias: result
        });
    });
};
