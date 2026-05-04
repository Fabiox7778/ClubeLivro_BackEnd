import SobreModel from '../models/SobreModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const { pergunta, descricao, pergunta_en, descricao_en } = req.body;

        if (!nome) {
            return res.status(400).json({ error: 'O campo "nome" é obrigatório!' });
        }

        const sobre = new SobreModel({ pergunta, descricao, pergunta_en, descricao_en});
        const data = await sobre.criar();

        return res.status(201).json({ message: 'Registro criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await SobreModel.buscarTodos(req.query);

        if (!registros || registros.length === 0) {
            return res.status(400).json({ message: 'Nenhum registro encontrado.' });
        }

        return res.status(200).json(registros);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar registros.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const sobre = await SobreModel.buscarPorId(parseInt(id));

        if (!sobre) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: sobre });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar registro.' });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const sobre = await SobreModel.buscarPorId(parseInt(id));

        if (!sobre) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.pergunta !== undefined) {
            sobre.pergunta = req.body.pergunta;
        }
        if (req.body.descricao !== undefined) {
            sobre.descricao = req.body.descricao;
        }
         if (req.body.pergunta_en !== undefined) {
             sobre.pergunta_en = req.body.pergunta_en;
        }
         if (req.body.descricao_en !== undefined) {
             sobre.descricao_en = req.body.descricao_en;
        }
        const data = await sobre.atualizar();

        return res.status(200)
            .json({ message: `O registro "${data.pergunta}" foi atualizado com sucesso!`, data });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({ error: 'Erro ao atualizar registro.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const sobre = await SobreModel.buscarPorId(parseInt(id));

        if (!sobre) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await sobre.deletar();

        return res.status(200).json({
                message: `O registro "${sobre.pergunta}" foi deletado com sucesso!`,
                deletado: sobre,
            });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
