import prisma from '../lib/services/prismaClient.js';

export default class SimuladosModel {
    constructor({
        id,
        idLivro,
        livro,
        pergunta,
        pergunta_en,
        respostaCorreta,
        respostaCorreta_en,
        respostasErradas,
        respostasErradas_en,
        explicacao,
        explicacao_en,
        geradoPorIA,
    } = {}) {
        this.id = id;
        this.idLivro = idLivro;
        this.livro = livro;
        this.pergunta = pergunta;
        this.pergunta_en = pergunta_en;
        this.respostaCorreta = respostaCorreta;
        this.respostaCorreta_en = respostaCorreta_en;
        this.respostasErradas = respostasErradas;
        this.respostasErradas_en = respostasErradas_en;
        this.explicacao = explicacao;
        this.explicacao_en = explicacao_en;
        this.geradoPorIA = geradoPorIA;
    }

    async criar() {
        return prisma.simulados.create({
            data: {
                idLivro: this.idLivro !== undefined ? String(this.idLivro) : null,
                pergunta: this.pergunta,
                pergunta_en: this.pergunta_en,
                respostaCorreta: this.respostaCorreta,
                respostaCorreta_en: this.respostaCorreta_en,
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
                idLivro: this.idLivro !== undefined ? String(this.idLivro) : undefined,
                pergunta: this.pergunta,
                pergunta_en: this.pergunta_en,
                respostaCorreta: this.respostaCorreta,
                respostaCorreta_en: this.respostaCorreta_en,
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
            where.livro = {
                titulo: { contains: filtros.livro, mode: 'insensitive' },
            };
        }

        if (filtros.idLivro !== undefined) {
            where.idLivro = String(filtros.idLivro);
        }

        if (filtros.geradoPorIA !== undefined) {
            where.geradoPorIA = filtros.geradoPorIA === 'true' || filtros.geradoPorIA === true;
        }

        if (filtros.respostaCorreta !== undefined) {
            where.respostaCorreta = { contains: filtros.respostaCorreta, mode: 'insensitive' };
        }

        if (filtros.respostaCorreta_en !== undefined) {
            where.respostaCorreta_en = {
                contains: filtros.respostaCorreta_en,
                mode: 'insensitive',
            };
        }

        if (filtros.respostasErradas !== undefined) {
            where.respostasErradas = { has: filtros.respostasErradas };
        }

        if (filtros.respostasErradas_en !== undefined) {
            where.respostasErradas_en = { has: filtros.respostasErradas_en };
        }

        if (filtros.explicacao !== undefined) {
            where.explicacao = { contains: filtros.explicacao, mode: 'insensitive' };
        }

        if (filtros.explicacao_en !== undefined) {
            where.explicacao_en = { contains: filtros.explicacao_en, mode: 'insensitive' };
        }

        return prisma.simulados.findMany({ where });
    }

    static async criarMuitos(questoes = []) {
        const registros = [];

        for (const questao of questoes) {
            const registro = await prisma.simulados.create({
                data: {
                    ...questao,
                    idLivro: questao.idLivro !== undefined ? String(questao.idLivro) : null,
                },
            });
            registros.push(registro);
        }

        return registros;
    }

    static async buscarPorLivro(idLivro, filtros = {}) {
        const where = {
            idLivro: String(idLivro),
        };

        if (filtros.geradoPorIA !== undefined) {
            where.geradoPorIA = filtros.geradoPorIA;
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
