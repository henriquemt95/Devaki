const model = require('./model')

module.exports.index = (req, res) => {
  model.searchAllConteudo(function (rows) {
    rows.map((item) => {
      if (item.imgResposta) {
        item.imgResposta = item.imgResposta.split(',')
      }
    })
    res.status(200).send(rows)
  })
}

module.exports.searchAllCategoria = (req, res) => {
  model.searchAllCategoria(function (rows) {
    res.status(200).send(rows)
  })
}

module.exports.searchConteudoById = (req, res) => {
  model.searchConteudoById(req.params.id, function (rows) {
    rows.map((item) => {
      if (item.imgResposta) {
        item.imgResposta = item.imgResposta.split(',')
      }
    })
    res.status(200).send(rows)
  })
}

module.exports.searchAllCategoria = (req, res) => {
  model.searchAllCategoria(function (rows) {
    res.status(200).send(rows)
  })
}

module.exports.insertCategoria = (req, res) => {
  let errors = []
  if (!req.body.nome) {
    errors.push('Require nome')
  }

  if (errors.length > 0) {
    return res.status(500).send({fail: true, errors})
  }

  model.insertCategoria(req.body, function (rows) {
    res.status(200).send(rows)
  })
}

module.exports.categoriaPergunta = async (req, res) => {
  try {
    let objResponse = []
    let content
    let objInput
    let idCatObjInput
    let categorias = await model.existCategorys()

    for (let i = 0; i < categorias.length; i++) {
      content = await model.ContentByidCategoria(categorias[i].idCategoria)
      objInput = categorias[i].nome
      idCatObjInput = categorias[i].idCategoria
      objResponse.push({'nome': objInput, 'idCategoria': idCatObjInput, 'conteudo': content})
    }

    res.status(200).send({fails: false, result: objResponse})
  } catch (error) {
    console.log(error)
    res.status(500).send({fail: true, error})
  }
}

module.exports.insertConteudo = (req, res) => {
  let errors = []
  if (!req.body.textoResposta) {
    errors.push('Require textoResposta')
  }
  if (!req.body.textoPergunta) {
    errors.push('Require textoPergunta')
  }

  if (!req.body.idCategoria) {
    errors.push('Require idCategoria')
  }

  if (errors.length > 0) {
    return res.status(500).send({fail: true, errors})
  }
  model.insertConteudo(req.body, function (rows) {
    res.status(200).send({fail: false, rows})
  })
}

module.exports.deleteConteudo = (req, res) => {
  let errors = []
  if (!req.params.id) {
    errors.push('Require id')
  }

  if (errors.length > 0) {
    return res.status(500).send({fail: true, errors})
  }

  model.deleteConteudo(req.params.id, function (rows) {
    res.status(200).send(rows)
  })
}

module.exports.deleteCategoria = (req, res) => {
  let errors = []
  if (!req.params.id) {
    errors.push('Require id')
  }

  if (errors.length > 0) {
    return res.status(500).send({fail: true, errors})
  }

  model.deleteCategoria(req.params.id, function (rows) {
    res.status(200).send(rows)
  })
}

module.exports.updateConteudo = (req, res) => {
  let errors = []
  if (!req.body.id) {
    errors.push('Require id')
  }

  if (errors.length > 0) {
    return res.status(500).send({fail: true, errors})
  }

  model.updateConteudo(req.body, function (rows) {
    res.status(200).send(rows)
  })
}

module.exports.updateCategoria = (req, res) => {
  let errors = []
  if (!req.body.nome) {
    errors.push('Require nome')
  }

  if (errors.length > 0) {
    return res.status(500).send({fail: true, errors})
  }

  model.updateCategoria(req.body, function (rows) {
    res.status(200).send(rows)
  })
}
