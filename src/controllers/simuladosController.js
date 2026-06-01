import { gerarQuestoesPorTema } from '../lib/services/geminiSimuladosService.js';
import SimuladosModel from '../models/SimuladosModel.js';

const gerarIdLivroParaTema = (tema) => {
    return String(tema).trim();
};

const embaralhar = (itens) => {
    const copia = [...itens];

    for (let i = copia.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
};

const montarPayloadParaSalvar = (questoes, idLivro) => {
    return questoes.map((questao) => ({
        idLivro,
        pergunta: questao.pergunta,
        pergunta_en: questao.pergunta_en,
        respostaCorreta: questao.respostaCorreta,
        respostaCorreta_en: questao.respostaCorreta_en,
        respostasErradas: questao.respostasErradas,
        respostasErradas_en: questao.respostasErradas_en,
        explicacao: questao.explicacao,
        explicacao_en: questao.explicacao_en,
        geradoPorIA: true,
    }));
};

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const {
            idLivro,
            pergunta,
            pergunta_en,
            respostaCorreta,
            respostaCorreta_en,
            respostasErradas,
            respostasErradas_en,
            explicacao,
            explicacao_en,
            geradoPorIA,
        } = req.body;

        if (!idLivro || !pergunta || !respostaCorreta || !Array.isArray(respostasErradas)) {
            return res.status(400).json({
                error: 'Os campos "idLivro", "pergunta", "respostaCorreta" e "respostasErradas" são obrigatórios!',
            });
        }

        const simulado = new SimuladosModel({
            idLivro,
            pergunta,
            pergunta_en,
            respostaCorreta,
            respostaCorreta_en,
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

        if (req.body.idLivro !== undefined) {
            simulados.idLivro = req.body.idLivro;
        }

        if (req.body.respostaCorreta !== undefined) {
            simulados.respostaCorreta = req.body.respostaCorreta;
        }

        if (req.body.respostaCorreta_en !== undefined) {
            simulados.respostaCorreta_en = req.body.respostaCorreta_en;
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

export const gerarQuestoes = async (req, res) => {
    try {
        const quantidadeInformada = req.params.quantidade || req.query.quantidade;
        const temaInformado = req.query.tema;
        const quantidade = Number(quantidadeInformada || 5);
        const tema = typeof temaInformado === 'string' ? temaInformado.trim() : '';

        if (!Number.isInteger(quantidade) || quantidade < 1 || quantidade > 20) {
            return res.status(400).json({
                error: 'A quantidade de questões deve ser um número inteiro entre 1 e 20.',
            });
        }

        if (!tema) {
            return res.status(400).json({
                error: 'O parâmetro "tema" é obrigatório.',
            });
        }

        const idLivroTema = gerarIdLivroParaTema(tema);
        const forcarGeracao = req.query.force === 'true' || req.query.forcarGeracao === 'true';
        const questoesExistentes = await SimuladosModel.buscarPorLivro(idLivroTema, {
            geradoPorIA: true,
        });

        if (!forcarGeracao && questoesExistentes.length >= quantidade) {
            const questoesSalvas = embaralhar(questoesExistentes).slice(0, quantidade);

            return res.status(200).json({
                message: 'Questões carregadas com sucesso.',
                origem: 'cache',
                tema,
                quantidade,
                idLivro: idLivroTema,
                objetoGerado: {
                    tema,
                    quantidade,
                    questoes: questoesSalvas.map((questao) => ({
                        pergunta: questao.pergunta,
                        pergunta_en: questao.pergunta_en,
                        respostaCorreta: questao.respostaCorreta,
                        respostaCorreta_en: questao.respostaCorreta_en,
                        respostasErradas: questao.respostasErradas,
                        respostasErradas_en: questao.respostasErradas_en,
                        explicacao: questao.explicacao,
                        explicacao_en: questao.explicacao_en,
                    })),
                },
                questoesSalvas,
            });
        }

        const objetoGerado = await gerarQuestoesPorTema(tema, quantidade);
        const payloadParaSalvar = montarPayloadParaSalvar(objetoGerado.questoes, idLivroTema);

        const resposta = {
            message: 'Questões geradas e salvas com sucesso.',
            origem: 'ia',
            tema: objetoGerado.tema,
            quantidade: objetoGerado.quantidade,
            idLivro: idLivroTema,
            objetoGerado,
        };

        res.status(200).json(resposta);

        void SimuladosModel.criarMuitos(payloadParaSalvar).catch((error) => {
            console.error('Erro ao salvar questões no banco após resposta:', error);
        });

        return;
    } catch (error) {
        console.error('Erro ao gerar questões com IA:', error);
        return res.status(500).json({
            error: 'Erro interno ao gerar questões com IA.',
            details: error.message,
        });
    }
};
