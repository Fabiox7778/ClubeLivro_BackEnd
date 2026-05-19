import SimuladosModel from '../models/SimuladosModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const {
            idlivro,
            livro,
            pergunta,
            pergunta_en,
            respostasCorretas,
            respostasCorretas_en,
            respostasErradas,
            respostasErradas_en,
            explicacao,
            explicacao_en,
            geradoPorIA,
        } = req.body;

        if (!livro || !pergunta) {
            return res
                .status(400)
                .json({ error: 'Os campos "livro" e "pergunta" são obrigatórios!' });
        }

        const simulado = new SimuladosModel({
            idlivro,
            livro,
            pergunta,
            pergunta_en,
            respostasCorretas,
            respostasCorretas_en,
            respostasErradas,
            respostasErradas_en,
            explicacao,
            explicacao_en,
            geradoPorIA,
        });
        const data = await simulado.criar();
        return res.status(201).json({ message: 'Registro criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({
            error: 'Erro interno ao salvar o registro.',
            details: error.message,
        });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await SimuladosModel.buscarTodos(req.query);

        if (!registros || registros.length === 0) {
            return res.status(400).json({ message: 'Nenhum registro encontrado.' });
        }

        return res.status(200).json(registros);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({
            error: 'Erro ao buscar registros.',
            details: error.message,
        });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const simulados = await SimuladosModel.buscarPorId(parseInt(id));

        if (!simulados) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: simulados });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({
            error: 'Erro ao buscar registro.',
            details: error.message,
        });
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

        const simulados = await SimuladosModel.buscarPorId(parseInt(id));

        if (!simulados) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.pergunta !== undefined) {
            simulados.pergunta = req.body.pergunta;
        }
        if (req.body.pergunta_en !== undefined) {
            simulados.pergunta_en = req.body.pergunta_en;
        }

        if (req.body.geradoPorIA !== undefined) {
            simulados.geradoPorIA = req.body.geradoPorIA;
        }

        if (req.body.respostasCorretas !== undefined) {
            simulados.respostasCorretas = req.body.respostasCorretas;
        }

        if (req.body.respostasCorretas_en !== undefined) {
            simulados.respostasCorretas_en = req.body.respostasCorretas_en;
        }

        if (req.body.respostasErradas !== undefined) {
            simulados.respostasErradas = req.body.respostasErradas;
        }

        if (req.body.respostasErradas_en !== undefined) {
            simulados.respostasErradas_en = req.body.respostasErradas_en;
        }

        if (req.body.explicacao !== undefined) {
            simulados.explicacao = req.body.explicacao;
        }

        if (req.body.explicacao_en !== undefined) {
            simulados.explicacao_en = req.body.explicacao_en;
        }

        const data = await simulados.atualizar();

        return res
            .status(200)
            .json({ message: `O registro "${data.pergunta}" foi atualizado com sucesso!`, data });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({
            error: 'Erro ao atualizar registro.',
            details: error.message,
        });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const simulados = await SimuladosModel.buscarPorId(parseInt(id));

        if (!simulados) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await simulados.deletar();

        return res.status(200).json({
            message: `O registro "${simulados.pergunta}" foi deletado com sucesso!`,
            deletado: simulados,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({
            error: 'Erro ao deletar registro.',
            details: error.message,
        });
    }
};

// NOVA ROTA PARA O N8N
export const gerarComIA = async (req, res) => {
    try {
        const { idlivro, livro, quantidade } = req.body;

        if (!idlivro || !livro) {
            return res.status(400).json({ error: 'Os campos "idlivro" e "livro" são obrigatórios!' });
        }

        // URL do webhook gerado pelo seu fluxo no n8n
        const URL_WEBHOOK_N8N = 'http://localhost:5678/webhook/gerar-quiz'; 

        // Faz o disparo para o n8n repassando os parâmetros
        const respostaN8n = await fetch(URL_WEBHOOK_N8N, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idlivro,
                livro,
                quantidade: quantidade || 5
            })
        });

        if (!respostaN8n.ok) {
            throw new Error(`O n8n respondeu com status: ${respostaN8n.status}`);
        }

        const dadosSalvos = await respostaN8n.json();

        return res.status(201).json({ 
            message: "Solicitação enviada! O fluxo do n8n gerou o simulado com sucesso.", 
            data: dadosSalvos 
        });

    } catch (error) {
        console.error('Erro ao disparar fluxo no n8n:', error);
        return res.status(500).json({
            error: 'Erro interno ao acionar o n8n.',
            details: error.message,
        });
    }
};