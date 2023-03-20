const { PrismaClient } = require('@prisma/client')
const express = require('express')
const { Request, Response} = require('express')

const prisma = new PrismaClient()

class UsuarioService {

    constructor() {}

    async buscarTodosOsUsuarios(req = Request, res = Response) {
        try {
            const usuario = await prisma.usuario.findMany()
            if(usuario.length > 0)
                res.status(200).json(usuario)
            else
                res.status(404).json({message: 'Nenhum usuário encontrado'})
        } catch(err) {
            console.log(err)
            res.status(500).json({message: 'Erro ao buscar usuários'})
        }
    }

    async criarUsuario(req = Request, res = Response) {
        const { id, email, name, password } = req.body
        try {
            const usuario = await prisma.usuario.create({
                data: {
                    id,
                    email,
                    name,
                    password
                }
            })
            res.status(201).json(usuario)
        } catch(err) {
            console.log(err)
            res.status(500).json({message: 'Erro ao criar usuário'})
        }
    }

    async buscarUsuarioPorId(req = Request, res = Response) {
        const { id } = req.params
        try {
            const usuario = await prisma.usuario.findUnique({
                where: {
                    id: Number(id)
                }
            })
            res.status(200).json(usuario)
        } catch(err) {
        console.log(err)
        res.status(404).json({message: 'Nenhum usuário encontrado'})
        }
    }

    
}

module.exports = UsuarioService