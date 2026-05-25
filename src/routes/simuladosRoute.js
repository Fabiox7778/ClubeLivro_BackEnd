import express from 'express';
import * as controller from '../controllers/simuladosController.js';

const router = express.Router();

router.post('/', controller.criar);
router.get('/', controller.buscarTodos);

router.post('/gerar-questoes', controller.gerarQuestoes);
router.post('/gerar-questoes/:quantidade', controller.gerarQuestoes);

router.get('/:id', controller.buscarPorId);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);

export default router;
