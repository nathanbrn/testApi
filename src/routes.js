const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const UsuarioService = require('./services/UsuarioService')

const prisma = new PrismaClient()
const usuarioService = new UsuarioService(prisma)

router.get('/usuarios', usuarioService.buscarTodosOsUsuarios)

router.post('/usuarios', usuarioService.criarUsuario)

router.get('/usuarios/:id', async (req, res) => {
    const { id } = req.params
    console.log(id)
    try {
        const usuario = await prisma.usuario.findUnique({
            where: {
                id: Number(id)
            }
        })
        res.status(200).json(usuario)
    } catch (err) {
        console.log(err)
        res.status(404).json({message: 'Nenhum usuário encontrado'})
    }
})

router.get('/clientes', async (req, res) => {
    const cliente = await prisma.cliente.findMany()
    if(cliente.length > 0)
        res.status(200).json(cliente)
    else
        res.status(404).json({message: 'Nenhum cliente encontrado'})
})

router.post('/clientes', async (req, res) => {
    const { id, email, name, vendedorId } = req.body
    try {
        const cliente = await prisma.cliente.create({
            data: {
                id,
                email,
                name,
                vendedorId
            }
        })
        res.status(201).json(cliente)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Erro ao criar cliente'})
    }
})

router.get('/clientes/:id', async (req, res) => {
    const { id } = req.params
    try {
        const cliente = await prisma.cliente.findUnique({
            where: {
                id: Number(id)
            }
        })
        res.status(200).json(cliente)
    } catch(err) {
        console.log(err)
        res.status(404).json({message: 'Nenhum cliente encontrado'})
    }
})

router.delete('/clientes/:id', async (req, res) => {
    const { id } = req.params 
    try {
        const cliente = await prisma.cliente.delete({
            where: {
                id: Number(id)
            }
        })
        res.status(204).json({message: 'Cliente deletado com sucesso'})
    } catch(err) {
        console.log(err)
        res.status(404).json({message: 'Não existe este cliente'})
    }
})

router.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params
    try {
        const usuario = await prisma.usuario.delete({
            where: {
                id: Number(id)
            }
        })
        res.status(204).json({message: 'Usuário deletado com sucesso'})
    } catch(err) {
        console.log(err)
        res.status(404).json({message: 'Não existe este usuário'})
    }
})

module.exports = router