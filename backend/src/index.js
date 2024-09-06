const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();
app.use(bodyParser.json());

// Rotas de autenticação
app.use('/auth', authRoutes);

// Rotas de tickets
app.use('/api', ticketRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Rota de hello world
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
