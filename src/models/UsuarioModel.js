import prisma from '../lib/services/prismaClient.js';

export default class UsuarioModel {
    constructor({ id, nome, idade, email, username, senha, descricao, descricao_en, foto } = {}) {
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.email = email;
        this.username = username;
        this.senha = senha;
        this.descricao = descricao;
        this.descricao_en = descricao_en;
        this.foto = foto;
    }
    async criar() {
        return prisma.usuario.create({
            data: {
                nome: this.nome,
                idade: this.idade,
                email: this.email,
                username: this.username,
                senha: this.senha,
                descricao: this.descricao,
                descricao_en: this.descricao_en,
                foto: this.foto,
            },
        });
    }
    async atualizar() {
        return prisma.usuario.update({
            where: { id: this.id },
            data: {
                nome: this.nome,
                idade: this.idade,
                email: this.email,
                username: this.username,
                senha: this.senha,
                descricao: this.descricao,
                descricao_en: this.descricao_en,
                foto: this.foto,
            },
        });
    }
    async deletar() {
        return prisma.usuario.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome !== undefined) {
            where.nome = { contains: filtros.nome, mode: 'insensitive' };
        }

        if (filtros.idade !== undefined) {
            const idadeNum = Number(filtros.idade);
            if (!Number.isNaN(idadeNum)) {
                where.idade = idadeNum;
            }
        }

        if (filtros.email) {
            where.email = { contains: filtros.email, mode: 'insensitive' };
        }

        if (filtros.username !== undefined) {
            where.username = { contains: filtros.username, mode: 'insensitive' };
        }

        if (filtros.senha !== undefined) {
            where.senha = { contains: filtros.senha, mode: 'insensitive' };
        }

        if (filtros.descricao !== undefined) {
            where.descricao = { contains: filtros.descricao, mode: 'insensitive' };
        }

        if (filtros.descricao_en !== undefined) {
            where.descricao_en = { contains: filtros.descricao_en, mode: 'insensitive' };
        }

        return prisma.usuario.findMany({ where });
    }
    static async buscarPorId(id) {
        const data = await prisma.usuario.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new UsuarioModel(data);
    }
}
