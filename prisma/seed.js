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

    // Remove os registros respeitando a hierarquia das chaves estrangeiras
    await prisma.simulados.deleteMany();
    await prisma.conteudos.deleteMany();
    await prisma.livro.deleteMany();
    await prisma.usuario.deleteMany();
    await prisma.equipe.deleteMany();

    console.log('📦 Inserindo Equipe e Usuários...');

    await prisma.equipe.create({
        data: {
            nome: 'Desenvolvedor Master',
            curso: 'Engenharia de Software',
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
            senha: 'senha_segura_hash_aqui', // Num app real, use bcrypt/argon2
            descricao: 'Estudante ávido por literatura.',
            descricao_en: 'Avid literature student.',
            foto: 'https://exemplo.com/foto-joao.jpg',
        },
    });

    console.log('📚 Inserindo Livros, Conteúdos e Simulados...');

    // Criamos o livro usando `create` em vez de `createMany` para podermos recuperar o seu ID e criar as relações
    const livroCriado = await prisma.livro.create({
        data: {
            titulo: 'Dom Casmurro',
            capa: 'https://exemplo.com/capa-dom-casmurro.jpg',
            autor: 'Machado de Assis',
            anoPublicacao: 1899,
            genero_pt: 'Romance Realista',
            genero_en: 'Realist Novel',
            resumo_pt: 'A história de Bento Santiago e sua desconfiança sobre a traição de Capitu.',
            resumo_en: "The story of Bento Santiago and his suspicion about Capitu's betrayal.",
            personagens: ['Bento Santiago', 'Capitu', 'Escobar', 'Ezequiel'],
            contextoHistorico_pt: 'Brasil Império/República, transição social.',
            contextoHistorico_en: 'Brazilian Empire/Republic, social transition.',
            analise_pt: 'Uma obra-prima sobre ciúme e narrador não-confiável.',
            analise_en: 'A masterpiece about jealousy and the unreliable narrator.',
        },
    });

    await prisma.conteudos.create({
        data: {
            idDoLivro: livroCriado.id,
            dicaTitulo: 'O Narrador Não-Confiável',
            dicaTitulo_en: 'The Unreliable Narrator',
            tipo: 'Artigo',
            tipo_en: 'Article',
            descricaoDica: 'Entenda por que não podemos confiar totalmente na visão de Bentinho.',
            descricaoDica_en: "Understand why we cannot fully trust Bentinho's perspective.",
            material: 'https://exemplo.com/artigo-bentinho.pdf',
        },
    });

    await prisma.simulados.create({
        data: {
            idLivro: livroCriado.id,
            pergunta: 'Quem é o melhor amigo de Bentinho na juventude?',
            pergunta_en: "Who is Bentinho's best friend in his youth?",
            resopostaErrada: 'José Dias',
            resopostaErrada_en: 'José Dias',
            respostaCorreta: 'Escobar',
            respostaCorreta_en: 'Escobar',
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
