const db = require('./models')
const Usuario = db.usuarios

const { hashSync } = require('bcrypt')

const exceptionsDefault = error => {
  return {
    message: error.message || 'Erro na requisição',
    error
  }
}

exports.create = async (req, res) => {
	const { email, password } = req.body

  if (!email || !password) {
    return res
      .status(400)
      .send(
        exceptionsDefault('Ausência de email ou password na body da requisição')
      )
  }

  const hash = hashSync(req.body.password, 10)

  try {
    let user = await Usuario.create(Object.assign(req.body, { password: hash }))
    let data = await user.authorize()

    return res.json({
      message: 'Usuário criado',
      data
    })
  } catch (err) {
    return res.status(400).send(exceptionsDefault(err))
  }
}

exports.login = async (req, res) => {
	const { email, password } = req.body
  if (!email || !password) {
    return res
      .status(400)
      .send(
        exceptionsDefault('Ausência de email ou password na body da requisição')
      )
  }

  try {
    let user = await Usuario.authenticate(email, password)
    return res.json(user)
  } catch (err) {
    return res.status(400).send(exceptionsDefault(err))
  }
}

exports.logout = async (req, res) => {
  const token = req.headers['authorization']

  try {
    if (!req.authorized) {
      return res
        .status(403)
        .send(exceptionsDefault('Erro no token de autenticação'))
    }

    let user = await Usuario.logout(token)
    return res.status(204).send({ user })
  } catch (err) {
    return res.status(400).send(exceptionsDefault(err))
  }
}

exports.findAll = (req, res) => {
  return Usuario.findAll()
    .then(usuarios => {
      const usuariosSemDadosSensiveis = usuarios.map(usuario => {
        return {
          id: usuario.id,
          nprodam: usuario.nprodam
        }
      })
      res.send({
        message: 'Usuários cadastrados',
        data: usuariosSemDadosSensiveis
      })
    })
    .catch(err => {
      res
        .status(500)
        .send(exceptionsDefault('Ocorreu um erro ao encontrar usuários'))
    })
}
exports.findOne = (req, res) => {
  const iduser = req.params.id
  Usuario.findByPk(iduser)
    .then(user => {
      const { id, nprodam } = user
      res.send({
        message: 'Usuário',
        id,
        nprodam
      })
    })
    .catch(err => {
      res
        .status(400)
        .send(exceptionsDefault(err || 'Ocorreu um erro ao encontrar usuário'))
    })
}

exports.update = (req, res) => {
  const id = req.params.id

	if (!req.authorized || req.authorizeduser !== parseInt(id)) {
		return res.status(403).send({ message: 'Erro! Usuário não autorizado' })
	}

	Usuario.update(req.body, { where: { id } })
		.then(() => res.send({ message: `Sucesso! id: ${id} foi atualizado`}))
		.catch(err => res.status(500).send(exceptionsDefault(err)))
}

exports.delete = (req, res) => {
  const id = req.params.id
  const token = req.headers['authorization']

	if (!req.authorized || req.authorizeduser !== parseInt(id)) {
		return res.status(403).send({ message: 'Erro! Usuário não autorizado' })
	}

	try {
		Usuario.deleteTokens(id)
	} catch(err) {
		return res.status(500).send(exceptionsDefault(err))
	}

	Usuario.destroy({ where: { id } })
	.then(num => {
		if (num) {
			res.send({
				message: `Sucesso! id: ${id} foi deletada`
			})
		} else {
			res.send({
				message: `Erro. Não foi possível deletar id: ${id}. Talvez ${id} não tenha sido enconcontrada`
			})
		}
	})
	.catch(err => {
		res.status(500).send({
			message: err.message || `Erro. Não foi possível deletar id: ${id}`
		})
	})
}
