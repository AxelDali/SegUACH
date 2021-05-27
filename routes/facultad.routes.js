const fs = require('fs');
const express = require("express");

const router = express.Router();

const facultadController = require('../controllers/facultades.controller')

router.get('/index', facultadController.getHomePage);
router.get('/add', facultadController.addFacultadPage);
router.get('/edit/:id', facultadController.editFacultadPage);
router.get('/delete/:id', facultadController.deleteFacultad);

router.post('/add', facultadController.addFacultad);
router.post('/edit/:id', facultadController.editFacultad);

module.exports = router;
