import prisma from '../lib/services/prismaClient.js';

//Importa do banco os atributos obrigatórios para a manipulação dos personagens.
export default class PersonagemModel {
    constructor({ pergunta, pergunta_en, descricao, descricao_en} = {}) {
        this.pergunta = pergunta;
        this.pergunta_en = pergunta_en;
        this.descricao_en = descricao_en;
        this.descricao = descricao;
    }

    //Cria um novo item usando os atributos obrigatórios necessários.
    async criar() {
        return prisma.personagem.create({
            data: {
                pergunta_en: this.pergunta_en,
                descricao_en: this.descricao_en,
                descricao: this.descricao,
                pergunta_en: this.pergunta_en,
            },
        });
    }

    //Atualiza um item específico por id.
    async atualizar() {
        return prisma.personagem.update({
            where: { pergunta: this.pergunta },
            data: {
                pergunta_en: this.pergunta_en,
                descricao_en: this.descricao_en,
                descricao: this.descricao,
                pergunta: this.pergunta,
            },
        });
    }

    //Deleta um item específico por pergunta.
    async deletar() {
        return prisma.personagem.delete(
            { where: { pergunta: this.pergunta } },
            { where: { pergunta_en: this.pergunta_en } },
            { where: { descricao: this.descricao } },
            { where: { descricao_en: this.descricao_en } },
        );
    }

    //Busca todos os itens existentes.
    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.pergunta_en) {
            where.pergunta_en = { contains: filtros.pergunta_en, mode: 'insensitive' };
        }

        if (filtros.descricao_en !== undefined) {
            where.descricao_en = { contains: filtros.descricao_en, mode: 'insensitive' };
        }

        if (filtros.descricao !== undefined) {
            where.descricao = { contains: filtros.descricao, mode: 'insensitive' };
        }

        if (filtros.pergunta !== undefined) {
            where.pergunta = { contains: filtros.pergunta, mode: 'insensitive' };
        }

        return prisma.personagem.findMany({ where });
    }

    //Busca algo específico por id.
    static async buscarPorId(pergunta) {
        const data = await prisma.personagem.findUnique(
            { where: { pergunta } },
            { where: { pergunta_en } },
            { where: { descricao } },
            { where: { descricao_en } },
        );
        if (!data) {
            return null;
        }
        return new PersonagemModel(data);
    }
}
