const express = require('express');
const app = express();
const path = require('path');
const topicRoutes = require('./src/routes/topicRoutes');
const TopicController = require('./src/controllers/topicController');

// Configuracion de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Middlewares
app.use(express.json());

// Servimos archivos estáticos (CSS y el JS cliente reducido)
app.use(express.static(path.join(__dirname, 'src/public')));

// RUTAS
// 1. RUTA PRINCIPAL (RENDERIZADO SSR)
app.get('/', TopicController.renderHome);

// 2. API (Para las acciones como votar, borrar, etc.)
app.use('/api', topicRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});