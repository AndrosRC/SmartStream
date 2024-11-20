const connection = require('../db');

const loginController = (req, res) => {
    const { correo_electronico, contrasena } = req.body;

    connection.query('SELECT * FROM Usuario WHERE correo_electronico = ? AND contrasena = ?', [correo_electronico, contrasena], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        if (results.length > 0) {
            res.status(200).json({ message: 'Inicio de sesión exitoso' });
        } else {
            res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    });
};



module.exports = loginController;