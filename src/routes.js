const express = require('express')
const router = express.Router()
const UsuarioService = require('./services/UsuarioService')
const ClienteService = require('./services/ClienteService')

const usuarioService = new UsuarioService()
const clienteService = new ClienteService()

router.get('/usuarios', usuarioService.buscarTodosOsUsuarios)

router.get('/clientes', clienteService.buscarTodosOsClientes)

router.get('/usuarios/:id', usuarioService.buscarUsuarioPorId)

router.get('/clientes/:id', clienteService.buscarClientePorId)

router.post('/usuarios', usuarioService.criarUsuario)

router.post('/clientes', clienteService.criarCliente)

router.patch('/usuarios/:id', usuarioService.atualizarUsuario)

router.patch('/clientes/:id', clienteService.atualizarCliente)

router.delete('/clientes/:id', clienteService.deletarCliente)

router.delete('/usuarios/:id', usuarioService.deletarUsuario)

module.exports = router