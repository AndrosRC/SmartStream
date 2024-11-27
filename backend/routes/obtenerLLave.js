const connection = require('../db');

// Obtener las tomas de agua de un usuario
const obtenerLlave = (req, res) => {
  const { id_toma } = req.params;

  if (!id_toma) {
    return res.status(400).json({ error: 'La id de la toma es obligatoria' });
  }

  connection.query(
    'SELECT * FROM toma_de_agua WHERE id_toma = ?',
    [id_toma],
    (error, results) => {
      if (error) {
        console.error('Error al obtener las tomas:', error);
        return res.status(500).json({ error: 'Error en el servidor' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'No se encontraron tomas con esta id' });
      }

      return res.status(200).json({ tomas: results });
    }
  );
};

module.exports = obtenerLlave;