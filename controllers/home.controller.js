const fs = require('fs');

exports.getHomePage = (req, res) => {
    let query = "SELECT * FROM `profesores` ORDER BY professor_id ASC"; // query database to get all the players

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.redirect('/');
        }

        res.render('index.ejs', {
            title: "Welcome to Seguach | View Players",
            profesores: result
        });
    });
};
