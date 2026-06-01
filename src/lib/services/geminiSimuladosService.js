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
    return `Você é um especialista em conteúdos literários e questões de vestibular. Gere exatamente ${quantidade} questões de múltipla escolha sobre "${tema}".

IMPORTANTE: Retorne APENAS um JSON válido sem nenhum texto adicional antes ou depois.

Formato obrigatório:
\`\`\`json
{
  "questoes": [
    {
      "pergunta": "Pergunta clara em português",
      "pergunta_en": "Clear question in English",
      "respostaCorreta": "A resposta certa completa",
      "respostaCorreta_en": "The complete correct answer",
      "respostasErradas": [
        "Distrator realista 1",
        "Distrator realista 2",
        "Distrator realista 3"
      ],
      "respostasErradas_en": [
        "Realistic distractor 1",
        "Realistic distractor 2",
        "Realistic distractor 3"
      ],
      "explicacao": "Explicação detalhada do conceito",
      "explicacao_en": "Detailed explanation of the concept"
    }
  ]
}
\`\`\`

Requisitos:
- Perguntas devem ser específicas sobre "${tema}"
- Respostas devem ser realistas e educacionais
- Respostas erradas devem ser distractores plausíveis, não óbvios
- Explicações devem ajudar na aprendizagem
- Sem texto antes ou depois do JSON!`;
};

const gerarQuestoesMock = (tema, quantidade) => {
    const temaLimpo = typeof tema === 'string' ? tema.trim() : 'conteúdo literário';

    // Questões específicas por tema
    const questoesPorTema = {
        'os sertões': [
            {
                pergunta: 'Qual é o principal foco temático de "Os Sertões"?',
                pergunta_en: 'What is the main thematic focus of "Os Sertões"?',
                respostaCorreta: 'A luta pela sobrevivência no sertão nordestino',
                respostaCorreta_en: 'The struggle for survival in the northeastern backlands',
                respostasErradas: [
                    'A vida urbana no Rio de Janeiro',
                    'A revolução industrial no Brasil',
                    'A colonização portugueda',
                ],
                respostasErradas_en: [
                    'Urban life in Rio de Janeiro',
                    'The industrial revolution in Brazil',
                    'Portuguese colonization',
                ],
                explicacao:
                    'Euclides da Cunha retrata as dificuldades das populações do sertão e a Guerra de Canudos.',
                explicacao_en:
                    'Euclides da Cunha depicts the hardships of northeastern backland populations and the Canudos War.',
            },
        ],
        peidos: [
            {
                pergunta: 'Em qual contexto histórico ocorrem as manifestações culturais do povo?',
                pergunta_en:
                    'In which historical context do cultural expressions of the people occur?',
                respostaCorreta: 'Durante períodos de resistência e identidade cultural',
                respostaCorreta_en: 'During periods of resistance and cultural identity',
                respostasErradas: [
                    'Apenas em celebrações religiosas formais',
                    'Somente em contextos acadêmicos',
                    'Exclusivamente em ambientes urbanos',
                ],
                respostasErradas_en: [
                    'Only in formal religious celebrations',
                    'Solely in academic contexts',
                    'Exclusively in urban environments',
                ],
                explicacao:
                    'As manifestações culturais refletem a história e os valores de um povo.',
                explicacao_en: 'Cultural expressions reflect the history and values of a people.',
            },
        ],
    };

    const questoesEspecificas = questoesPorTema[temaLimpo.toLowerCase()] || [];

    return Array.from({ length: quantidade }, (_, index) => {
        const questaoEspecifica = questoesEspecificas[index % questoesEspecificas.length];

        if (questaoEspecifica) {
            return questaoEspecifica;
        }

        return {
            pergunta: `Qual aspecto é fundamental em "${temaLimpo}"?`,
            pergunta_en: `What aspect is fundamental in "${temaLimpo}"?`,
            respostaCorreta: `Um elemento essencial relacionado a ${temaLimpo}`,
            respostaCorreta_en: `An essential element related to ${temaLimpo}`,
            respostasErradas: [
                `Um conceito não relacionado a ${temaLimpo}`,
                `Um aspecto secundário ignorado pela crítica`,
                `Um elemento anacrônico ao período`,
            ],
            respostasErradas_en: [
                `A concept unrelated to ${temaLimpo}`,
                `A secondary aspect ignored by critics`,
                `An anachronistic element to the period`,
            ],
            explicacao: `Esta questão aborda um ponto central da obra "${temaLimpo}".`,
            explicacao_en: `This question addresses a central point of the work "${temaLimpo}".`,
        };
    });
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
            console.error(`❌ OpenAI API Error ${resposta.status}:`, textoErro);
            return {
                tema: temaLimpo,
                quantidade: total,
                questoes: gerarQuestoesMock(temaLimpo, total),
                origem: 'mock_api_error',
            };
        }

        const dados = await resposta.json();
        const conteudo = dados?.choices?.[0]?.message?.content || '';

        if (!conteudo) {
            console.error('❌ Resposta vazia da OpenAI');
            return {
                tema: temaLimpo,
                quantidade: total,
                questoes: gerarQuestoesMock(temaLimpo, total),
                origem: 'mock_empty_response',
            };
        }

        let questoes;

        try {
            // Remove markdown code blocks se existirem
            let jsonStr = conteudo.trim();
            if (jsonStr.startsWith('```json')) {
                jsonStr = jsonStr.replace(/^```json\n?/, '').replace(/\n?```$/, '');
            } else if (jsonStr.startsWith('```')) {
                jsonStr = jsonStr.replace(/^```\n?/, '').replace(/\n?```$/, '');
            }

            const json = JSON.parse(jsonStr);
            questoes = extrairQuestoes(json);
            console.log(`✅ Gerou ${questoes.length} questões via OpenAI`);
        } catch (error) {
            console.error('❌ Falha ao converter resposta da IA em JSON:', error.message);
            console.error('📝 Conteúdo recebido:', conteudo.substring(0, 300));
            questoes = gerarQuestoesMock(temaLimpo, total);
        }

        return {
            tema: temaLimpo,
            quantidade: total,
            questoes,
            origem: 'openai',
        };
    } catch (error) {
        console.error('❌ Erro inesperado ao gerar questões com OpenAI:', error.message);
        return {
            tema: temaLimpo,
            quantidade: total,
            questoes: gerarQuestoesMock(temaLimpo, total),
            origem: 'mock_exception',
        };
    }
};
