const pool = require('../database');
const controller = {};
const estudModel = require ('../model/estud.model');

controller.openView = function (req, res) {
    res.render('estudiante/index')
}

controller.openView2 = async function (req, res) {
     const registro = await  estudModel.listar()
console.log(registro)
            res.render('estudiante/list', {registro})
}

controller.registrar = async function (req, res) {
    const {
        nombre,
        apellido,
        id_doc,
        numero_doc,
        lugar_exped,
        codigo_estud,
        id_ciclo,
        programa_acad,
        id_periodo,
        id_modalidad

    } = req.body;
    console.log(req.body);
    const registro = await estudModel.insertar(nombre,apellido,
        id_doc,
        numero_doc,
        lugar_exped,
        codigo_estud,
        id_ciclo,
        programa_acad,
        id_periodo,
        id_modalidad);
    res.redirect('/estudiante/lista');  
};

controller.listar_doc = async function (req, res) {
    const doc = await estudModel.list_doc()
    console.log(doc);
    res.render('estudiante/index', {doc})
};

controller.listar_ciclo = async function (req, res) {
    const ciclo = await estudModel.list_ciclo()
    console.log(ciclo);
    res.render('estudiante/index', {ciclo})
};

controller.listar_periodo = async function (req, res) {
    const periodo = await estudModel.list_periodo()
    console.log(periodo);
    res.render('estudiante/index', {periodo})
};

controller.listar_modalidad = async function (req, res) {
    const modalidad = await estudModel.list_modalidad()
    console.log(modalidad);
    res.render('estudiante/index', {modalidad})
};

module.exports = controller;