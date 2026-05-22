import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import personagemRoutes from './routes/personagemRoute.js';
import sobreRoutes from './routes/sobreRoute.js';
import equipeRoutes from './routes/equipeRoute.js';
import usuarioRoutes from './routes/usuarioRoute.js';
import fotoRoutes from './routes/fotoRoute.js';
import livroRoutes from './routes/livroRoute.js';
import simuladosRoutes from './routes/simuladosRoute.js';
import conteudosRoutes from './routes/conteudosRoute.js';
import comunidadeRoutes from './routes/comunidadeRoute.js';
import { apiKey } from './lib/middleware/apiKey.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); 

app.use(express.json());

app.get('/', (req, res) => {
    res.send('🚀 API funcionando');
});

// Rotas
app.use('/api/personagem', apiKey, personagemRoutes);
app.use('/api/sobre', apiKey, sobreRoutes);
app.use('/api/equipe', apiKey, equipeRoutes);
app.use('/api/usuario', apiKey, usuarioRoutes);
app.use('/api/user', apiKey, fotoRoutes);
app.use('/api/livro', apiKey, livroRoutes);
app.use('/api/simulados', apiKey, simuladosRoutes);
app.use('/api/conteudos', apiKey, conteudosRoutes);
app.use('/api/comunidade', apiKey, comunidadeRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
