const fs = require('fs');

exports.addProfesorPage = (req, res) => {
    res.render('professor_add.ejs', {
        title: "Welcome to Seguach | Add a new player",
        message: ''
    });
};

exports.addProfesor = (req, res) => {

    let message = '';
    let professor_name = req.body.professor_name;
    let professor_lname = req.body.professor_lname;
    let professor_email = req.body.professor_email;

    let usernameQuery = "SELECT * FROM `profesores` WHERE professor_email = '" + professor_email + "'";

    db.query(usernameQuery, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        if (result.length > 0) {
            message = 'Username already exists';
            res.render('professor_add.ejs', {
                message,
                title: "Welcome to Seguach | Add a new profesor"
            });
        } else {
            // check the filetype before uploading it

                // upload the file to the /public/assets/img directory


                    // send the player's details to the database
                    let query = "INSERT INTO `profesores` (professor_name, professor_lname, professor_email) VALUES ('" +
                        professor_name + "', '" + professor_lname + "', '" + professor_email + "')";
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.redirect('/');
                    });


        }
    });
}

exports.editProfesorPage = (req, res) => {
    let profesor_id = req.params.id;
    console.log(profesor_id);
    let query = "SELECT * FROM `profesores` WHERE professor_id = '" + profesor_id + "' ";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('edit-player.ejs', {
            title: "Edit  Player",
            professor: result[0],
            message: ''
        });
    });
}

exports.editProfesor = (req, res) => {
    let professor_id = req.params.id;
    let professor_name = req.body.professor_name;
    let professor_lname = req.body.professor_lname;
    let professor_email = req.body.professor_email;

    let query = "UPDATE `profesores` SET `professor_name` = '" + professor_name + "', `professor_lname` = '" + professor_lname + "', `professor_id` = '" + professor_id + "' WHERE `professor_id` = '" + professor_id + "'";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
}

exports.deleteProfesor = (req, res) => {
    let professor_id = req.params.id;
    let deleteUserQuery = 'DELETE FROM profesores WHERE professor_id = "' + professor_id + '"';
    db.query(deleteUserQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
}

exports.getHomePage = (req, res) => {
    let query = "SELECT * FROM `profesores` ORDER BY professor_id ASC"; // query database to get all the players

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.redirect('/');
        }

        res.render('profesores.ejs', {
            title: "Welcome to Seguach | View Players",
            profesores: result
        });
    });
};
