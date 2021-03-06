import express from 'express'
import * as Users from '../controllers/UsersController'

const router = express.Router()

/**
 * Set Routes Authentication
 */
router.post('/Login', Users.Login.validations, Users.Login.handler)
router.post('/UsersName', Users.UserName.validations, Users.UserName.handler)
router.post('/InsertUsers', Users.InsertUser.validations, Users.InsertUser.handler)
router.post('/UpdateUsers', Users.UpdateUser.validations, Users.UpdateUser.handler)
router.get('/SelectUsersByToken/:authToken', Users.SelectUserByToken.validations, Users.SelectUserByToken.handler)




export default router
