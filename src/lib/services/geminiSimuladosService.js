/**
 * Serviço responsável por gerar questões para simulados.
 *
 * Esta implementação usa a API OpenAI para criar um quiz de questão múltipla escolha
 * com perguntas e respostas em português e inglês. Quando a API não estiver disponível
 * ou falhar na conversão para JSON, será retornado um conjunto de questões de fallback.
 */

const OPENAI_API_KEY = (process.env.OPENAI_API_KEY || '').replace(/^['"]|['"]$/g, '');
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

const validarQuantidade = (quantidade) => {
    const total = Number(quantidade) || 5;

    if (!Number.isInteger(total) || total < 1 || total > 20) {
        throw new Error('A quantidade de questões deve ser um número inteiro entre 1 e 20.');
    }

    return total;
};

const criarPrompt = (tema, quantidade) => {
    return (
        `Você é um assistente especialista em conteúdos literários e questões de vestibular. Gere exatamente ${quantidade} questões de múltipla escolha sobre o tema "${tema}". Para cada questão, devolva um objeto JSON com as chaves:\n` +
        `- pergunta\n` +
        `- pergunta_en\n` +
        `- respostaCorreta\n` +
        `- respostaCorreta_en\n` +
        `- respostasErradas (array de 3 itens)\n` +
        `- respostasErradas_en (array de 3 itens)\n` +
        `- explicacao\n` +
        `- explicacao_en\n` +
        `Retorne uma única resposta JSON válida no formato:\n` +
        `{"questoes": [ { ... }, { ... } ] }\n` +
        `Não inclua texto adicional fora do JSON. As perguntas devem ser claras, relevantes e próprias para revisão literária ou vestibular.`
    );
};

const gerarQuestoesMock = (tema, quantidade) => {
    const temaLimpo = typeof tema === 'string' ? tema.trim() : '';

    return Array.from({ length: quantidade }, (_, index) => ({
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
};

const extrairQuestoes = (conteudo) => {
    if (!conteudo || typeof conteudo !== 'object') {
        throw new Error('Resposta inválida da API de IA.');
    }

    const questoes = conteudo.questoes;

    if (!Array.isArray(questoes) || questoes.length === 0) {
        throw new Error('Não foi possível extrair questões do retorno da IA.');
    }

    return questoes.map((questao) => ({
        pergunta: questao.pergunta || '',
        pergunta_en: questao.pergunta_en || '',
        respostaCorreta: questao.respostaCorreta || '',
        respostaCorreta_en: questao.respostaCorreta_en || '',
        respostasErradas: Array.isArray(questao.respostasErradas) ? questao.respostasErradas : [],
        respostasErradas_en: Array.isArray(questao.respostasErradas_en)
            ? questao.respostasErradas_en
            : [],
        explicacao: questao.explicacao || '',
        explicacao_en: questao.explicacao_en || '',
    }));
};

export const gerarQuestoesPorTema = async (tema, quantidade = 5) => {
    const temaLimpo = typeof tema === 'string' ? tema.trim() : '';
    const total = validarQuantidade(quantidade);

    if (!temaLimpo) {
        throw new Error('Tema inválido para geração de questões.');
    }

    if (!OPENAI_API_KEY || typeof globalThis.fetch !== 'function') {
        return {
            tema: temaLimpo,
            quantidade: total,
            questoes: gerarQuestoesMock(temaLimpo, total),
            origem: 'mock',
        };
    }

    const prompt = criarPrompt(temaLimpo, total);

    try {
        const resposta = await fetch(OPENAI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: OPENAI_MODEL,
                messages: [
                    { role: 'system', content: 'Você é um gerador de quizzes educacionais.' },
                    { role: 'user', content: prompt },
                ],
                temperature: 0.7,
                max_tokens: 1200,
            }),
        });

        if (!resposta.ok) {
            const textoErro = await resposta.text();
            console.error('Erro ao chamar OpenAI:', resposta.status, textoErro);
            return {
                tema: temaLimpo,
                quantidade: total,
                questoes: gerarQuestoesMock(temaLimpo, total),
                origem: 'mock',
            };
        }

        const dados = await resposta.json();
        const conteudo = dados?.choices?.[0]?.message?.content || '';

        let questoes;

        try {
            const json = JSON.parse(conteudo);
            questoes = extrairQuestoes(json);
        } catch (error) {
            console.error('Falha ao converter resposta da IA em JSON:', error.message);
            questoes = gerarQuestoesMock(temaLimpo, total);
        }

        return {
            tema: temaLimpo,
            quantidade: total,
            questoes,
            origem: 'openai',
        };
    } catch (error) {
        console.error('Erro inesperado ao gerar questões com OpenAI:', error);
        return {
            tema: temaLimpo,
            quantidade: total,
            questoes: gerarQuestoesMock(temaLimpo, total),
            origem: 'mock',
        };
    }
};
