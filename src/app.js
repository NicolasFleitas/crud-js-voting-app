const express = require('express');
const app = express();
const path = require('path');
const topicRoutes = require('./routes/topicRoutes');

// Middlewares
app.use(express.json());

// 1. VISTA: Servir archivos estáticos (Frontend)
app.use(express.static(path.join(__dirname, 'public')));

// 2. CONTROLADOR/RUTAS: API
app.use('/api', topicRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});