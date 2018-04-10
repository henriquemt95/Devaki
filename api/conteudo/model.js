const mysql = require('../../mysql')

module.exports.searchAllConteudo = (callback) => {
  let sql = 'select id, textoPergunta, textoResposta, imgResposta, dtInsert, idCategoria from Conteudo'

  mysql.query(sql, [], function (error, rows) {
    if (error) {
      console.log(error)
    } else {
      callback(rows)
    }
  })
}

module.exports.searchAllCategoria = (callback) => {
  let sql = 'select * from Categoria'

  mysql.query(sql, [], function (error, rows) {
    if (error) {
      console.log(error)
    } else {
      callback(rows)
    }
  })
}

module.exports.insertCategoria = (categoria, callback) => {
  let sql = ('insert into Categoria (id,nome) values(?,?) ')

  mysql.query(sql, [categoria.id, categoria.nome], function (error, rows) {
    if (error) {
      console.log(error)
    } else {
      callback(rows)
    }
  })
}

module.exports.deleteCategoria = (categoria, callback) => {
  let sql = ('delete from Categoria where id = ? ')

  mysql.query(sql, [categoria], function (error, rows) {
    if (error) {
      console.log(error)
    } else {
      callback(rows)
    }
  })
}

module.exports.deleteConteudo = (conteudo, callback) => {
  let sql = ('delete from Conteudo where id = ? ')

  console.log(sql)

  mysql.query(sql, [conteudo], function (error, rows) {
    if (error) {
      console.log(error)
    } else {
      callback(rows)
    }
  })
}

module.exports.insertConteudo = (conteudo, callback) => {
  let sql = ('insert into Conteudo (textoPergunta,textoResposta,imgResposta,dtInsert,idCategoria) values(?,?,?,now(),?)  ')

  mysql.query(sql, [conteudo.textoPergunta, conteudo.textoResposta, conteudo.imgResposta, conteudo.idCategoria], function (error, rows) {
    if (error) {
      console.log(error)
    } else {
      callback(rows)
    }
  })
}

module.exports.updateConteudo = (conteudo, callback) => {
  let id = conteudo.id
  delete conteudo.id
  let sql = ('update Conteudo set ? where id = ? ')

  mysql.query(sql, [conteudo, id], function (error, rows) {
    if (error) {
      console.log(error)
    } else {
      callback(rows)
    }
  })
}

module.exports.updateCategoria = (categoria, callback) => {
  let sql = ('update Categoria set nome = ? where id = ?')

  mysql.query(sql, [categoria.nome, categoria.id], function (error, rows) {
    if (error) {
      console.log(error)
    } else {
      callback(rows)
    }
  })
}

module.exports.existCategorys = () => {
  return new Promise((resolve, reject) => {
    let sql = `
    select cont.idCategoria, cat.nome from Conteudo as cont, Categoria as cat where
    cont.idCategoria = cat.id
    group by idCategoria;
    `
    mysql.query(sql, [], (error, rows) => {
      if (error) {
        console.log(error)
        return reject(error)
      }
      resolve(rows)
    })
  })
}

module.exports.ContentByidCategoria = (idCat) => {
  return new Promise((resolve, reject) => {
    let sql = `
    SELECT Conteudo.id,
    Conteudo.textoPergunta,
    Conteudo.textoResposta,
    Conteudo.imgResposta,
    Conteudo.dtInsert,
    Conteudo.idCategoria
FROM Conteudo where idCategoria = ?;
    `
    mysql.query(sql, [idCat], (error, rows) => {
      if (error) {
        console.log(error)
        return reject(error)
      }
      resolve(rows)
    })
  })
}

module.exports.searchConteudoById = (id, callback) => {
  let sql = (`
  SELECT Conteudo.id,
  Conteudo.textoPergunta,
  Conteudo.textoResposta,
  Conteudo.imgResposta,
  Conteudo.dtInsert,
  Conteudo.idCategoria
FROM Conteudo where id = ?;
  `)

  mysql.query(sql, [id], function (error, rows) {
    if (error) {
      console.log(error)
    } else {
      callback(rows)
    }
  })
}
