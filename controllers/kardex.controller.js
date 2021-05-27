const fs = require('fs');

exports.addKardexPage = (req, res) => {
    res.render('kardex_add.ejs', {
        title: "Welcome to Seguach | Add a new Kardex",
        message: ''
    });
};

exports.addKardex = (req, res) => {

    let message = '';
    let calificacion = req.body.calificacion;
    let materia = req.body.materia;
    let descripcion = req.body.descripcion;


            let query = "INSERT INTO `kardex` (calificacion, materia, descripcion) VALUES ('" +
                        calificacion + "', '" + materia + "', '" + descripcion + "')";
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.redirect('/');
                    });

}

exports.editKardexPage = (req, res) => {
    let calificacion = req.params.id;
    console.log(calificacion);
    let query = "SELECT * FROM `kardex` WHERE calificacion = '" + calificacion + "' ";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('kardex_edit.ejs', {
            title: "Edit  Kardex",
            kardex: result[0],
            message: ''
        });
    });
}

exports.editKardex = (req, res) => {
    let calificacion = req.params.id;
    let materia = req.body.materia;
    let descripcion = req.body.descripcion;

    let query = "UPDATE `kardex` SET `calificacion` = '" + calificacion + "', `materia` = '" + materia + "', `descripcion` = '" + descripcion + "' WHERE `calificacion` = '" + calificacion + "'";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
}

exports.deleteKardex = (req, res) => {
    let calificacion = req.params.id;
    let deleteUserQuery = 'DELETE FROM kardex WHERE calificacion = "' + calificacion + '"';
    db.query(deleteUserQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
}

exports.getHomePage = (req, res) => {
    let query = "SELECT * FROM `kardex`"; // query database to get all the players

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.redirect('/');
        }

        res.render('kardex.ejs', {
            title: "Welcome to Seguach | View Kardex",
            kardex: result
        });
    });
};
