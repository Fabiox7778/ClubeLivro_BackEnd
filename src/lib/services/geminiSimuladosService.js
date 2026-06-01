/**
 * Serviço responsável por gerar questões para simulados.
 *
 * Esta implementação retorna um conjunto de questões simuladas com base no tema
 * e na quantidade informada. A integração com IA real pode ser adicionada aqui
 * posteriormente.
 */
export const gerarQuestoesPorTema = async (tema, quantidade = 5) => {
    const temaLimpo = typeof tema === 'string' ? tema.trim() : '';
    const total = Number(quantidade) || 5;

    if (!temaLimpo) {
        throw new Error('Tema inválido para geração de questões.');
    }

    if (!Number.isInteger(total) || total < 1 || total > 20) {
        throw new Error('A quantidade de questões deve ser um número inteiro entre 1 e 20.');
    }

    const questoes = Array.from({ length: total }, (_, index) => ({
        pergunta: `Questão ${index + 1} sobre ${temaLimpo}.`,
        pergunta_en: `Question ${index + 1} about ${temaLimpo}.`,
        respostaCorreta: `Resposta correta para a questão ${index + 1}.`,
        respostaCorreta_en: `Correct answer for question ${index + 1}.`,
        respostasErradas: [
            `Resposta errada A para a questão ${index + 1}.`,
            `Resposta errada B para a questão ${index + 1}.`,
            `Resposta errada C para a questão ${index + 1}.`,
        ],
        respostasErradas_en: [
            `Wrong answer A for question ${index + 1}.`,
            `Wrong answer B for question ${index + 1}.`,
            `Wrong answer C for question ${index + 1}.`,
        ],
        explicacao: `Explicação da questão ${index + 1} sobre ${temaLimpo}.`,
        explicacao_en: `Explanation for question ${index + 1} about ${temaLimpo}.`,
    }));

    return {
        tema: temaLimpo,
        quantidade: total,
        questoes,
    };
};
