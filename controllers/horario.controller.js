const fs = require('fs');

exports.addHorarioPage = (req, res) => {
    res.render('horario_add.ejs', {
        title: "Welcome to Seguach | Add a new Horario",
        message: ''
    });
};

exports.addHorario = (req, res) => {

    let message = '';
    let materia_id = req.body.materia_id;
    let grupo_id = req.body.grupo_id;
    let lapso = req.body.lapso;

    let query = "INSERT INTO `horario` (materia_id, grupo_id, lapso) VALUES ('" +
                        materia_id + "', '" + grupo_id + "', '" + lapso + "')";
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.redirect('/');
                    });
}

exports.editHorarioPage = (req, res) => {
    let materia_id = req.params.id;
    console.log(materia_id);
    let query = "SELECT * FROM `horario` WHERE materia_id = '" + materia_id + "' ";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('horario_edit.ejs', {
            title: "Edit  Horario",
            horarios: result[0],
            message: ''
        });
    });
}

exports.editHorario = (req, res) => {
    let materia_id = req.params.id;
    let grupo_id = req.body.grupo_id;
    let lapso = req.body.lapso;

    let query = "UPDATE `horario` SET `materia_id` = '" + materia_id + "', `grupo_id` = '" + grupo_id + "', `lapso` = '" + lapso + "'";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
}

exports.deleteHorario = (req, res) => {
    let materia_id = req.params.id;
    let deleteUserQuery = 'DELETE FROM horario WHERE materia_id = "' + materia_id + '"';
    db.query(deleteUserQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
}

exports.getHomePage = (req, res) => {
    let query = "SELECT * FROM horario"; // query database to get all the players

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.redirect('/');
        }

        res.render('horario.ejs', {
            title: "Welcome to Seguach | View Horario",
            horarios: result
        });
    });
};
