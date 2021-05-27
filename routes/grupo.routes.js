const fs = require('fs');
const express = require("express");

const router = express.Router();

const grupoController = require('../controllers/grupos.controller')

router.get('/index', grupoController.getHomePage);
router.get('/add', grupoController.addGrupoPage);
router.get('/edit/:id', grupoController.editGrupoPage);
router.get('/delete/:id', grupoController.deleteGrupo);

router.post('/add', grupoController.addGrupo);
router.post('/edit/:id', grupoController.editGrupo);

module.exports = router;
