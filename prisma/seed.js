import pg from 'pg';
import 'dotenv/config';
import pkg from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const { PrismaClient } = pkg;
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Limpando o banco de dados...');

    await prisma.simulados.deleteMany();
    await prisma.conteudos.deleteMany();
    await prisma.personagem.deleteMany();
    await prisma.livro.deleteMany();
    await prisma.usuario.deleteMany();
    await prisma.equipe.deleteMany();
    await prisma.sobre.deleteMany();

    console.log('📦 Inserindo Equipe...');

    await prisma.equipe.createMany({
        data: [
            {
                nome_equipe: 'Equipe DevStone',
                nome: 'Danilo Jorge',
                curso: 'Análise e desenvolvimento de sistemas.',
                curso_en: 'Systems analysis and development.',
                funcao: 'Product Owner',
                descricao: 'Responsável pelo desenvolvimento do projeto e documentação.',
                descricao_en: 'Responsible for project development and documentation.',
                foto: 'https://exemplo.com/foto-ana.jpg',
            },
            {
                nome_equipe: 'Equipe DevStone',
                nome: 'Fabio Trevizolli',
                curso: 'Análise e desenvolvimento de sistemas.',
                curso_en: 'Systems analysis and development.',
                funcao: 'Scrum Master',
                descricao:
                    'Garante a organização do time seguindo princípios e práticas do framework scrum.',
                descricao_en:
                    'Ensures the team is organized by following the principles and practices of the Scrum framework.',
                foto: 'https://exemplo.com/foto-carlos.jpg',
            },
            {
                nome_equipe: 'Equipe DevStone',
                nome: 'Yasmin Oliveira',
                curso: 'Análise e desenvolvimento de sistemas.',
                curso_en: 'Systems analysis and development.',
                funcao: 'Developer',
                descricao: 'Responsável pelo desenvolvimento do sistema Back-end',
                descricao_en: 'Responsible for the development of back-end system.',
                foto: 'https://exemplo.com/foto-maria.jpg',
            },
            {
                nome_equipe: 'Equipe DevStone',
                nome: 'Murilo Brustolin',
                curso: 'Análise e desenvolvimento de sistemas.',
                curso_en: 'Systems analysis and development.',
                funcao: 'Developer Full Stack',
                descricao:
                    'Responsável pelo desenvolvimento do Back-end e organização do banco de dados.',
                descricao_en: 'Responsible for back-end development and database organization.',
                foto: 'https://exemplo.com/foto-maria.jpg',
            },
            {
                nome_equipe: 'Equipe DevStone',
                nome: 'Rebeca Alves',
                curso: 'Análise e desenvolvimento de sistemas.',
                curso_en: 'Systems analysis and development.',
                funcao: 'Developer',
                descricao: 'Responsável pelo desenvolvimento do Front-end e prototipação do Figma.',
                descricao_en: 'Responsible for front-end development and prototyping in Figma.',
                foto: 'https://exemplo.com/foto-maria.jpg',
            },
            {
                nome_equipe: 'Equipe DevStone',
                nome: 'Luiz Felipe',
                curso: 'Análise e desenvolvimento de sistemas.',
                curso_en: 'Systems analysis and development.',
                funcao: 'Developer',
                descricao:
                    'Responsável pela prototipação do Figma e organização do progresso do projeto no Trello.',
                descricao_en:
                    'Responsible for Figma prototyping and organizing project progress in Trello.',
                foto: 'https://exemplo.com/foto-maria.jpg',
            },
            {
                nome_equipe: 'Equipe DevStone',
                nome: 'Helena Rossi',
                curso: 'Eletro-eletrônica.',
                curso_en: 'Electrical and electronic engineering.',
                funcao: 'Leitor e Analista',
                descricao:'Responsável pela leitura do livro e por repassar seus conhecimentos e informações necessárias.',
                descricao_en:'Responsible for reading the book and passing on the necessary knowledge and information.',
                foto: 'https://exemplo.com/foto-maria.jpg',
            },
            {
                nome_equipe: 'Equipe DevStone',
                nome: "Leonardo Sant'anna",
                curso: 'Mecânica.',
                curso_en: 'Mechanics.',
                funcao: 'Leitor e Analista',
                descricao:'Responsável pela leitura do livro e por repassar seus conhecimentos e informações necessárias.',
                descricao_en:'Responsible for reading the book and passing on the necessary knowledge and information.',
                foto: 'https://exemplo.com/foto-maria.jpg',
            },
            {
                nome_equipe: 'Equipe DevStone',
                nome: 'Arthur Napolli',
                curso: 'Eletro-eletrônica.',
                curso_en: 'Electrical and electronic engineering.',
                funcao: 'Leitor e Analista',
                descricao:'Responsável pela leitura do livro e por repassar seus conhecimentos e informações necessárias.',
                descricao_en:'Responsible for reading the book and passing on the necessary knowledge and information..',
                foto: 'https://exemplo.com/foto-maria.jpg',
            },
            {
                nome_equipe: 'Equipe DevStone',
                nome: 'Matheus Lima',
                curso: 'Mecânica.',
                curso_en: 'Mechanics.',
                funcao: 'Leitor e Analista',
                descricao:'Responsável pela leitura do livro e por repassar seus conhecimentos e informações necessárias.',
                descricao_en:'Responsible for reading the book and passing on the necessary knowledge and information..',
                foto: 'https://exemplo.com/foto-maria.jpg',
            },
        ],
    });

    console.log('👥 Inserindo Usuários...');

    await prisma.usuario.createMany({
        data: [
            {
                nome: 'João da Silva',
                idade: 25,
                email: 'joao@exemplo.com',
                username: 'joaosilva',
                senha: 'senha_segura_hash_aqui',
                descricao: 'Estudante ávido por literatura brasileira.',
                descricao_en: 'Avid Brazilian literature student.',
            },
            {
                nome: 'Maria Oliveira',
                idade: 22,
                email: 'maria@exemplo.com',
                username: 'mariaoliveira',
                senha: 'senha_segura_hash_aqui',
                descricao: 'Professora de literatura clássica.',
                descricao_en: 'Classical literature teacher.',
            },
            {
                nome: 'Pedro Costa',
                idade: 28,
                email: 'pedro@exemplo.com',
                username: 'pedrocosta',
                senha: 'senha_segura_hash_aqui',
                descricao: 'Apaixonado por romances modernistas.',
                descricao_en: 'Passionate about modernist novels.',

            },
        ],
    });

    console.log('ℹ️ Inserindo Sobre...');

    await prisma.sobre.createMany({
        data: [
            {
                pergunta: 'O que é o ClubeLivro?',
                pergunta_en: 'What is ClubeLivro?',
                descricao:
                    'Uma plataforma educativa focada na difusão da literatura nacional brasileira através de resumos detalhados, análises literárias e simulados interativos.',
                descricao_en:
                    'An educational platform focused on disseminating Brazilian national literature through detailed summaries, literary analysis, and interactive mock exams.',
            },
            {
                pergunta: 'Como usar os simulados?',
                pergunta_en: 'How to use the mock exams?',
                descricao:
                    'Os simulados são provas interativas que ajudam a consolidar o aprendizado. Responda as questões, receba feedback imediato e veja explicações detalhadas.',
                descricao_en:
                    'Mock exams are interactive tests that help consolidate learning. Answer questions, receive immediate feedback, and see detailed explanations.',
            },
            {
                pergunta: 'Quais são os autores abordados?',
                pergunta_en: 'What authors are covered?',
                descricao:
                    'Focamos em autores clássicos e modernistas da literatura brasileira, incluindo José Lins do Rego, Clarice Lispector, Jorge Amado, Machado de Assis e muitos outros.',
                descricao_en:
                    'We focus on classic and modernist authors of Brazilian literature, including José Lins do Rego, Clarice Lispector, Jorge Amado, Machado de Assis, and many others.',
            },
        ],
    });

    console.log('📚 Inserindo Livro 1: O Caminho das Pedras...');

    const livro1 = await prisma.livro.create({
        data: {
            titulo: 'O Caminho das Pedras',
            capa: 'https://exemplo.com/capa-caminho-das-pedras.jpg',
            autor: 'José Lins do Rego',
            detalhesAutor:
                'José Lins do Rego (1901-1957) foi um dos principais representantes do romance de 30, com forte engajamento social.',
            detalhesAutor_en:
                'José Lins do Rego (1901-1957) was one of the main representatives of the novel of the 1930s, with strong social engagement.',
            anoPublicacao: 1936,
            genero: 'Romance Regionalista',
            genero_en: 'Regionalist Novel',
            resumo: 'A obra desloca o eixo do Ciclo da Cana-de-Açúcar para o ambiente urbano, focando no surgimento do movimento operário e nas lutas políticas e ideológicas (como o comunismo) na Paraíba da década de 1930.',
            resumo_en:
                'The work shifts the axis of the Sugarcane Cycle to the urban environment, focusing on the emergence of the labor movement and the political and ideological struggles (such as communism) in Paraíba in the 1930s.',
            contexto:
                'Forte influência do período pós-Revolução de 1930, retratando a polarização política no Brasil e a organização da classe trabalhadora.',
            contexto_en:
                'Strong influence from the post-1930 Revolution period, depicting political polarization in Brazil and the organization of the working class.',
            estiloEscrita:
                'Prosa fluida e oralizada, com forte traço neorrealista e engajamento social, característica da Geração de 30.',
            estiloEscrita_en:
                'Fluid and oralized prose, with a strong neorealist trait and social engagement, characteristic of the Generation of 30.',
            enredo: 'Acompanha a trajetória de Roberto, um jovem idealista que se envolve com o movimento comunista, e a tensão entre as novas ideologias e as velhas estruturas de poder.',
            enredo_en:
                'Follows the trajectory of Roberto, a young idealist who gets involved with the communist movement, and the tension between new ideologies and old power structures.',
            verossimilhanca:
                'Alta. Retrata com precisão o clima de tensão social e a realidade política nordestina da época.',
            verossimilhanca_en:
                'High. Accurately portrays the climate of social tension and the political reality of the Northeast at the time.',
            caracteristicasLiterarias:
                'Determinismo social, crítica política, realismo cru, abandono do espaço rural do engenho em favor da cidade.',
            caracteristicasLiterarias_en:
                'Social determinism, political critique, raw realism, abandonment of the rural mill space in favor of the city.',
            conclusao:
                'Um livro fundamental para entender a transição da sociedade patriarcal dos engenhos para a modernidade conflituosa das cidades nordestinas.',
            conclusao_en:
                'A fundamental book to understand the transition from the patriarchal society of the sugar mills to the conflicted modernity of Northeastern cities.',
        },
    });

    await prisma.personagem.createMany({
        data: [
            {
                nome: 'Roberto',
                aparencia: 'Jovem de feições marcadas pelo cansaço e pela determinação.',
                aparencia_en: 'Young man with features marked by fatigue and determination.',
                descricao: 'Militante idealista que busca organizar a classe operária na cidade.',
                descricao_en:
                    'Idealistic militant who seeks to organize the working class in the city.',
                resumo: 'É o fio condutor das tensões políticas da obra, representando a nova força revolucionária.',
                resumo_en:
                    'He is the guiding thread of the political tensions in the work, representing the new revolutionary force.',
                importancia: 'Protagonista ideológico da narrativa.',
                importancia_en: 'Ideological protagonist of the narrative.',
                idLivro: livro1.id,
            },
            {
                nome: 'Dona Amélia',
                aparencia: 'Mulher madura, com ar matriarcal e autoritário.',
                aparencia_en: 'Mature woman with a matriarchal and authoritarian air.',
                descricao: 'Patroa tradicional que representa a velha ordem patriarcal.',
                descricao_en: 'Traditional boss who represents the old patriarchal order.',
                resumo: 'Conflita ideologicamente com Roberto, representando o atraso e a resistência ao novo.',
                resumo_en:
                    'Ideologically conflicts with Roberto, representing backwardness and resistance to change.',
                importancia: 'Antagonista social.',
                importancia_en: 'Social antagonist.',
                idLivro: livro1.id,
            },
        ],
    });

    await prisma.conteudos.createMany({
        data: [
            {
                idDoLivro: livro1.id,
                dicaTitulo: 'O Romance de 30 e a Política',
                dicaTitulo_en: 'The 1930s Novel and Politics',
                tipo: 'Artigo',
                tipo_en: 'Article',
                descricaoDica:
                    'Entenda como José Lins do Rego introduziu o debate sobre o comunismo e o operariado no Nordeste.',
                descricaoDica_en:
                    'Understand how José Lins do Rego introduced the debate about communism and the working class in the Northeast.',
                curtidasDica: 15,
                material: 'https://exemplo.com/artigo-caminho-pedras.pdf',
            },
            {
                idDoLivro: livro1.id,
                dicaTitulo: 'Análise dos Personagens',
                dicaTitulo_en: 'Character Analysis',
                tipo: 'Vídeo',
                tipo_en: 'Video',
                descricaoDica:
                    'Vídeo explicativo sobre os principais personagens e seus conflitos psicológicos.',
                descricaoDica_en:
                    'Explanatory video about the main characters and their psychological conflicts.',
                curtidasDica: 8,
                material: 'https://exemplo.com/video-personagens.mp4',
            },
        ],
    });

    await prisma.simulados.createMany({
        data: [
            {
                idLivro: livro1.id,
                pergunta:
                    'Diferente dos primeiros livros do "Ciclo da Cana-de-Açúcar", qual é o foco principal de "O Caminho das Pedras"?',
                pergunta_en:
                    'Unlike the first books in the "Sugarcane Cycle", what is the main focus of "The Path of Stones"?',
                respostaCorreta:
                    'O surgimento do movimento operário, do comunismo e as tensões políticas no ambiente urbano.',
                respostaCorreta_en:
                    'The emergence of the labor movement, communism, and political tensions in the urban environment.',
                respostasErradas: [
                    'A vida dos senhores de engenho e a decadência da aristocracia rural.',
                    'A fuga de retirantes da seca nordestina em direção à Floresta Amazônica.',
                    'O misticismo religioso e o cangaço como formas de salvação no sertão.',
                ],
                respostasErradas_en: [
                    'The lives of the plantation owners and the decline of the rural aristocracy.',
                    'The flight of migrants from the Northeastern drought towards the Amazon Rainforest.',
                    'Religious mysticism and banditry (cangaço) as forms of salvation in the backlands.',
                ],
                explicacao:
                    'Em "O Caminho das Pedras", José Lins do Rego abandona temporariamente os engenhos para retratar a cidade, focando nas greves e no engajamento político e operário (comunismo) da década de 1930.',
                explicacao_en:
                    'In "The Path of Stones", José Lins do Rego temporarily abandons the sugar mills to depict the city, focusing on strikes and the political and working-class engagement (communism) of the 1930s.',
            },
            {
                idLivro: livro1.id,
                pergunta:
                    'Qual é a principal característica do estilo de escrita de José Lins do Rego em "O Caminho das Pedras"?',
                pergunta_en:
                    'What is the main characteristic of José Lins do Rego\'s writing style in "The Path of Stones"?',
                respostaCorreta:
                    'Prosa fluida e oralizada com forte traço neorrealista e engajamento social.',
                respostaCorreta_en:
                    'Fluid and oralized prose with strong neorealist traits and social engagement.',
                respostasErradas: [
                    'Escrita hermética e experimental com referências psicanalíticas.',
                    'Estilo pomposo e barroco típico de romances históricos.',
                    'Linguagem coloquial desorganizada sem estrutura narrativa clara.',
                ],
                respostasErradas_en: [
                    'Hermetic and experimental writing with psychoanalytic references.',
                    'Pompous and Baroque style typical of historical novels.',
                    'Disorganized colloquial language without clear narrative structure.',
                ],
                explicacao:
                    'José Lins do Rego utiliza uma linguagem próxima da oralidade, caracterizando-se pelo realismo cru e pelo compromisso com a representação das questões sociais, marcas do romance de 30.',
                explicacao_en:
                    'José Lins do Rego uses language close to orality, characterized by raw realism and commitment to representing social issues, marks of the 1930s novel.',
            },
        ],
    });

    console.log('📚 Inserindo Livro 2: A Paixão Segundo G.H...');

    const livro2 = await prisma.livro.create({
        data: {
            titulo: 'A Paixão Segundo G.H.',
            capa: 'https://exemplo.com/capa-paixao-gh.jpg',
            autor: 'Clarice Lispector',
            detalhesAutor:
                'Clarice Lispector (1920-1977) foi uma das maiores escritoras brasileiras, conhecida por suas narrativas introspectivas e inovadoras.',
            detalhesAutor_en:
                "Clarice Lispector (1920-1977) was one of Brazil's greatest writers, known for her introspective and innovative narratives.",
            anoPublicacao: 1964,
            genero: 'Romance Experimental',
            genero_en: 'Experimental Novel',
            resumo: 'G.H., uma mulher burguesa, entra em um quarto de sua empregada e vivencia uma experiência mística e transformadora ao confrontar um barrato (barata).',
            resumo_en:
                "G.H., a bourgeois woman, enters her maid's room and experiences a mystical and transformative experience when confronting a cockroach.",
            contexto:
                'Escrito durante a modernidade líquida brasileira, o romance questiona identidades e valores burgueses.',
            contexto_en:
                'Written during Brazilian liquid modernity, the novel questions identities and bourgeois values.',
            estiloEscrita:
                'Narrativa introspectiva, fluxo de consciência, filosofia existencial entrelaçada com a prosa poética.',
            estiloEscrita_en:
                'Introspective narrative, stream of consciousness, existential philosophy intertwined with poetic prose.',
            enredo: 'A protagonista vivencia uma crise existencial ao confrontar o diferente (o barrato), levando-a a questionar sua vida e seus valores burgueses.',
            enredo_en:
                'The protagonist experiences an existential crisis when confronting the different (the cockroach), leading her to question her life and bourgeois values.',
            verossimilhanca:
                'Moderada. A obra mistura realismo psicológico com elementos místicos e filosóficos.',
            verossimilhanca_en:
                'Moderate. The work mixes psychological realism with mystical and philosophical elements.',
            caracteristicasLiterarias:
                'Exploração do inconsciente, questionamento ontológico, ruptura com a narrativa tradicional.',
            caracteristicasLiterarias_en:
                'Exploration of the unconscious, ontological questioning, rupture with traditional narrative.',
            conclusao:
                'Uma obra que transcende a literatura convencional, oferecendo uma experiência quase mística de leitura.',
            conclusao_en:
                'A work that transcends conventional literature, offering an almost mystical reading experience.',
        },
    });

    await prisma.personagem.create({
        data: {
            nome: 'G.H.',
            aparencia: 'Mulher burguesa, sofisticada, mas internamente vazia.',
            aparencia_en: 'Bourgeois woman, sophisticated, but internally empty.',
            descricao: 'Protagonista que passa por uma transformação existencial.',
            descricao_en: 'Protagonist who undergoes an existential transformation.',
            resumo: 'Sua jornada é uma descida ao interior de si mesma através do confronto com o "outro".',
            resumo_en:
                'Her journey is a descent into her inner self through confrontation with the "other".',
            importancia: 'Protagonista absoluta da narrativa.',
            importancia_en: 'Absolute protagonist of the narrative.',
            idLivro: livro2.id,
        },
    });

    await prisma.conteudos.create({
        data: {
            idDoLivro: livro2.id,
            dicaTitulo: 'Filosofia e Misticismo em Clarice',
            dicaTitulo_en: 'Philosophy and Mysticism in Clarice',
            tipo: 'Guia de Leitura',
            tipo_en: 'Reading Guide',
            descricaoDica: 'Explore os conceitos filosóficos por trás desta obra transformadora.',
            descricaoDica_en: 'Explore the philosophical concepts behind this transformative work.',
            curtidasDica: 22,
            material: 'https://exemplo.com/guia-paixao.pdf',
        },
    });

    await prisma.simulados.create({
        data: {
            idLivro: livro2.id,
            pergunta:
                'Qual é o evento desencadeador que leva G.H. à sua transformação existencial?',
            pergunta_en:
                'What is the triggering event that leads G.H. to her existential transformation?',
            respostaCorreta: 'O confronto com um barrato (barata) no quarto de sua empregada.',
            respostaCorreta_en: "The confrontation with a cockroach in her maid's room.",
            respostasErradas: [
                'Uma conversa profunda com sua psicoterapeuta.',
                'A leitura de um livro de filosofia oriental.',
                'Uma viagem inesperada ao interior do Brasil.',
            ],
            respostasErradas_en: [
                'A deep conversation with her psychotherapist.',
                'Reading an Eastern philosophy book.',
                'An unexpected trip to the interior of Brazil.',
            ],
            explicacao:
                'Em "A Paixão Segundo G.H.", a barata é o elemento catalisador que provoca em G.H. uma reflexão profunda sobre sua existência, valores e identidade burguesa.',
            explicacao_en:
                'In "The Passion According to G.H.", the cockroach is the catalytic element that provokes in G.H. a deep reflection on her existence, values, and bourgeois identity.',
        },
    });

    console.log('✅ Seed concluído com sucesso!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
