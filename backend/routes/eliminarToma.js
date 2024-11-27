const connection = require('../db');

// Obtener las tomas de agua de un usuario
const obtenerTomas = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: 'El userId es obligatorio' });
  }

  connection.query(
    'SELECT * FROM toma_de_agua WHERE id_usuario = ?',
    [userId],
    (error, results) => {
      if (error) {
        console.error('Error al obtener las tomas:', error);
        return res.status(500).json({ error: 'Error en el servidor' });
      }

      // Devuelve siempre un array vacío si no hay resultados
      return res.status(200).json({ tomas: results || [] });
    }
  );
};

// Eliminar una toma de agua
const eliminarToma = (req, res) => {
  const { id_toma } = req.params;

  console.log('ID de la toma recibida para eliminar:', id_toma); // Registro para depuración

  if (!id_toma) {
    return res.status(400).json({ error: 'El id_toma es obligatorio' });
  }

  connection.query(
    'DELETE FROM toma_de_agua WHERE id_toma = ?',
    [id_toma],
    (error, results) => {
      if (error) {
        console.error('Error al eliminar la toma:', error);
        return res.status(500).json({ error: 'Error en el servidor' });
      }

      console.log('Resultados de la eliminación:', results); // Registro para depuración
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'No se encontró la toma especificada' });
      }

      return res.status(200).json({ message: 'Toma de agua eliminada correctamente' });
    }
  );
};

module.exports = { obtenerTomas, eliminarToma };