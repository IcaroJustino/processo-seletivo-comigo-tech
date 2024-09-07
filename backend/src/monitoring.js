const express = require('express');
const client = require('prom-client');

const app = express();
const collectDefaultMetrics = client.collectDefaultMetrics;

// Colete métricas padrão a cada 5 segundos
collectDefaultMetrics({ timeout: 5000 });

// Crie um endpoint para expor as métricas
app.get('/metrics', async (req, res) => {
    try {
        res.set('Content-Type', client.register.contentType);
        res.end(await client.register.metrics());
    } catch (ex) {
        res.status(500).end(ex);
    }
});

const PORT = process.env.MONITORING_PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor de monitoramento rodando na porta ${PORT}`);
});