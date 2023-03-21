const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const UsuarioService = require('./services/UsuarioService')
const ClienteService = require('./services/ClienteService')

const prisma = new PrismaClient()
const usuarioService = new UsuarioService()
const clienteService = new ClienteService()

router.get('/usuarios', usuarioService.buscarTodosOsUsuarios)

router.post('/usuarios', usuarioService.criarUsuario)

router.get('/usuarios/:id', usuarioService.buscarUsuarioPorId)

router.get('/clientes', clienteService.buscarTodosOsClientes)

router.post('/clientes', clienteService.criarCliente)

router.get('/clientes/:id', clienteService.buscarClientePorId)

router.patch('/clientes/:id', async (req, res) => {
    const { id } = req.params
    const { email, name, vendedorId } = req.body
    try {
        const cliente = await prisma.cliente.update({
            where: {
                id: Number(id)
            },
            data: {
                email,
                name,
                vendedorId
            }
        })
        res.status(201).json(cliente)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'Erro ao atualizar cliente' })
    }
})

router.patch('/usuarios/:id', async (req, res) => {
    const { id } = req.params
    const { email, name, password } = req.body
    try {
        const usuario = await prisma.usuario.update({
            where: {
                id: Number(id)
            },
            data: {
                email,
                name,
                password
            }
        })
        res.status(201).json(usuario)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'Erro ao atualizar cliente' })
    }
})

router.delete('/clientes/:id', clienteService.deletarCliente)

router.delete('/usuarios/:id', usuarioService.deletarUsuario)

module.exports = router