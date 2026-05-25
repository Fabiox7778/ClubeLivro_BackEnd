const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const FALLBACK_MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash'];

const extrairJson = (texto) => {
    const conteudo = texto.trim();
    const semMarkdown = conteudo
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/i, '');

    return JSON.parse(semMarkdown);
};

const validarQuestoes = (payload, quantidadeEsperada) => {
    if (!payload || !Array.isArray(payload.questoes)) {
        throw new Error('A resposta do Gemini não trouxe o array "questoes".');
    }

    if (payload.questoes.length !== quantidadeEsperada) {
        throw new Error(
            `O Gemini retornou ${payload.questoes.length} questões, mas eram esperadas ${quantidadeEsperada}.`,
        );
    }

    return payload.questoes.map((questao, index) => {
        const numero = index + 1;
        const camposObrigatorios = [
            'pergunta',
            'pergunta_en',
            'respostaCorreta',
            'respostaCorreta_en',
            'explicacao',
            'explicacao_en',
        ];

        for (const campo of camposObrigatorios) {
            if (!questao[campo] || typeof questao[campo] !== 'string') {
                throw new Error(`A questão ${numero} veio sem o campo obrigatório "${campo}".`);
            }
        }

        if (!Array.isArray(questao.respostasErradas) || questao.respostasErradas.length !== 3) {
            throw new Error(`A questão ${numero} precisa conter exatamente 3 respostasErradas.`);
        }

        if (
            !Array.isArray(questao.respostasErradas_en) ||
            questao.respostasErradas_en.length !== 3
        ) {
            throw new Error(`A questão ${numero} precisa conter exatamente 3 respostasErradas_en.`);
        }

        return {
            pergunta: questao.pergunta.trim(),
            pergunta_en: questao.pergunta_en.trim(),
            respostaCorreta: questao.respostaCorreta.trim(),
            respostaCorreta_en: questao.respostaCorreta_en.trim(),
            respostasErradas: questao.respostasErradas.map((item) => String(item).trim()),
            respostasErradas_en: questao.respostasErradas_en.map((item) => String(item).trim()),
            explicacao: questao.explicacao.trim(),
            explicacao_en: questao.explicacao_en.trim(),
        };
    });
};

const montarPrompt = (quantidade) => `
Gere exatamente ${quantidade} questões de múltipla escolha, em nível de vestibular, sobre a obra "Dom Casmurro", de Machado de Assis.

Regras:
- Escreva em português do Brasil.
- Inclua também a tradução em inglês dos campos textuais.
- Cada questão deve ter 1 resposta correta e 3 respostas erradas plausíveis.
- As respostas erradas não podem repetir a correta.
- A explicação deve justificar de forma objetiva por que a resposta correta está certa.
- O tema deve abordar enredo, personagens, narrador, ciúme, memória, ironia machadiana e contexto literário quando fizer sentido.
- Retorne somente JSON válido, sem markdown, sem comentários e sem texto adicional.

Formato obrigatório:
{
  "tema": "Dom Casmurro",
  "questoes": [
    {
      "pergunta": "string",
      "pergunta_en": "string",
      "respostaCorreta": "string",
      "respostaCorreta_en": "string",
      "respostasErradas": ["string", "string", "string"],
      "respostasErradas_en": ["string", "string", "string"],
      "explicacao": "string",
      "explicacao_en": "string"
    }
  ]
}
`.trim();

const gerarViaHttp = async (nomeModelo, prompt, apiKey) => {
    const response = await fetch(`${GEMINI_API_URL}/${nomeModelo}:generateContent`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [{ text: prompt }],
                },
            ],
            generationConfig: {
                responseMimeType: 'application/json',
            },
        }),
    });

    if (!response.ok) {
        const body = await response.text();
        throw new Error(`${response.status} ${response.statusText} - ${body}`);
    }

    const data = await response.json();
    const texto = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!texto) {
        throw new Error('O Gemini não retornou texto em candidates[0].content.parts[0].text.');
    }

    const payload = extrairJson(texto);
    return payload;
};

export const gerarQuestoesDomCasmurro = async (quantidade) => {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('A variável GEMINI_API_KEY não foi configurada no arquivo .env.');
    }

    const prompt = montarPrompt(quantidade);
    const apiKey = process.env.GEMINI_API_KEY;
    const modelosParaTestar = [...new Set([GEMINI_MODEL, ...FALLBACK_MODELS])];
    let ultimoErro;

    for (const nomeModelo of modelosParaTestar) {
        try {
            const payload = await gerarViaHttp(nomeModelo, prompt, apiKey);
            const questoes = validarQuestoes(payload, quantidade);

            return {
                tema: 'Dom Casmurro',
                quantidade,
                modelo: nomeModelo,
                questoes,
            };
        } catch (error) {
            ultimoErro = error;
        }
    }

    throw new Error(
        `Nenhum modelo Gemini configurado respondeu com sucesso. Último erro: ${ultimoErro?.message || 'erro desconhecido'}`,
    );
};
