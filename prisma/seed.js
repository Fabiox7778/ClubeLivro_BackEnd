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
    await prisma.livro.deleteMany();
    await prisma.personagem.deleteMany();
    await prisma.usuario.deleteMany();
    await prisma.equipe.deleteMany();
    await prisma.sobre.deleteMany();

    console.log('📦 Inserindo Equipe, Usuários e Sobre...');

    await prisma.equipe.create({
        data: {
            nome_equipe: 'Equipe DevStone',
            nome: 'Desenvolvedor Master',
            curso: 'Engenharia de Software',
            curso_en: 'Software Engineering',
            funcao: 'Líder Técnico',
            descricao: 'Responsável pela arquitetura do projeto DevStone.',
            descricao_en: 'Responsible for the DevStone project architecture.',
            foto: 'https://exemplo.com/foto-dev.jpg',
        },
    });

    await prisma.usuario.create({
        data: {
            nome: 'João da Silva',
            idade: 25,
            email: 'joao@exemplo.com',
            username: 'joaosilva',
            senha: 'senha_segura_hash_aqui',
            descricao: 'Estudante ávido por literatura brasileira.',
            descricao_en: 'Avid Brazilian literature student.',
            foto: 'https://exemplo.com/foto-joao.jpg',
        },
    });

    await prisma.sobre.create({
        data: {
            pergunta: 'O que é o projeto DevStone?',
            pergunta_en: 'What is the DevStone project?',
            descricao:
                'Um aplicativo educativo focado na difusão da literatura nacional através de resumos e simulados interativos.',
            descricao_en:
                'An educational app focused on disseminating national literature through summaries and interactive mock exams.',
        },
    });

    console.log('📚 Inserindo Livro, Conteúdos, Personagens e Simulados...');

    const livroCriado = await prisma.livro.create({
        data: {
            titulo: 'O Caminho das Pedras',
            capa: 'https://exemplo.com/capa-caminho-das-pedras.jpg',
            autor: 'José Lins do Rego',
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
            personagens: ['Roberto', 'João Lourenço', 'Noêmia', 'Capitão Antônio Silvino'],
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

    await prisma.personagem.create({
        data: {
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
        },
    });

    await prisma.conteudos.create({
        data: {
            idDoLivro: livroCriado.id,
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
    });

    await prisma.simulados.create({
        data: {
            idLivro: livroCriado.id,
            pergunta:
                'Diferente dos primeiros livros do "Ciclo da Cana-de-Açúcar", qual é o foco principal de "O Caminho das Pedras"?',
            pergunta_en:
                'Unlike the first books in the "Sugarcane Cycle", what is the main focus of "The Path of Stones"?',
            resopostaErrada: 'A vida dos senhores de engenho e a decadência da aristocracia rural.',
            resopostaErrada_en:
                'The lives of the plantation owners and the decline of the rural aristocracy.',
            respostaCorreta:
                'O surgimento do movimento operário, do comunismo e as tensões políticas no ambiente urbano.',
            respostaCorreta_en:
                'The emergence of the labor movement, communism, and political tensions in the urban environment.',
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
