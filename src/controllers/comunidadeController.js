import ComunidadeModel from '../models/ComunidadeModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisicao vazio. Envie os dados!' });
        }

        const { titulo, conteudo, autor, categoria, curtidas, idUsuario } = req.body;

        if (!titulo || !conteudo || !autor) {
            return res.status(400).json({
                error: 'Os campos "titulo", "conteudo" e "autor" sao obrigatorios!',
            });
        }

        const publicacao = new ComunidadeModel({
            titulo,
            conteudo,
            autor,
            categoria,
            curtidas,
            idUsuario,
        });
        const data = await publicacao.criar();

        return res.status(201).json({ message: 'Publicacao criada com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({
            error: 'Erro interno ao salvar a publicacao.',
            details: error.message,
        });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await ComunidadeModel.buscarTodos(req.query);

        if (!registros || registros.length === 0) {
            return res.status(400).json({ message: 'Nenhuma publicacao encontrada.' });
        }

        return res.status(200).json(registros);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({
            error: 'Erro ao buscar publicacoes.',
            details: error.message,
        });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado nao e um numero valido.' });
        }

        const publicacao = await ComunidadeModel.buscarPorId(parseInt(id));

        if (!publicacao) {
            return res.status(404).json({ error: 'Publicacao nao encontrada.' });
        }

        return res.status(200).json({ data: publicacao });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({
            error: 'Erro ao buscar publicacao.',
            details: error.message,
        });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID invalido.' });
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisicao vazio. Envie os dados!' });
        }

        const publicacao = await ComunidadeModel.buscarPorId(parseInt(id));

        if (!publicacao) {
            return res.status(404).json({ error: 'Publicacao nao encontrada para atualizar.' });
        }

        if (req.body.titulo !== undefined) {
            publicacao.titulo = req.body.titulo;
        }

        if (req.body.conteudo !== undefined) {
            publicacao.conteudo = req.body.conteudo;
        }

        if (req.body.autor !== undefined) {
            publicacao.autor = req.body.autor;
        }

        if (req.body.categoria !== undefined) {
            publicacao.categoria = req.body.categoria;
        }

        if (req.body.curtidas !== undefined) {
            publicacao.curtidas = req.body.curtidas;
        }

        if (req.body.idUsuario !== undefined) {
            publicacao.idUsuario = req.body.idUsuario;
        }

        const data = await publicacao.atualizar();

        return res
            .status(200)
            .json({ message: `A publicacao "${data.titulo}" foi atualizada com sucesso!`, data });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({
            error: 'Erro ao atualizar publicacao.',
            details: error.message,
        });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID invalido.' });
        }

        const publicacao = await ComunidadeModel.buscarPorId(parseInt(id));

        if (!publicacao) {
            return res.status(404).json({ error: 'Publicacao nao encontrada para deletar.' });
        }

        await publicacao.deletar();

        return res.status(200).json({
            message: `A publicacao "${publicacao.titulo}" foi deletada com sucesso!`,
            deletado: publicacao,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({
            error: 'Erro ao deletar publicacao.',
            details: error.message,
        });
    }
};
