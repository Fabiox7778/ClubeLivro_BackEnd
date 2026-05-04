import prisma from '../lib/services/prismaClient.js';

//Importa do banco os atributos obrigatórios para a manipulação dos personagens.
export default class SobreModel {
    constructor({ id, pergunta, pergunta_en, descricao, descricao_en } = {}) {
        this.id = id;
        this.pergunta = pergunta;
        this.descricao = descricao;
        this.pergunta_en = pergunta_en;
        this.descricao_en = descricao_en;
    }

    //Cria um novo item usando os atributos obrigatórios necessários.
    async criar() {
        return prisma.sobre.create({
            data: {
                pergunta: this.pergunta,
                descricao: this.descricao,
                pergunta_en: this.pergunta_en,
                descricao_en: this.descricao_en,
            },
        });
    }

    //Atualiza um item específico por id.
    async atualizar() {
        return prisma.sobre.update({
            where: { id: this.id },
            data: {
                descricao: this.descricao,
                pergunta: this.pergunta,
                pergunta_en: this.pergunta_en,
                descricao_en: this.descricao_en,
            },
        });
    }

    //Deleta um item específico por pergunta.
    async deletar() {
        return prisma.sobre.delete({ where: { id: this.id } });
    }

    //Busca todos os itens existentes.
    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.descricao !== undefined) {
            where.descricao = { contains: filtros.descricao, mode: 'insensitive' };
        }

        if (filtros.pergunta !== undefined) {
            where.pergunta = { contains: filtros.pergunta, mode: 'insensitive' };
        }

        if (filtros.pergunta_en) {
            where.pergunta_en = { contains: filtros.pergunta_en, mode: 'insensitive' };
        }

        if (filtros.descricao_en !== undefined) {
            where.descricao_en = { contains: filtros.descricao_en, mode: 'insensitive' };
        }

        return prisma.sobre.findMany({ where });
    }

    //Busca algo específico por id.
    static async buscarPorId(id) {
        const data = await prisma.sobre.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new SobreModel(data);
    }
}
