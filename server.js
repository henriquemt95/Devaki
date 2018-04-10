require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const app = express()
const port = process.env.NODEPORT || 3003
const bodyparser = require('body-parser')

app.use(morgan('dev'))

app.use(bodyparser.urlencoded({
  extended: true
}))

app.use(bodyparser.json())

app.use(function (req, res, next) {
  // Website you wish to allow to connect

  res.setHeader('Access-Control-Allow-Origin', '*')

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false)
  // Pass to next layer of middleware
  next()
})

app.use('/conteudo', require('./api/conteudo/router'))

app.set('json spaces', 4)

app.listen(port)
console.log('Aplicação rodando na porta ', port)
