import ConteudosModel from '../models/ConteudosModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const {
            idDoLivro, livro, dicaTitulo, dicaTitulo_en, tipo, tipo_en, descricaoDica, descricaoDica_en, curtidasDica, material,
        } = req.body;

        if (!tipo) {
            return res.status(400).json({ error: 'O campo "tipo" é obrigatório!' });
        }

        const conteudos = ConteudosModel({
            idDoLivro, livro, dicaTitulo, dicaTitulo_en, tipo, tipo_en, descricaoDica, descricaoDica_en, curtidasDica, material
        });
        const data = await conteudos.criar();

        return res.status(201).json({ message: 'Registro criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await ConteudosModel.buscarTodos(req.query);

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

        const conteudos = await ConteudosModel.buscarPorId(parseInt(id));

        if (!conteudos) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: conteudos });
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

        const conteudos = await ConteudosModel.buscarPorId(parseInt(id));

        if (req.body.idDoLivro !== undefined) {
             conteudos.idDoLivro = req.body.idDoLivro;
        }
        if (!conteudos) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.livro !== undefined) {
            conteudos.livro = req.body.livro;
        }
         if (req.body.dicaTitulo !== undefined) {
             conteudos.dicaTitulo = req.body.dicaTitulo;
        }
         if (req.body.dicaTitulo_en !== undefined) {
             conteudos.dicaTitulo_en = req.body.dicaTitulo_en;
        }

         if (req.body.tipo !== undefined) {
             conteudos.tipo = req.body.tipo;
        }

         if (req.body.tipo_en !== undefined) {
             conteudos.tipo_en = req.body.tipo_en;
        }

         if (req.body.descricaoDica !== undefined) {
             conteudos.descricaoDica = req.body.descricaoDica;
        }

         if (req.body.descricaoDica_en !== undefined) {
             conteudos.descricaoDica_en = req.body.descricaoDica_en;
        }

         if (req.body.curtidasDica !== undefined) {
             conteudos.curtidasDica = req.body.curtidasDica;
        }

         if (req.body.material !== undefined) {
             conteudos.material = req.body.material;
        }

        const data = await conteudos.atualizar();

        return res.status(200)
            .json({ message: `O registro "${data.tipo}" foi atualizado com sucesso!`, data });
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

        const conteudos = await ConteudosModel.buscarPorId(parseInt(id));

        if (!conteudos) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await conteudos.deletar();

        return res.status(200).json({
                message: `O registro "${conteudos.tipo}" foi deletado com sucesso!`,
                deletado: conteudos,
            });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
