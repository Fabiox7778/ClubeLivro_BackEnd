import EquipeModel from '../models/EquipeModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const { curso, descricao, curso_en, descricao_en, nome, nome_equipe, funcao, foto} = req.body;

        if (!curso) {
            return res.status(400).json({ error: 'O campo "curso" é obrigatório!' });
        }

        if (!nome) {
            return res.status(400).json({ error: 'O campo "nome" é obrigatório!' });
        }

        const equipe = EquipeModel({ curso, descricao, curso_en, descricao_en, nome, nome_equipe, funcao, foto});
        const data = await equipe.criar();

        return res.status(201).json({ message: 'Registro criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await EquipeModel.buscarTodos(req.query);

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

        const equipe = await EquipeModel.buscarPorId(parseInt(id));

        if (!equipe) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: equipe });
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

        const equipe = await EquipeModel.buscarPorId(parseInt(id));

        if (!equipe) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.curso !== undefined) {
            equipe.curso = req.body.curso;
        }
         if (req.body.curso_en !== undefined) {
             equipe.curso_en = req.body.curso_en;
        }
         if (req.body.descricao_en !== undefined) {
             equipe.descricao_en = req.body.descricao_en;
        }

         if (req.body.descricao !== undefined) {
             equipe.descricao = req.body.descricao;
        }

         if (req.body.nome !== undefined) {
             equipe.nome = req.body.nome;
        }

         if (req.body.nome_equipe !== undefined) {
             equipe.nome_equipe = req.body.nome_equipe;
        }

         if (req.body.funcao !== undefined) {
             equipe.funcao = req.body.funcao;
        }

         if (req.body.foto !== undefined) {
             equipe.foto = req.body.foto;
        }

        const data = await equipe.atualizar();

        return res.status(200)
            .json({ message: `O registro "${data.curso}" foi atualizado com sucesso!`, data });
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

        const equipe = await EquipeModel.buscarPorId(parseInt(id));

        if (!equipe) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await equipe.deletar();

        return res.status(200).json({
                message: `O registro "${equipe.curso}" foi deletado com sucesso!`,
                deletado: equipe,
            });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
