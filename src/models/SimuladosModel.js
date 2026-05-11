import prisma from '../lib/services/prismaClient.js';

export default class SimuladosModel {
    constructor({id, idlivro, livro, pergunta, pergunta_en, respostasCorretas, respostasCorretas_en, respostasErradas, respostasErradas_en, explicacao, explicacao_en, geradoPorIA} = {}) {
        this.id = id;
        this.idlivro = idlivro;
        this.livro = livro;
        this.pergunta = pergunta;
        this.pergunta_en = pergunta_en;
        this.respostasCorretas = respostasCorretas;
        this.respostasCorretas_en = respostasCorretas_en;
        this.respostasErradas = respostasErradas;
        this.respostasErradas_en = respostasErradas_en;
        this.explicacao = explicacao;
        this.explicacao_en = explicacao_en;
        this.geradoPorIA = geradoPorIA;
    }

    async criar() {
        return prisma.simulados.create({
            data: {
                idlivro: this.idlivro,
                livro: this.livro,
                pergunta: this.pergunta,
                pergunta_en: this.pergunta_en,
                respostasCorretas: this.respostasCorretas,
                respostasCorretas_en: this.respostasCorretas_en,
                respostasErradas: this.respostasErradas,
                respostasErradas_en: this.respostasErradas_en,
                explicacao: this.explicacao,
                explicacao_en: this.explicacao_en,
                geradoPorIA: this.geradoPorIA,
            },
        });
    }

    async atualizar() {
        return prisma.simulados.update({
            where: { id: this.id },
            data: {
                idlivro: this.idlivro,
                livro: this.livro,
                pergunta: this.pergunta,
                pergunta_en: this.pergunta_en,
                respostasCorretas: this.respostasCorretas,
                respostasCorretas_en: this.respostasCorretas_en,
                respostasErradas: this.respostasErradas,
                respostasErradas_en: this.respostasErradas_en,
                explicacao: this.explicacao,
                explicacao_en: this.explicacao_en,
                geradoPorIA: this.geradoPorIA,
            },
        });
    }

    async criar() {
        return prisma.simulados.create({
            data: {
                idlivro: this.idlivro,
                livro: this.livro,
                pergunta: this.pergunta,
                pergunta_en: this.pergunta_en,
                respostasCorretas: this.respostasCorretas,
                respostasCorretas_en: this.respostasCorretas_en,
                respostasErradas: this.respostasErradas,
                respostasErradas_en: this.respostasErradas_en,
                explicacao: this.explicacao,
                explicacao_en: this.explicacao_en,
                geradoPorIA: this.geradoPorIA,
            },
        });
    }

    async atualizar() {
        return prisma.simulados.update({
            where: { id: this.id },
            data: {
                idlivro: this.idlivro,
                livro: this.livro,
                pergunta: this.pergunta,
                pergunta_en: this.pergunta_en,
                respostasCorretas: this.respostasCorretas,
                respostasCorretas_en: this.respostasCorretas_en,
                respostasErradas: this.respostasErradas,
                respostasErradas_en: this.respostasErradas_en,
                explicacao: this.explicacao,
                explicacao_en: this.explicacao_en,
                geradoPorIA: this.geradoPorIA,
            },
        });
    }

    async deletar() {
        return prisma.simulados.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.pergunta !== undefined) {
            where.pergunta = { contains: filtros.pergunta, mode: 'insensitive' };
        }

        if (filtros.pergunta_en !== undefined) {
            where.pergunta_en = { contains: filtros.pergunta_en, mode: 'insensitive' };
        }

        if (filtros.livro !== undefined) {
            where.livro = { contains: filtros.livro, mode: 'insensitive' };
        }

        if (filtros.idlivro !== undefined) {
            where.idlivro = filtros.idlivro;
        }

        if (filtros.geradoPorIA !== undefined) {
            where.geradoPorIA = filtros.geradoPorIA;
        }

        if (filtros.respostasCorretas !== undefined) {
            where.respostasCorretas = { contains: filtros.respostasCorretas, mode: 'insensitive' };
        }

        if (filtros.respostasCorretas_en !== undefined) {
            where.respostasCorretas_en = { contains: filtros.respostasCorretas_en, mode: 'insensitive' };
        }

        if (filtros.respostasErradas !== undefined) {
            where.respostasErradas = { contains: filtros.respostasErradas, mode: 'insensitive' };
        }

        if (filtros.respostasErradas_en !== undefined) {
            where.respostasErradas_en = { contains: filtros.respostasErradas_en, mode: 'insensitive' };
        }

        if (filtros.explicacao !== undefined) {
            where.explicacao = { contains: filtros.explicacao, mode: 'insensitive' };
        }

        if (filtros.explicacao_en !== undefined) {
            where.explicacao_en = { contains: filtros.explicacao_en, mode: 'insensitive' };
        }

        return prisma.simulados.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.simulados.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new SimuladosModel(data);
    }
}
