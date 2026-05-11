import { json } from 'express';
import LivroModel from '../models/LivroModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const {
            titulo,
            capa,
            autor,
            detalhesAutor,
            detalhesAutor_en,
            anoPublicacao,
            genero,
            genero_en,
            resumo,
            resumo_en,
            contexto,
            contexto_en,
            estiloEscrita,
            estiloEscrita_en,
            enredo,
            enredo_en,
            verossimilhanca,
            verossimilhanca_en,
            caracteristicasLiterarias,
            caracteristicasLiterarias_en,
            conclusao,
            conclusao_en,
        } = req.body;

        if (!titulo || !genero || !autor || !resumo) {
            return res.status(400).json({
                error: 'Os campos "titulo", "genero", "autor" e "resumo" são obrigatórios!',
            });
        }

        const livro = new LivroModel({
            titulo,
            capa,
            autor,
            detalhesAutor,
            detalhesAutor_en,
            anoPublicacao,
            genero,
            genero_en,
            resumo,
            resumo_en,
            contexto,
            contexto_en,
            estiloEscrita,
            estiloEscrita_en,
            enredo,
            enredo_en,
            verossimilhanca,
            verossimilhanca_en,
            caracteristicasLiterarias,
            caracteristicasLiterarias_en,
            conclusao,
            conclusao_en,
        });
        const data = await livro.criar();
        return res.status(201).json({ message: 'Registro criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await LivroModel.buscarTodos(req.query);

        if (!registros || registros.length === 0) {
            return res.status(400).json({ message: 'Nenhum registro encontrado.' });
        }

        return res.status(200).json(registros);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar registros.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const livro = await LivroModel.buscarPorId(parseInt(id));

        if (!livro) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: livro });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar registro.' });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const livro = await LivroModel.buscarPorId(parseInt(id));

        if (!livro) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.titulo !== undefined)
            livro.titulo = req.body.titulo;

        if (req.body.capa !== undefined)
            livro.capa = req.body.capa;

        if (req.body.autor !== undefined)
            livro.autor = req.body.autor;

        if (req.body.detalhesAutor !== undefined)
            livro.detalhesAutor = req.body.detalhesAutor;

        if (req.body.detalhesAutor_en !== undefined)
            livro.detalhesAutor_en = req.body.detalhesAutor_en;

        if (req.body.anoPublicacao !== undefined)
            livro.anoPublicacao = req.body.anoPublicacao;

        if (req.body.genero !== undefined)
            livro.genero = req.body.genero;

        if (req.body.genero_en !== undefined)
            livro.genero_en = req.body.genero_en;

        if (req.body.resumo !== undefined)
            livro.resumo = req.body.resumo;

        if (req.body.resumo_en !== undefined)
            livro.resumo_en = req.body.resumo_en;

        if (req.body.contexto !== undefined)
            livro.contexto = req.body.contexto;

        if (req.body.contexto_en !== undefined)
            livro.contexto_en = req.body.contexto_en;

        if (req.body.estiloEscrita !== undefined)
            livro.estiloEscrita = req.body.estiloEscrita;

        if (req.body.estiloEscrita_en !== undefined)
            livro.estiloEscrita_en = req.body.estiloEscrita_en;

        if (req.body.enredo !== undefined)
            livro.enredo = req.body.enredo;

        if (req.body.enredo_en !== undefined)
            livro.enredo_en = req.body.enredo_en;

        if (req.body.verossimilhanca !== undefined)
            livro.verossimilhanca = req.body.verossimilhanca;

        if (req.body.verossimilhanca_en !== undefined)
            livro.verossimilhanca_en = req.body.verossimilhanca_en;

        if (req.body.caracteristicasLiterarias !== undefined)
            livro.caracteristicasLiterarias = req.body.caracteristicasLiterarias;

        if (req.body.caracteristicasLiterarias_en !== undefined)
            livro.caracteristicasLiterarias_en = req.body.caracteristicasLiterarias_en;

        if (req.body.conclusao !== undefined)
            livro.conclusao = req.body.conclusao;

        if (req.body.conclusao_en !== undefined)
            livro.conclusao_en = req.body.conclusao_en;

        const data = await livro.atualizar();

        return res
            .status(200)
            .json({ message: `O registro "${data.titulo}" foi atualizado com sucesso!`, data });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({ error: 'Erro ao atualizar registro.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const livro = await LivroModel.buscarPorId(parseInt(id));

        if (!livro) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await livro.deletar();

        return res.status(200).json({
            message: `O registro "${livro.titulo}" foi deletado com sucesso!`,
            deletado: livro,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
