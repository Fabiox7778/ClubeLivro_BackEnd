import express from 'express';
import 'dotenv/config';
import personagemRoutes from './routes/personagemRoute.js';
import sobreRoutes from './routes/sobreRoute.js';


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('🚀 API funcionando');
});

// Rotas
app.use('/api/personagem', personagemRoutes);
app.use('/api/sobre', sobreRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
