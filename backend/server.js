// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el paquete cors
const connection = require('./db');
const loginController = require('./routes/inicioSesion.js');

const app = express();
const port = 3000;

app.use(cors()); // Usa el middleware cors
app.use(bodyParser.json());

// Endpoint de inicio de sesión
// Definir la ruta de inicio de sesión
app.post('/login', loginController);


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
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});