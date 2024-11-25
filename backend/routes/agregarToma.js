const connection = require('../db');

const agregarToma = (req, res) => {
  const { nombre_toma, tipo_toma, id_usuario } = req.body;

  if (!nombre_toma || !tipo_toma || !id_usuario) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  connection.query(
    'INSERT INTO Toma_de_Agua (nombre_toma, tipo_toma, id_usuario) VALUES (?, ?, ?)',
    [nombre_toma, tipo_toma, id_usuario],
    (error, results) => {
      if (error) {
        console.error('Error al insertar en la base de datos:', error);
        return res.status(500).json({ error: 'Error en el servidor' });
      }
      return res.status(200).json({ message: 'Toma de agua agregada correctamente' });
    }
  );
};

module.exports = agregarToma;