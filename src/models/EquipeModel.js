import prisma from '../lib/services/prismaClient.js';


export default class EquipeModel {
    constructor({ id, nome, nome_equipe, curso, curso_en, funcao, foto, descricao, descricao_en} = {}) {
        this.id = id;
        this.curso = curso;
        this.curso_en = curso_en;
        this.nome = nome;
        this.nome_equipe = nome_equipe;
        this.funcao = funcao;
        this.foto = foto;
        this.descricao = descricao;
        this.descricao_en = descricao_en;
    }

    async criar() {
        return prisma.equipe.create({
            data: {
                curso: this.curso,
                curso_en: this.curso_en,
                descricao: this.descricao,
                descricao_en: this.descricao_en,
                nome: this.nome,
                nome_equipe: this.nome_equipe,
                funcao: this.funcao,
                foto: this.foto,
            },
        });
    }


    async atualizar() {
        return prisma.equipe.update({
            where: { id: this.id },
            data: {
                curso: this.curso,
                curso_en: this.curso_en,
                descricao: this.descricao,
                descricao_en: this.descricao_en,
                nome: this.nome,
                nome_equipe: this.nome_equipe,
                funcao: this.funcao,
                foto: this.foto,
            },
        });
    }


    async deletar() {
        return prisma.equipe.delete({ where: { id: this.id } });
    }


    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.descricao !== undefined) {
            where.descricao = { contains: filtros.descricao, mode: 'insensitive' };
        }


        if (filtros.descricao_en !== undefined) {
            where.descricao_en = { contains: filtros.descricao_en, mode: 'insensitive' };
        }

        if (filtros.curso !== undefined) {
            where.curso = { contains: filtros.curso, mode: 'insensitive' };
        }

        if (filtros.curso_en) {
            where.curso_en = { contains: filtros.curso_en, mode: 'insensitive' };
        }


        if (filtros.nome !== undefined) {
            where.nome = { contains: filtros.nome, mode: 'insensitive' };
        }


        if (filtros.nome_equipe !== undefined) {
            where.nome_equipe = { contains: filtros.nome_equipe, mode: 'insensitive' };
        }


        if (filtros.funcao !== undefined) {
            where.funcao = { contains: filtros.funcao, mode: 'insensitive' };
        }


        if (filtros.foto !== undefined) {
            where.foto = { contains: filtros.foto, mode: 'insensitive' };
        }

        return prisma.sobre.findMany({ where });
    }


    static async buscarPorId(id) {
        const data = await prisma.equipe.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new EquipeModel(data);
    }
}
