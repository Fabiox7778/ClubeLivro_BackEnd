import PersonagemModel from '../models/PersonagemModel.js';
//Importa do model os atributos obrigatórios para a manipulação dos personagens.

//Cria um novo personagem usando os atributos obrigatórios necessários.
export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        // 1. ADICIONADO: idLivro incluído na desestruturação
        const {
            nome,
            aparencia,
            descricao,
            resumo,
            importancia,
            aparencia_en,
            descricao_en,
            resumo_en,
            importancia_en,
            idLivro,
        } = req.body;

        if (nome === undefined || nome === null) {
            return res.status(400).json({
                error: 'O campo "nome" é obrigatório!',
            });
        }
        if (aparencia === undefined || aparencia === null) {
            return res.status(400).json({ error: 'O campo "aparencia" é obrigatório!' });
        }

        if (resumo === undefined || resumo === null) {
            return res.status(400).json({ error: 'O campo "resumo" é obrigatório!' });
        }

        if (descricao === undefined || descricao === null) {
            return res.status(400).json({ error: 'O campo "descricao" é obrigatório!' });
        }

        if (importancia === undefined || importancia === null) {
            return res.status(400).json({ error: 'O campo "importancia" é obrigatório!' });
        }

        if (resumo_en === undefined || resumo_en === null) {
            return res
                .status(400)
                .json({ error: 'To create a character it must have "resumo_en" ' });
        }

        if (aparencia_en === undefined || aparencia_en === null) {
            return res
                .status(400)
                .json({ error: 'To create a character it must have "aparencia_en" ' });
        }

        if (descricao_en === undefined || descricao_en === null) {
            return res
                .status(400)
                .json({ error: 'To create a character it must have "descricao_en" ' });
        }

        if (importancia_en === undefined || importancia_en === null) {
            return res
                .status(400)
                .json({ error: 'To create a character it must have "importancia_en" ' });
        }

        // 2. ADICIONADO: Validação para garantir que o ID do livro foi enviado
        if (idLivro === undefined || idLivro === null) {
            return res
                .status(400)
                .json({ error: 'O campo "idLivro" é obrigatório para vincular ao personagem!' });
        }

        // 3. ADICIONADO: Convertendo idLivro para número e injetando no Model
        const personagem = new PersonagemModel({
            nome,
            aparencia,
            descricao,
            resumo,
            importancia,
            aparencia_en,
            descricao_en,
            resumo_en,
            importancia_en,
            idLivro: Number(idLivro), // Garante o envio correto do ID
        });

        const data = await personagem.criar();

        return res.status(201).json({ message: 'Personagem criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({
            error: 'Erro interno ao salvar a personagem.',
            details: error.message,
        });
    }
};

//Busca todos os personagens existentes.
export const buscarTodos = async (req, res) => {
    try {
        const registros = await PersonagemModel.buscarTodos(req.query);

        if (!registros || registros.length === 0) {
            return res.status(400).json({ message: 'Nenhum registro encontrado.' });
        }

        return res.status(200).json(registros);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar registros.' });
    }
};

//Busca um personagem específico por id.
export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const personagem = await PersonagemModel.buscarPorId(parseInt(id));

        if (!personagem) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: personagem });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar registro.' });
    }
};

//Atualiza um personagem específico por id.
export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const personagem = await PersonagemModel.buscarPorId(parseInt(id));

        if (!personagem) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.nome !== undefined) {
            personagem.nome = req.body.nome;
        }
        if (req.body.aparencia !== undefined) {
            personagem.aparencia = req.body.aparencia;
        }
        if (req.body.descricao !== undefined) {
            personagem.descricao = req.body.descricao;
        }
        if (req.body.importancia !== undefined) {
            personagem.importancia = req.body.importancia;
        }
        if (req.body.aparencia_en !== undefined) {
            personagem.aparencia_en = req.body.aparencia_en;
        }
        if (req.body.descricao_en !== undefined) {
            personagem.descricao_en = req.body.descricao_en;
        }

        if (req.body.importancia_en !== undefined) {
            personagem.importancia_en = req.body.importancia_en;
        }

        const data = await personagem.atualizar();

        return res
            .status(200)
            .json({ message: `O registro "${data.nome}" foi atualizado com sucesso!`, data });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({ error: 'Erro ao atualizar registro.' });
    }
};

//Deleta um personagem específico por id.
export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const personagem = await PersonagemModel.buscarPorId(parseInt(id));

        if (!personagem) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await personagem.deletar();

        return res.status(200).json({
            message: `O registro "${personagem.nome}" foi deletado com sucesso!`,
            deletado: personagem,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
