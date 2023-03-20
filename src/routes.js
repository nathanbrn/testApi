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

router.delete('/clientes/:id', clienteService.deletarCliente)

router.delete('/usuarios/:id', usuarioService.deletarUsuario)

module.exports = router