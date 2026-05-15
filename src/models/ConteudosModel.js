import prisma from '../lib/services/prismaClient.js';

export default class ConteudosModel {
    constructor({
        id, idDoLivro, livro, dicaTitulo, dicaTitulo_en, tipo, tipo_en, descricaoDica, descricaoDica_en, curtidasDica, material,
    } = {}) {
        this.id = id;
        this.idDoLivro = idDoLivro;
        this.livro = livro;
        this.dicaTitulo = dicaTitulo;
        this.dicaTitulo_en = dicaTitulo_en;
        this.tipo = tipo;
        this.tipo_en = tipo_en;
        this.descricaoDica = descricaoDica;
        this.descricaoDica_en = descricaoDica_en;
        this.curtidasDica = curtidasDica;
        this.material = material;
    }

    async criar() {
        return prisma.conteudos.create({
            data: {
                idDoLivro: this.idDoLivro,
                livro: this.livro,
                dicaTitulo: this.dicaTitulo,
                dicaTitulo_en: this.dicaTitulo_en,
                tipo: this.tipo,
                tipo_en: this.tipo_en,
                descricaoDica: this.descricaoDica,
                descricaoDica_en: this.descricaoDica_en,
                curtidasDica: this.curtidasDica,
                material: this.material,
            },
        });
    }

    async atualizar() {
        return prisma.conteudos.update({
            where: { id: this.id },
            data: {
                idDoLivro: this.idDoLivro,
                livro: this.livro,
                dicaTitulo: this.dicaTitulo,
                dicaTitulo_en: this.dicaTitulo_en,
                tipo: this.tipo,
                tipo_en: this.tipo_en,
                descricaoDica: this.descricaoDica,
                descricaoDica_en: this.descricaoDica_en,
                curtidasDica: this.curtidasDica,
                material: this.material,
            },
        });
    }

    async deletar() {
        return prisma.conteudos.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.descricaoDica !== undefined) {
            where.descricaoDica = { contains: filtros.descricaoDica, mode: 'insensitive' };
        }

        if (filtros.descricaoDica_en !== undefined) {
            where.descricaoDica_en = { contains: filtros.descricaoDica_en, mode: 'insensitive' };
        }

        if (filtros.dicaTitulo !== undefined) {
            where.dicaTitulo = { contains: filtros.dicaTitulo, mode: 'insensitive' };
        }

        if (filtros.dicaTitulo_en) {
            where.dicaTitulo_en = { contains: filtros.dicaTitulo_en, mode: 'insensitive' };
        }

        if (filtros.tipo !== undefined) {
            where.tipo = { contains: filtros.tipo, mode: 'insensitive' };
        }

        if (filtros.tipo_en !== undefined) {
            where.tipo_en = { contains: filtros.tipo_en, mode: 'insensitive' };
        }

        if (filtros.material !== undefined) {
            where.material = { contains: filtros.material, mode: 'insensitive' };
        }

        if (filtros.curtidasDica !== undefined) {
            where.curtidasDica = filtros.curtidasDica
        }

        if (filtros.livro !== undefined) {
            where.livro = { contains: filtros.livro, mode: 'insensitive' };
        }
        if (filtros.idDoLivro !== undefined) {
            where.idDoLivro = filtros.idDoLivro
        }

        return prisma.conteudos.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.conteudos.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new ConteudosModel(data);
    }
}
