import SimuladosModel from '../models/SimuladosModel.js';
// LivroModel removido!
import { gerarQuestoesPorTema } from '../lib/services/geminiSimuladosService.js';

// ... (mantenha a função embaralhar e montarPayloadParaSalvar iguais) ...

export const gerarQuestoes = async (req, res) => {
    try {
        const quantidadeInformada = req.params.quantidade || req.query.quantidade;
        const temaInformado = req.query.tema;
        const idLivroExterno = req.query.idLivro; // <-- Agora recebemos o ID da API externa

        const quantidade = Number(quantidadeInformada || 5);
        const tema = typeof temaInformado === 'string' ? temaInformado.trim() : '';

        if (!Number.isInteger(quantidade) || quantidade < 1 || quantidade > 20) {
            return res.status(400).json({
                error: 'A quantidade de questões deve ser um número inteiro entre 1 e 20.',
            });
        }

        if (!tema || !idLivroExterno) {
            return res.status(400).json({
                error: 'Os parâmetros "tema" e "idLivro" são obrigatórios.',
            });
        }

        // Busca no cache usando o ID da API externa
        const questoesExistentes = await SimuladosModel.buscarPorLivro(idLivroExterno, {
            geradoPorIA: true,
        });

        if (questoesExistentes.length >= quantidade) {
            const questoesSalvas = embaralhar(questoesExistentes).slice(0, quantidade);

            return res.status(200).json({
                message: 'Questões carregadas com sucesso.',
                origem: 'cache',
                tema: tema,
                quantidade,
                idLivro: idLivroExterno, // Retornamos o ID externo
                objetoGerado: {
                    tema: tema,
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

        // Chama a IA se não tiver cache
        const objetoGerado = await gerarQuestoesPorTema(tema, quantidade);

        // Salva usando o ID que veio da API externa
        const payloadParaSalvar = montarPayloadParaSalvar(objetoGerado.questoes, idLivroExterno);

        const resposta = {
            message: 'Questões geradas e salvas com sucesso.',
            origem: 'ia',
            tema: objetoGerado.tema,
            quantidade: objetoGerado.quantidade,
            idLivro: idLivroExterno,
            objetoGerado,
        };

        res.status(200).json(resposta);

        void SimuladosModel.criarMuitos(payloadParaSalvar).catch((error) => {
            console.error('Erro ao salvar questões no banco após resposta:', error);
        });

        return;
    } catch (error) {
        console.error('Erro ao gerar questões com a IA:', error);
        return res.status(500).json({
            error: 'Erro interno ao gerar questões com a IA.',
            details: error.message,
        });
    }
};
