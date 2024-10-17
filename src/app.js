import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

// Configura la carpeta 'public' para servir archivos estáticos
app.use(express.static('public'));

// Sirve la página principal (index.html) cuando accedas a la raíz del sitio
app.get('/', (req, res) => {
  res.sendFile(path.resolve('public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
