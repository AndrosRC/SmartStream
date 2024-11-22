const connection = require('../db');

const loginController = (req, res) => {
    const { correo_electronico, contrasena } = req.body;

    connection.query(
        'SELECT * FROM Usuario WHERE correo_electronico = ? AND contrasena = ?',
        [correo_electronico, contrasena],
        (err, results) => {
            if (err) {
                console.error('Error en la base de datos:', err);
                return res.status(500).json({ error: 'Error en el servidor' });
            }

            if (results.length > 0) {
                const usuario = results[0]; // Usamos el primer usuario que coincida con las credenciales
                console.log('Usuario encontrado:', usuario); // Verifica qué datos se están enviando

                // Solo enviamos el ID en la respuesta
                return res.status(200).json({
                    message: 'Inicio de sesión exitoso',
                    user: {
                        id: usuario.id_usuario, // Solo enviamos el ID
                    },
                });
            } else {
                console.log('Credenciales incorrectas');
                return res.status(401).json({ message: 'Credenciales incorrectas' });
            }
        }
    );
};

module.exports = loginController;
