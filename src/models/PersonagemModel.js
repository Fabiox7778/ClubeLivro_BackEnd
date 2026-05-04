import prisma from '../lib/services/prismaClient.js';

//Importa do banco os atributos obrigatórios para a manipulação dos personagens.
export default class PersonagemModel {
    constructor({
        id = null,
        nome,
        aparencia,
        descricao,
        resumo,
        importancia,
        descricao_en,
        resumo_en,
        aparencia_en,
        importancia_en,
    } = {}) {
        this.id = id;
        this.nome = nome;
        this.aparencia = aparencia;
        this.descricao = descricao;
        this.resumo = resumo;
        this.importancia = importancia;
        this.aparencia_en = aparencia_en;
        this.descricao_en = descricao_en;
        this.resumo_en = resumo_en;
        this.importancia_en = importancia_en;
    }

    //Cria um novo personagem usando os atributos obrigatórios necessários.
    async criar() {
        return prisma.personagem.create({
            data: {
                nome: this.nome,
                aparencia: this.aparencia,
                descricao: this.descricao,
                resumo: this.resumo,
                importancia: this.importancia,
                aparencia_en: this.aparencia_en,
                descricao_en: this.descricao_en,
                resumo_en: this.resumo_en,
                importancia_en: this.importancia_en,
            },
        });
    }

    //Atualiza um personagem específico por id.
    async atualizar() {
        return prisma.personagem.update({
            where: { id: this.id },
            data: {
                nome: this.nome,
                aparencia: this.aparencia,
                descricao: this.descricao,
                resumo: this.resumo,
                importancia: this.importancia,
                aparencia_en: this.aparencia_en,
                descricao_en: this.descricao_en,
                resumo_en: this.resumo_en,
                importancia_en: this.importancia_en,
            },
        });
    }

    //Deleta um personagem específico por id.
    async deletar() {
        return prisma.personagem.delete({ where: { id: this.id } });
    }

    //Busca todos os personagens existentes.
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

        if (filtros.aparencia_en !== undefined) {
            where.aparencia_en = { contains: filtros.aparencia_en, mode: 'insensitive' };
        }

        if (filtros.descricao_en !== undefined) {
            where.descricao_en = { contains: filtros.descricao_en, mode: 'insensitive' };
        }
        if (filtros.resumo_en !== undefined) {
            where.resumo_en = { contains: filtros.resumo_en, mode: 'insensitive' };
        }
        if (filtros.importancia_en !== undefined) {
            where.importancia_en = { contains: filtros.importancia_en, mode: 'insensitive' };
        }

        return prisma.personagem.findMany({ where });
    }

    //Busca um personagem específico por id.
    static async buscarPorId(id) {
        const data = await prisma.personagem.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new PersonagemModel(data);
    }
}
