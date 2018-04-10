const express = require('express')
const router = express.Router()
const controller = require('../conteudo/controller')

router.get('/', controller.index)
router.get('/searchAllCategoria/', controller.searchAllCategoria)
router.get('/searchConteudoById/:id', controller.searchConteudoById)
router.post('/insertCategoria/', controller.insertCategoria)
router.post('/insertConteudo/', controller.insertConteudo)
router.post('/updateConteudo/', controller.updateConteudo)
router.post('/updateCategoria/', controller.updateCategoria)
router.delete('/deleteConteudo/:id', controller.deleteConteudo)
router.delete('/deleteCategoria/:id', controller.deleteCategoria)
router.get('/categoriaPergunta', controller.categoriaPergunta)
module.exports = router
