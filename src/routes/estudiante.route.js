const express = require('express');
const router = express.Router();

const estudController = require ('../controller/estud.controller')


router.get('/', estudController.openView);

router.get('/lista', estudController.openView2);

router.post('/registrar', estudController.registrar);

router.get('/listar_doc', estudController.listar_doc);

router.get('listar_ciclo', estudController.listar_ciclo);

router.get('listar_periodo', estudController.listar_periodo);

router.get('listar_modalidad', estudController.listar_modalidad);


module.exports= router;