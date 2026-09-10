const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

const contactoHandler = require('./api/contacto');

// Endpoint para el envío de correo de contacto
app.post('/api/contacto', contactoHandler);

// Exportar app para Vercel serverless
module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor Backend CREN-UMCE ejecutándose en http://localhost:${PORT}`);
  });
}
