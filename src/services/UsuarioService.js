const { PrismaClient } = require('@prisma/client')
const express = require('express')
const { Request, Response} = require('express')

const prisma = new PrismaClient()

class UsuarioService {
    constructor(prisma) {
        this.prisma = prisma
    }

    async buscarTodosOsUsuarios(req, res) {

    }
}