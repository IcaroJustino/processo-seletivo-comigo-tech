const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const reasonRoutes = require('./routes/reasonRoutes');
const veichleRoutes = require('./routes/veichleRoutes');
const statusRoutes = require('./routes/statusRoutes');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

app.use(cors());





// Rotas de autenticação
app.use('/auth', authRoutes);


// Rotas de contatos
app.use('/admin', contactRoutes);
app.use('/admin', reasonRoutes);
app.use('/admin', veichleRoutes);
app.use('/admin', statusRoutes);

// Rotas de tickets
app.use('/api', ticketRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Rota de hello world para teste
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

