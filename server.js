require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env
require('./src/config/db'); //executa e conecta o bd

const express = require('express');
const app = express();
const taskRoutes = require('./src/routes/taskRoutes');

app.use(express.json());
app.use(express.static('public'));
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});