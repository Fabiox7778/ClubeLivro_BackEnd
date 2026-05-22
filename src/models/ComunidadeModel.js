import prisma from '../lib/services/prismaClient.js';

export default class ComunidadeModel {
    constructor({
        id,
        titulo,
        conteudo,
        autor,
        categoria,
        curtidas,
        idUsuario,
        criadoEm,
        atualizadoEm,
    } = {}) {
        this.id = id;
        this.titulo = titulo;
        this.conteudo = conteudo;
        this.autor = autor;
        this.categoria = categoria;
        this.curtidas = curtidas;
        this.idUsuario = idUsuario;
        this.criadoEm = criadoEm;
        this.atualizadoEm = atualizadoEm;
    }

    async criar() {
        return prisma.comunidade.create({
            data: {
                titulo: this.titulo,
                conteudo: this.conteudo,
                autor: this.autor,
                categoria: this.categoria,
                curtidas: this.curtidas,
                idUsuario: this.idUsuario,
            },
        });
    }

    async atualizar() {
        return prisma.comunidade.update({
            where: { id: this.id },
            data: {
                titulo: this.titulo,
                conteudo: this.conteudo,
                autor: this.autor,
                categoria: this.categoria,
                curtidas: this.curtidas,
                idUsuario: this.idUsuario,
            },
        });
    }

    async deletar() {
        return prisma.comunidade.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.titulo !== undefined) {
            where.titulo = { contains: filtros.titulo, mode: 'insensitive' };
        }

        if (filtros.conteudo !== undefined) {
            where.conteudo = { contains: filtros.conteudo, mode: 'insensitive' };
        }

        if (filtros.autor !== undefined) {
            where.autor = { contains: filtros.autor, mode: 'insensitive' };
        }

        if (filtros.categoria !== undefined) {
            where.categoria = { contains: filtros.categoria, mode: 'insensitive' };
        }

        if (filtros.curtidas !== undefined) {
            const curtidasNum = Number(filtros.curtidas);
            if (!Number.isNaN(curtidasNum)) {
                where.curtidas = curtidasNum;
            }
        }

        if (filtros.idUsuario !== undefined) {
            const idUsuarioNum = Number(filtros.idUsuario);
            if (!Number.isNaN(idUsuarioNum)) {
                where.idUsuario = idUsuarioNum;
            }
        }

        return prisma.comunidade.findMany({
            where,
            orderBy: { criadoEm: 'desc' },
        });
    }

    static async buscarPorId(id) {
        const data = await prisma.comunidade.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new ComunidadeModel(data);
    }
}
