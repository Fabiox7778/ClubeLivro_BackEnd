const GOOGLE_MODEL = 'models/text-bison-001';
const GOOGLE_API_URL = `https://generativelanguage.googleapis.com/v1beta2/${GOOGLE_MODEL}:generate`;

const extrairJsonValido = (texto) => {
    const inicio = texto.indexOf('{');
    const fim = texto.lastIndexOf('}');

    if (inicio === -1 || fim === -1 || fim <= inicio) {
        throw new Error('Resposta da IA não contém JSON válido.');
    }

    const textoJson = texto.slice(inicio, fim + 1);
    return JSON.parse(textoJson);
};

const normalizarQuestao = (questao, defaultTema, index) => {
    const respostasErradas = Array.isArray(questao.respostasErradas)
        ? questao.respostasErradas
        : Array.isArray(questao.incorrectAnswers)
          ? questao.incorrectAnswers
          : Array.isArray(questao.respostas_erradas)
            ? questao.respostas_erradas
            : [];

    const respostasErradasEn = Array.isArray(questao.respostasErradas_en)
        ? questao.respostasErradas_en
        : Array.isArray(questao.incorrectAnswers_en)
          ? questao.incorrectAnswers_en
          : Array.isArray(questao.respostas_erradas_en)
            ? questao.respostas_erradas_en
            : [];

    return {
        pergunta:
            questao.pergunta || questao.question || `Questão ${index + 1} sobre ${defaultTema}.`,
        pergunta_en:
            questao.pergunta_en ||
            questao.question_en ||
            `Question ${index + 1} about ${defaultTema}.`,
        respostaCorreta:
            questao.respostaCorreta || questao.correctAnswer || questao.resposta_correta || '',
        respostaCorreta_en:
            questao.respostaCorreta_en ||
            questao.correctAnswer_en ||
            questao.resposta_correta_en ||
            '',
        respostasErradas: respostasErradas.slice(0, 3),
        respostasErradas_en: respostasErradasEn.slice(0, 3),
        explicacao: questao.explicacao || questao.explanation || '',
        explicacao_en: questao.explicacao_en || questao.explanation_en || '',
    };
};

const montarPromptDeGeracao = (tema, quantidade) => {
    return `Crie ${quantidade} questões de múltipla escolha sobre o tema "${tema}". Cada questão deve ter:
- uma pergunta em português e em inglês
- uma resposta correta em português e em inglês
- três alternativas erradas em português e em inglês
- uma explicação em português e em inglês

Retorne apenas um único objeto JSON válido no formato:
{
  "tema": "...",
  "quantidade": ${quantidade},
  "questoes": [
    {
      "pergunta": "...",
      "pergunta_en": "...",
      "respostaCorreta": "...",
      "respostaCorreta_en": "...",
      "respostasErradas": ["...","...","..."],
      "respostasErradas_en": ["...","...","..."],
      "explicacao": "...",
      "explicacao_en": "..."
    }
  ]
}

Não inclua texto adicional fora do JSON. Use apenas alternativas plausíveis, claras e diretamente relacionadas ao tema.`;
};

export const gerarQuestoesPorTema = async (tema, quantidade = 5) => {
    const temaLimpo = typeof tema === 'string' ? tema.trim() : '';
    const total = Number(quantidade) || 5;

    if (!temaLimpo) {
        throw new Error('Tema inválido para geração de questões.');
    }

    if (!Number.isInteger(total) || total < 1 || total > 20) {
        throw new Error('A quantidade de questões deve ser um número inteiro entre 1 e 20.');
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
        throw new Error('A variável de ambiente GOOGLE_API_KEY não está definida.');
    }

    const prompt = montarPromptDeGeracao(temaLimpo, total);

    const response = await fetch(`${GOOGLE_API_URL}?key=${encodeURIComponent(apiKey)}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: {
                text: prompt,
            },
            temperature: 0.2,
            candidateCount: 1,
            maxOutputTokens: 1000,
        }),
    });

    if (!response.ok) {
        const corpo = await response.text();
        throw new Error(
            `Erro ao chamar API de IA: ${response.status} ${response.statusText} - ${corpo}`
        );
    }

    const dados = await response.json();
    const textoGerado = dados?.candidates?.[0]?.output || dados?.outputs?.[0]?.output || '';
    if (!textoGerado) {
        throw new Error('Resposta da IA não retornou texto de saída esperada.');
    }

    const resultado = extrairJsonValido(textoGerado);
    const questoes = Array.isArray(resultado.questoes)
        ? resultado.questoes.map((questao, index) => normalizarQuestao(questao, temaLimpo, index))
        : [];

    if (questoes.length !== total) {
        throw new Error(`A IA retornou ${questoes.length} questões em vez de ${total}.`);
    }

    return {
        tema: resultado.tema || temaLimpo,
        quantidade: resultado.quantidade || total,
        questoes,
    };
};
