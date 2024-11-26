const connection = require('../db');

// Obtener las tomas de agua de un usuario
const obtenerTomas = (req, res) => {
  const { userId } = req.params;  // Obtener el userId desde los parámetros de la URL

  if (!userId) {
    return res.status(400).json({ error: 'El userId es obligatorio' });
  }

  // Consulta SQL para obtener las tomas asociadas al usuario
  connection.query(
    'SELECT * FROM Toma_de_Agua WHERE id_usuario = ?',
    [userId],
    (error, results) => {
      if (error) {
        console.error('Error al obtener las tomas:', error);
        return res.status(500).json({ error: 'Error en el servidor' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'No se encontraron tomas para este usuario' });
      }

      return res.status(200).json({ tomas: results });  // Devolver las tomas asociadas al usuario
    }
  );
};

// Eliminar una toma de agua
const eliminarToma = (req, res) => {
  const { id_toma } = req.params;

  if (!id_toma) {
    return res.status(400).json({ error: 'El id_toma es obligatorio' });
  }

  connection.query(
    'DELETE FROM Toma_de_Agua WHERE id_toma = ?',
    [id_toma],
    (error, results) => {
      if (error) {
        console.error('Error al eliminar la toma:', error);
        return res.status(500).json({ error: 'Error en el servidor' });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'No se encontró la toma especificada' });
      }

      return res.status(200).json({ message: 'Toma de agua eliminada correctamente' });
    }
  );
};

module.exports = { obtenerTomas, eliminarToma };
