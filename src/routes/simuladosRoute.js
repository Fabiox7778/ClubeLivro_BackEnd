import express from 'express';
import * as controller from '../controllers/simuladosController.js';

const router = express.Router();

router.post('/', controller.criar);
router.get('/', controller.buscarTodos);

// Rota para gera simulados com IA
router.post('/gerar', controller.gerarComIA);

router.get('/:id', controller.buscarPorId);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);

export default router;