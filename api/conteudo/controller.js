const model = require('./model')

module.exports.index = async (req, res) => {

  try {
    data = await model.searchAllConteudo()
    data = data.recordset
    data.map((item) => {
      if(item.imgResposta){
        item.imgResposta = item.imgResposta.split(',')
      }
    })
      return res.status(200).json({
      status: 200,
      msgStatus: 'Ok',
      error: false,
      data
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status: 500,
      msgStatus: 'Error on searchAllCategoria ',
      error: true,
      err
    })
  }

}

exports.searchAllCategoria = async (req, res) => {
  
  try {
    data = await model.searchAllCategoria()
    data = data.recordset
      return res.status(200).json({
      status: 200,
      msgStatus: 'Ok',
      error: false,
      data
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status: 500,
      msgStatus: 'Error on searchAllCategoria ',
      error: true,
      err
    })
  }

}


exports.searchAllConteudo = async (req, res) => {
  
  try {
    data = await model.searchAllConteudo()
    data = data.recordset
      return res.status(200).json({
      status: 200,
      msgStatus: 'Ok',
      error: false,
      data
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status: 500,
      msgStatus: 'Error on searchAllConteudo ',
      error: true,
      err
    })
  }

}

module.exports.searchConteudoById = async (req, res) => {

  try {
    data = await model.searchConteudoById(req.params.id)
    data = data.recordset
    data.map((item) => {
      if(item.imgResposta){
        item.imgResposta = item.imgResposta.split(',')
      }
    })
      return res.status(200).json({
      status: 200,
      msgStatus: 'Ok',
      error: false,
      data
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status: 500,
      msgStatus: 'Error on searchAllCategoria ',
      error: true,
      err
    })
  }
}

//module.exports.searchAllCategoria = (req, res) => {
  //model.searchAllCategoria(function (rows) {
    //res.status(200).send(rows)
 // })
//}

module.exports.insertCategoria = async (req, res) => {
  let errors = []
  if (!req.body.nome) {
    errors.push('Require nome')
  }


  if (errors.length > 0) {
    return res.status(500).send({fail: true, errors})
  }

  try {
      data = await model.insertCategoria(req.body)
      return res.status(200).json({
      status: 200,
      msgStatus: 'Dados inseridos com sucesso',
      error: false
     })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status: 500,
      msgStatus: 'Error on insertCategoria ',
      error: true,
      err
    })
  }

  
}

module.exports.categoriaPergunta = async (req, res) => {
  try {
    let objResponse = []
    let content
    let objInput
    let idCatObjInput
    let categorias = await model.existCategorys()
    categorias = categorias.recordset

    for (let i = 0; i < categorias.length; i++) {
      content = await model.ContentByidCategoria(categorias[i].idCategoria)
       objInput = categorias[i].nome
      idCatObjInput = categorias[i].idCategoria
      objResponse.push({'nome': objInput, 'idCategoria': idCatObjInput, 'conteudo': content.recordset})
    }

    res.status(200).send({fails: false, result: objResponse})
  } catch (error) {
    console.log(error)
    res.status(500).send({fail: true, error})
  }
}

module.exports.insertConteudo = async (req, res) => {
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

  if (!req.body.imgResposta) {
    errors.push('Require imgResposta')
  }

  if (errors.length > 0) {
    return res.status(500).send({fail: true, errors})
  }

  try {
    data = await model.insertConteudo(req.body)
      return res.status(200).json({
      status: 200,
      msgStatus: 'Dados inseridos com sucesso',
      error: false,
      data
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status: 500,
      msgStatus: 'Error on insertConteudo ',
      error: true,
      err
    })
  }
  
}

module.exports.deleteConteudo = async (req, res) => {
  let errors = []
  if (!req.params.id) {
    errors.push('Require id')
  }

  if (errors.length > 0) {
    return res.status(500).send({fail: true, errors})
  }

  try {
    data = await model.deleteConteudo(req.params.id)
      return res.status(200).json({
      status: 200,
      msgStatus: 'Dados deletados com sucesso',
      error: false,
      data
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status: 500,
      msgStatus: 'Error on deleteConteudo ',
      error: true,
      err
    })
  }
}

module.exports.deleteCategoria = async (req, res) => {
  let errors = []
  if (!req.params.id) {
    errors.push('Require id')
  }

  if (errors.length > 0) {
    return res.status(500).send({fail: true, errors})
  }

  try {
    data = await model.deleteCategoria(req.params.id)
      return res.status(200).json({
      status: 200,
      msgStatus: 'Dados deletados com sucesso',
      error: false,
      data
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status: 500,
      msgStatus: 'Error on deleteCategoria ',
      error: true,
      err
    })
  }
}

module.exports.updateConteudo = async (req, res) => {
  let errors = []
  if (!req.body.id) {
    errors.push('Require id')
  }

  if (!req.body.textoResposta) {
    errors.push('Require textoResposta')
  }
  if (!req.body.textoPergunta) {
    errors.push('Require textoPergunta')
  }

  if (!req.body.idCategoria) {
    errors.push('Require idCategoria')
  }

  if (!req.body.imgResposta) {
    errors.push('Require imgResposta')
  }

  if (errors.length > 0) {
    return res.status(500).send({fail: true, errors})
  }


  try {
    data = await model.updateConteudo(req.body)
      return res.status(200).json({
      status: 200,
      msgStatus: 'Dados alterados com sucesso',
      error: false,
      data
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status: 500,
      msgStatus: 'Error on updateConteudo ',
      error: true,
      err
    })
  }



  
}

module.exports.updateCategoria = async (req, res) => {
  let errors = []
  if (!req.body.nome) {
    errors.push('Require nome')
  }

  if (!req.body.id) {
    errors.push('Require id')
  }

  if (errors.length > 0) {
    return res.status(500).send({fail: true, errors})
  }

  try {
    data = await model.updateCategoria(req.body)
      return res.status(200).json({
      status: 200,
      msgStatus: 'Dados alterados com sucesso',
      error: false,
      data
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status: 500,
      msgStatus: 'Error on updateCategoria ',
      error: true,
      err
    })
  }

}
