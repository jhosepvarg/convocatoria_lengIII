const pool = require('../database');
const model = {};

model.listar = async () => {
    const registro = await pool.query(`SELECT 
	DATE_FORMAT(re.fecha, '%d/%m/%Y') AS fecha,
	ci.nombre AS ciclo,
	es.estado
	
FROM registro re 
LEFT JOIN ciclo ci ON ci.id_ciclo = re.id_ciclo
LEFT JOIN estado es ON es.id_estado = re.id_estado`)
    return registro
};

model.insertar = async (nombre, apellido,
    id_doc,
    numero_doc,
    lugar_exped,
    codigo_estud,
    id_ciclo,
    programa_acad,
    id_periodo,
    id_modalidad) => {
    const data = 'INSERT INTO registro SET ?';
    await pool.query(data, {nombre, apellido,
        id_doc,
        numero_doc,
        lugar_exped,
        codigo_estud,
        id_ciclo,
        programa_acad,
        id_periodo,
        id_modalidad})
};

model.list_doc = async () => {
    const doc = await pool.query('SELECT tipo_doc FROM documento')
    return doc
};

model.list_ciclo = async () => {
    const ciclo = await pool.query('SELECT * FROM ciclo')
    return ciclo
};

model.list_modalidad = async () => {
    const modalidad = await pool.query('SELECT * FROM modalidad')
    return modalidad
};

model.list_periodo = async () => {
    const periodo = await pool.query('SELECT * FROM periodo')
    return periodo
};

module.exports = model;