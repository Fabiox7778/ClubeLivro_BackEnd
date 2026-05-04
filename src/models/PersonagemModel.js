import prisma from '../lib/services/prismaClient.js';

//Importa do banco os atributos obrigatórios para a manipulação dos personagens.
export default class PersonagemModel {
    constructor({ id = null, nome, aparencia, descricao, resumo, importancia } = {}) {
        this.id = id;
        this.nome = nome;
        this.aparencia = aparencia;
        this.descricao = descricao;
        this.resumo = resumo
        this.importancia = importancia
    }

    //Cria um novo personagem usando os atributos obrigatórios necessários.
    async criar() {
        return prisma.personagem.create({
            data: {
                nome: this.nome,
                aparencia: this.aparencia,
                descricao: this.descricao,
                resumo: this.resumo,
                importancia: this.importancia
            },
        });
    }

    //Atualiza um personagem específico por id.
    async atualizar() {
        return prisma.personagem.update({
            where: { id: this.id },
            data: {
                nome: this.nome, aparencia: this.aparencia, descricao: this.descricao, resumo: this.resumo, importancia: this.importancia,
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
