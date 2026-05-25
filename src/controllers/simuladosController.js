import SimuladosModel from '../models/SimuladosModel.js';
import LivroModel from '../models/LivroModel.js';
import { gerarQuestoesDomCasmurro } from '../lib/services/geminiSimuladosService.js';

const DADOS_DOM_CASMURRO = {
    titulo: 'Dom Casmurro',
    capa: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Dom_Casmurro_%281899%29.jpg',
    autor: 'Machado de Assis',
    detalhesAutor:
        'Machado de Assis foi um dos maiores escritores da literatura brasileira e principal nome do Realismo no Brasil.',
    detalhesAutor_en:
        'Machado de Assis was one of the greatest writers in Brazilian literature and the leading name of Realism in Brazil.',
    anoPublicacao: 1899,
    genero: 'Romance realista',
    genero_en: 'Realist novel',
    resumo:
        'Narrado por Bentinho, o romance revisita sua juventude, o relacionamento com Capitu e a dúvida permanente sobre uma possível traição.',
    resumo_en:
        'Narrated by Bentinho, the novel revisits his youth, his relationship with Capitu, and the lasting doubt about a possible betrayal.',
    contexto:
        'A obra integra o Realismo brasileiro e explora memória, subjetividade, ciúme, ambiguidade narrativa e crítica social.',
    contexto_en:
        'The work belongs to Brazilian Realism and explores memory, subjectivity, jealousy, narrative ambiguity, and social critique.',
    estiloEscrita:
        'Linguagem irônica, capítulos curtos, narrador subjetivo e forte ambiguidade interpretativa.',
    estiloEscrita_en:
        'Ironic language, short chapters, a subjective narrator, and strong interpretive ambiguity.',
    enredo:
        'Bentinho reconstrói sua história com Capitu e Escobar, tentando convencer o leitor de que foi traído.',
    enredo_en:
        'Bentinho reconstructs his story with Capitu and Escobar, trying to convince the reader that he was betrayed.',
    verossimilhanca:
        'Alta, embora a narrativa seja enviesada pelo ponto de vista do narrador.',
    verossimilhanca_en:
        'High, although the narrative is biased by the narrator’s point of view.',
    caracteristicasLiterarias:
        'Narrador não confiável, análise psicológica, ironia, metalinguagem e crítica às convenções sociais.',
    caracteristicasLiterarias_en:
        'Unreliable narrator, psychological analysis, irony, metafiction, and critique of social conventions.',
    conclusao:
        'Dom Casmurro permanece central no vestibular por exigir leitura crítica da ambiguidade e do narrador.',
    conclusao_en:
        'Dom Casmurro remains central in entrance exams because it demands critical reading of ambiguity and the narrator.',
};

const obterOuCriarLivroDomCasmurro = async () => {
    const livroExistente = await LivroModel.buscarPorTitulo(DADOS_DOM_CASMURRO.titulo);

    if (livroExistente) {
        return livroExistente;
    }

    const livro = new LivroModel(DADOS_DOM_CASMURRO);
    const criado = await livro.criar();

    return new LivroModel(criado);
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
            return res
                .status(400)
                .json({
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
        const quantidadeInformada = req.params.quantidade || req.query.quantidade || req.body?.quantidade;
        const quantidade = Number(quantidadeInformada || 5);

        if (!Number.isInteger(quantidade) || quantidade < 1 || quantidade > 20) {
            return res.status(400).json({
                error: 'A quantidade de questões deve ser um número inteiro entre 1 e 20.',
            });
        }

        const livro = await obterOuCriarLivroDomCasmurro();
        const objetoGerado = await gerarQuestoesDomCasmurro(quantidade);

        const payloadParaSalvar = objetoGerado.questoes.map((questao) => ({
            idLivro: livro.id,
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

        const questoesSalvas = await SimuladosModel.criarMuitos(payloadParaSalvar);

        return res.status(201).json({
            message: 'Questões geradas e salvas com sucesso.',
            tema: objetoGerado.tema,
            quantidade: objetoGerado.quantidade,
            livro: {
                id: livro.id,
                titulo: livro.titulo,
                autor: livro.autor,
            },
            objetoGerado,
            questoesSalvas,
        });
    } catch (error) {
        console.error('Erro ao gerar questões com Gemini:', error);
        return res.status(500).json({
            error: 'Erro interno ao gerar questões com Gemini.',
            details: error.message,
        });
    }
};
