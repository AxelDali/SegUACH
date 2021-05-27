const fs = require('fs');

exports.addFacultadPage = (req, res) => {
    res.render('facultades_add.ejs', {
        title: "Welcome to Seguach | Add a new Facultad",
        message: ''
    });
};

exports.addFacultad = (req, res) => {

    let message = '';
    let facultad_id = req.body.facultad_id;
    let facultad_nombre = req.body.facultad_nombre;
    let decripcion = req.body.decripcion;

    let usernameQuery = "SELECT * FROM `facultades` WHERE facultad_nombre = '" + facultad_nombre + "'";

    db.query(usernameQuery, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        if (result.length > 0) {
            message = 'Username already exists';
            res.render('facultades_add.ejs', {
                message,
                title: "Welcome to Seguach | Add a new Facultad"
            });
        } else {
            let query = "INSERT INTO `facultades` (facultad_nombre, decripcion) VALUES ('" +
                        facultad_nombre + "', '" + decripcion +  "')";
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.redirect('/');
                    });
        }
    });
}

exports.editFacultadPage = (req, res) => {
    let facultad_id = req.params.id;
    console.log(facultad_id);
    let query = "SELECT * FROM `facultades` WHERE facultad_id = '" + facultad_id + "' ";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('facultades_edit.ejs', {
            title: "Edit  Facultad",
            facultades: result[0],
            message: ''
        });
    });
}

exports.editFacultad = (req, res) => {
    let facultad_id = req.params.id;
    let facultad_nombre = req.body.facultad_nombre;
    let decripcion = req.body.decripcion;

    let query = "UPDATE `facultades` SET `facultad_id` = '" + facultad_id + "', `facultad_nombre` = '" + facultad_nombre + "', `decripcion` = '" + decripcion + "' WHERE `facultad_id` = '" + facultad_id + "'";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
}

exports.deleteFacultad = (req, res) => {
    let facultad_id = req.params.id;
    let deleteUserQuery = 'DELETE FROM facultades WHERE facultad_id= "' + facultad_id + '"';
    db.query(deleteUserQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
}

exports.getHomePage = (req, res) => {
    let query = "SELECT * FROM `facultades` ORDER BY facultad_id ASC"; // query database to get all the players

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.redirect('/');
        }

        res.render('facultades.ejs', {
            title: "Welcome to Seguach | View Facultades",
            facultades: result
        });
    });
};
