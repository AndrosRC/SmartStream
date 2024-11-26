const connection = require('../db');

const actualizarUsuario = (req, res) => {
  const { id } = req.params;
  const { nombre, numero_tel, correo_electronico, contrasena } = req.body;

  if (!nombre || !correo_electronico || !contrasena) {
    return res.status(400).json({ error: 'Nombre, correo electrónico y contraseña son obligatorios' });
  }

  connection.query(
    'UPDATE Usuario SET nombre = ?, numero_tel = ?, correo_electronico = ?, contrasena = ? WHERE id_usuario = ?',
    [nombre, numero_tel || null, correo_electronico, contrasena, id],
    (error, results) => {
      if (error) {
        console.error('Error al actualizar el usuario:', error);
        return res.status(500).json({ error: 'Error en el servidor' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.status(200).json({ message: 'Datos actualizados correctamente' });
    }
  );
};

module.exports = actualizarUsuario;