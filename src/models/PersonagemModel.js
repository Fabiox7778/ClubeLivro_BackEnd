import prisma from '../lib/services/prismaClient.js';

export default class PersonagemModel {
    constructor({ id = null, nome, aparencia, descricao, resumo, importancia } = {}) {
        this.id = id;
        this.nome = nome;
        this.aparencia = aparencia;
        this.descricao = descricao;
        this.resumo = resumo
        this.importancia = importancia
    }

    async criar() {
        return prisma.exemplo.create({
            data: {
                nome: this.nome,
                aparencia: this.aparencia,
                descricao: this.descricao,
                resumo: this.resumo,
                importancia: this.importancia
            },
        });
    }

    async atualizar() {
        return prisma.personagem.update({
            where: { id: this.id },
            data: {
                nome: this.nome, aparencia: this.aparencia, descricao: this.descricao, resumo: this.resumo, importancia: this.importancia,
            },
        });
    }

    async deletar() {
        return prisma.personagem.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) {
            where.nome = { contains: filtros.nome, mode: 'insensitive' };
        }

        if (filtros.aparencia !== undefined) {
            where.aparencia = { contains: filtros.aparencia, mode: 'insensitive' };
        }

        if (filtros.descricao !== undefined) {
            where.descricao = { contains: filtros.descricao, mode: 'insensitive' };
        }

        if (filtros.resumo !== undefined) {
            where.resumo = { contains: filtros.resumo, mode: 'insensitive' };
        }
        if (filtros.importancia !== undefined) {
            where.importancia = { contains: filtros.importancia, mode: 'insensitive' };
        }

        return prisma.personagem.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.personagem.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new PersonagemModel(data);
    }
}
