import express from 'express';
import { config } from 'dotenv';
import fetch from 'node-fetch';

// Cargar variables de entorno
config();

const app = express();
const PORT = 3000;

// Rutas públicas
app.use(express.static('public'));

// Ruta para hacer la solicitud a la API de Exchange Rate
app.get('/api/rates', async (req, res) => {
    try {
        const apiKey = process.env.API_KEY;
        const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos de la API.' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
