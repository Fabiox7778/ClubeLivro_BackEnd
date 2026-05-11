import prisma from '../lib/services/prismaClient.js';


export default class LivroModel {
    constructor({ id, titulo, capa, autor, detalhesAutor, detalhesAutor_en, anoPublicacao, genero, genero_en, resumo, resumo_en, contexto, contexto_en, estiloEscrita, estiloEscrita_en, enredo, enredo_en, verossimilhanca, verossimilhanca_en, caracteristicasLiterarias, caracteristicasLiterarias_en, conclusao, conclusao_en} = {}) {
        this.id = id;
        this.titulo = titulo;
        this.capa = capa;
        this.autor = autor;
        this.detalhesAutor = detalhesAutor;
        this.detalhesAutor_en = detalhesAutor_en;
        this.anoPublicacao = anoPublicacao;
        this.genero = genero;
        this.genero_en = genero_en;
        this.resumo = resumo;
        this.resumo_en = resumo_en;
        this.contexto = contexto;
        this.contexto_en = contexto_en;
        this.estiloEscrita = estiloEscrita;
        this.estiloEscrita_en = estiloEscrita_en;
        this.enredo = enredo;
        this.enredo_en = enredo_en;
        this.verossimilhanca = verossimilhanca;
        this.verossimilhanca_en = verossimilhanca_en;
        this.caracteristicasLiterarias = caracteristicasLiterarias;
        this.caracteristicasLiterarias_en = caracteristicasLiterarias_en;
        this.conclusao = conclusao;
        this.conclusao_en = conclusao_en;
    }


    async criar() {
        return prisma.livro.create({
            data: {
                titulo: this.titulo,
                capa: this.capa,
                autor: this.autor,
                detalhesAutor: this.detalhesAutor,
                detalhesAutor_en: this.detalhesAutor_en,
                anoPublicacao: this.anoPublicacao,
                genero: this.genero,
                genero_en: this.genero_en,
                resumo: this.resumo,
                resumo_en: this.resumo_en,
                contexto: this.contexto,
                contexto_en: this.contexto_en,
                estiloEscrita: this.estiloEscrita,
                estiloEscrita_en: this.estiloEscrita_en,
                enredo: this.enredo,
                enredo_en: this.enredo_en,
                verossimilhanca: this.verossimilhanca,
                verossimilhanca_en: this.verossimilhanca_en,
                caracteristicasLiterarias: this.caracteristicasLiterarias,
                caracteristicasLiterarias_en: this.caracteristicasLiterarias_en,
                conclusao: this.conclusao,
                conclusao_en: this.conclusao_en,
            },
        });
    }

    async atualizar() {
        return prisma.livro.update({
            where: { id: this.id },
            data: {
                capa: this.capa,
                titulo: this.titulo,
                autor: this.autor,
                detalhesAutor: this.detalhesAutor,
                detalhesAutor_en: this.detalhesAutor_en,
                anoPublicacao: this.anoPublicacao,
                genero: this.genero,
                genero_en: this.genero_en,
                resumo: this.resumo,
                resumo_en: this.resumo_en,
                contexto: this.contexto,
                contexto_en: this.contexto_en,
                estiloEscrita: this.estiloEscrita,
                estiloEscrita_en: this.estiloEscrita_en,
                enredo: this.enredo,
                enredo_en: this.enredo_en,
                verossimilhanca: this.verossimilhanca,
                verossimilhanca_en: this.verossimilhanca_en,
                caracteristicasLiterarias: this.caracteristicasLiterarias,
                caracteristicasLiterarias_en: this.caracteristicasLiterarias_en,
                conclusao: this.conclusao,
                conclusao_en: this.conclusao_en,
            },
        });
    }

    async deletar() {
        return prisma.livro.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.capa !== undefined) {
            where.capa = { contains: filtros.capa, mode: 'insensitive' };
        }

        if (filtros.titulo !== undefined) {
            where.titulo = { contains: filtros.titulo, mode: 'insensitive' };
        }

        if (filtros.autor) {
            where.autor = { contains: filtros.autor, mode: 'insensitive' };
        }

        if (filtros.detalhesAutor !== undefined) {
            where.detalhesAutor = { contains: filtros.detalhesAutor, mode: 'insensitive' };
        }

        if (filtros.detalhesAutor_en !== undefined) {
            where.detalhesAutor_en = { contains: filtros.detalhesAutor_en, mode: 'insensitive' };
        }

        if (filtros.anoPublicacao !== undefined) {
            where.anoPublicacao = filtros.anoPublicacao;
        }

        if (filtros.genero !== undefined) {
            where.genero = { contains: filtros.genero, mode: 'insensitive' };
        }

        if (filtros.genero_en !== undefined) {
            where.genero_en = { contains: filtros.genero_en, mode: 'insensitive' };
        }

        if (filtros.resumo !== undefined) {
            where.resumo = { contains: filtros.resumo, mode: 'insensitive' };
        }

        if (filtros.resumo_en !== undefined) {
            where.resumo_en = { contains: filtros.resumo_en, mode: 'insensitive' };
        }

        if (filtros.contexto !== undefined) {
            where.contexto = { contains: filtros.contexto, mode: 'insensitive' };
        }

        if (filtros.contexto_en !== undefined) {
            where.contexto_en = { contains: filtros.contexto_en, mode: 'insensitive' };
        }

        if (filtros.estiloEscrita !== undefined) {
            where.estiloEscrita = { contains: filtros.estiloEscrita, mode: 'insensitive' };
        }

        if (filtros.estiloEscrita_en !== undefined) {
            where.estiloEscrita_en = { contains: filtros.estiloEscrita_en, mode: 'insensitive' };
        }

        if (filtros.enredo !== undefined) {
            where.enredo = { contains: filtros.enredo, mode: 'insensitive' };
        }

        if (filtros.enredo_en !== undefined) {
            where.enredo_en = { contains: filtros.enredo_en, mode: 'insensitive' };
        }

        if (filtros.verossimilhanca !== undefined) {
            where.verossimilhanca = { contains: filtros.verossimilhanca, mode: 'insensitive' };
        }

        if (filtros.verossimilhanca_en !== undefined) {
            where.verossimilhanca_en = { contains: filtros.verossimilhanca_en, mode: 'insensitive' };
        }

        if (filtros.caracteristicasLiterarias !== undefined) {
            where.caracteristicasLiterarias = { contains: filtros.caracteristicasLiterarias, mode: 'insensitive' };
        }

        if (filtros.caracteristicasLiterarias_en !== undefined) {
            where.caracteristicasLiterarias_en = { contains: filtros.caracteristicasLiterarias_en, mode: 'insensitive' };
        }

        if (filtros.conclusao !== undefined) {
            where.conclusao = { contains: filtros.conclusao, mode: 'insensitive' };
        }

        if (filtros.conclusao_en !== undefined) {
            where.conclusao_en = { contains: filtros.conclusao_en, mode: 'insensitive' };
        }

        return prisma.livro.findMany({ where });
    }


    static async buscarPorId(id) {
        const data = await prisma.livro.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new LivroModel
    (data);
    }
}
