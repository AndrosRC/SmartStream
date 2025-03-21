const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el paquete cors
const connection = require('./db');
const loginController = require('./routes/inicioSesion.js');
const registro = require('./routes/registroSesion.js');
const agregarToma = require('./routes/agregarToma.js');
const actualizarUsuario = require('./routes/actualizarUsuario');
const { obtenerTomas, eliminarToma } = require('./routes/eliminarToma');
const obtenerLlave = require('./routes/obtenerLlave');

const app = express();
const port = 3000;

app.use(cors()); // Usa el middleware cors
app.use(bodyParser.json());

// Endpoint de inicio de sesión
app.post('/login', loginController);
app.post('/registro', registro);
app.post('/agregarToma', agregarToma);

app.get('/getTomas/:userId', obtenerTomas);  // Llamará a obtenerTomas con el userId como parámetro
app.get('/getLlave/:id_toma', obtenerLlave); // Llamará a obtenerLlave

// Ruta para eliminar una toma
app.delete('/tomas/:id_toma', eliminarToma);  // Llamará a eliminarToma con el id_toma como parámetro

app.put('/actualizarUsuario/:id', actualizarUsuario);

// Endpoint para obtener los datos de un usuario por ID
app.get('/usuarios/:id', (req, res) => {
    const userId = req.params.id;

    connection.query(
        'SELECT id_usuario AS id, nombre, correo_electronico, numero_tel FROM Usuario WHERE id_usuario = ?',
        [userId],
        (err, results) => {
            if (err) {
                console.error('Error en la base de datos:', err);
                return res.status(500).json({ error: 'Error en el servidor' });
            }

            if (results.length > 0) {
                const usuario = results[0];
                return res.status(200).json(usuario);
            } else {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
        }
    );
});

// Endpoint de ejemplo para obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    connection.query('SELECT * FROM Usuario', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
});

// Iniciar el servidor
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://192.168.0.110:${port}`);
});

