const fs = require('fs');

exports.addGrupoPage = (req, res) => {
    res.render('grupos_add.ejs', {
        title: "Welcome to Seguach | Add a new Grupo",
        message: ''
    });
};

exports.addGrupo = (req, res) => {

    let message = '';
    let grupo_id = req.body.grupo_id;
    let materia_id = req.body.materia_id;
    let query = "INSERT INTO `grupos` (materia_id) VALUES ('" +
                        materia_id + "')";
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.redirect('/');
                    });
}

exports.editGrupoPage = (req, res) => {
    let grupo_id = req.params.id;
    console.log(grupo_id);
    let query = "SELECT * FROM `grupos` WHERE grupo_id = '" + grupo_id + "' ";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('grupos_edit.ejs', {
            title: "Edit  Grupo",
            grupos: result[0],
            message: ''
        });
    });
}

exports.editGrupo = (req, res) => {
    let grupo_id = req.params.id;
    let materia_id = req.body.materia_id;


    let query = "UPDATE `grupos` SET  `materia_id` = '" + materia_id+ "' WHERE `grupo_id` = '" + grupo_id + "'";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
}

exports.deleteGrupo = (req, res) => {
    let grupo_id = req.params.id;
    let deleteUserQuery = 'DELETE FROM grupos WHERE grupo_id = "' + grupo_id + '"';
    db.query(deleteUserQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
}

exports.getHomePage = (req, res) => {
    let query = "SELECT * FROM `grupos` ORDER BY grupo_id ASC"; // query database to get all the players

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.redirect('/');
        }

        res.render('grupos.ejs', {
            title: "Welcome to Seguach | View Grupos",
            grupos: result
        });
    });
};
