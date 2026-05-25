const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

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
        throw new Error('A resposta da OpenAI não trouxe o array "questoes".');
    }

    if (payload.questoes.length !== quantidadeEsperada) {
        throw new Error(
            `A OpenAI retornou ${payload.questoes.length} questões, mas eram esperadas ${quantidadeEsperada}.`,
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

const montarPrompt = (tema, quantidade) => `
Gere exatamente ${quantidade} questões de múltipla escolha, em nível de vestibular, sobre "${tema}".

Regras:
- Escreva em português do Brasil.
- Inclua a tradução em inglês dos campos textuais.
- Cada questão deve ter 1 resposta correta e 3 respostas erradas plausíveis.
- As respostas erradas não podem repetir a correta.
- A explicação deve ser curta, objetiva e ter no máximo 220 caracteres.
- Priorize respostas curtas.
- Aborde enredo, personagens, narrador, ciúme, memória, ironia machadiana e contexto literário quando fizer sentido.
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

export const gerarQuestoesPorTema = async (tema, quantidade) => {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error('A variável OPENAI_API_KEY não foi configurada no arquivo .env.');
    }

    const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: OPENAI_MODEL,
            response_format: { type: 'json_object' },
            temperature: 0.4,
            max_completion_tokens: Math.max(700, quantidade * 220),
            messages: [
                {
                    role: 'system',
                    content:
                        'Responda apenas com JSON válido. Seja conciso.',
                },
                {
                    role: 'user',
                    content: montarPrompt(tema, quantidade),
                },
            ],
        }),
    });

    if (!response.ok) {
        const body = await response.text();
        throw new Error(`${response.status} ${response.statusText} - ${body}`);
    }

    const data = await response.json();
    const texto = data.choices?.[0]?.message?.content;

    if (!texto) {
        throw new Error('A OpenAI não retornou conteúdo em choices[0].message.content.');
    }

    const payload = extrairJson(texto);
    const questoes = validarQuestoes(payload, quantidade);

    return {
        tema,
        quantidade,
        modelo: OPENAI_MODEL,
        questoes,
    };
};
