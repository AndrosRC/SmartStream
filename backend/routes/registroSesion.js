const connection = require("../db");

const registro = (req, res) => {
  const { nombre, correo_electronico, contrasena } = req.body;

  if (!nombre || !correo_electronico || !contrasena) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  connection.query(
    'INSERT INTO Usuario (nombre, correo_electronico, contrasena) VALUES (?, ?, ?)',
    [nombre, correo_electronico, contrasena],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Error en el servidor' });
      }
      return res.status(200).json({ message: 'Datos enviados correctamente' });
    }
  );
  
};

module.exports = registro;