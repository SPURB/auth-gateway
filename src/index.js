import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import customMiddlewares from './middlewares'
import { Router } from 'express'
import usuarios from './controllers'

const router = new Router()
const { name, version } = require('../package.json')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(customMiddlewares)

// views
router.get('/', usuarios.findAll)
router.post('/cadastrar', usuarios.create)
router.post('/login', usuarios.login)
router.delete('/logout', usuarios.logout)
router.get('/:id', usuarios.findOne)
router.put('/:id', usuarios.update)
router.delete('/:id', usuarios.delete)
app.use(`/${name}/${version}/`, router) // base => http://localhost:5000/auth-gateway-spurb/0.0.1

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Servidor diponível na porta ${PORT}.`)
})
