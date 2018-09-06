import { Endpoint } from "../typings/global";
import { check, validationResult } from 'express-validator/check';
import { Request, Response } from 'express'
import * as Model from '../model/UsersModel';
import * as bcrypt from 'bcrypt-nodejs'
import * as jwt from 'jsonwebtoken'



export const Login: Endpoint = {

  /**
   * Validate Data Request
   */

  validations: [
    check('user').isLength({ min: 5 }),
    check('password').isLength({ min: 1 }),
  ],
  /**
   * Handler Action GetAcessToken
   */
  handler: async function Login(request: Request, response: Response) {

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() });
    }

    try {

      let FindUser = await Model.FindUser({ user: request.body.user })

      if (FindUser.length == 0) {
        return response.status(401).json({
          error: 'Incorrect username or password',
          fail: true
        })
      }


      if (!bcrypt.compareSync(request.body.password, FindUser[0].password)) {
        return response.status(401).json({
          error: 'Incorrect username or password',
          fail: true
        })
      }

      if (!process.env.SECRET) {
        return response.status(500).json({
          fail: true,
          error: 'SECRET DONT SET IN .ENV'
        })
      }

      if (request.body.tokenUser == FindUser[0].token) {

        let token = jwt.sign({ id: FindUser[0].id, user: FindUser[0].user }, process.env.SECRET, { expiresIn: '24h' })
        return response.status(200).json({
          token,
          fail: false
        })
      }

    } catch (errors) {

      console.log(errors)
      return response.status(500).json({
        status: 500,
        msgStatus: 'Internal Server Error Users Service - Login',
        fail: true,

      })

    }

  }

}



export const UserName: Endpoint = {
  /**
   * Validate Data Request
   */
  validations: [
    check('id').isLength({ min: 1 })
  ],
  /**
   * Handler Action GetAcessToken
   */
  handler: async function UserName(request: Request, response: Response) {

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() });
    }

    try {

      let FindUserById = await Model.FindUserById({ id: request.body.id })

      if (FindUserById.length == 0) {
        return response.status(401).json({
          error: 'Incorrect User id',
          fail: true
        })
      }


      let UserName = FindUserById[0].name

      return response.status(200).json({
        UserName,
        fail: false
      })
    } catch (errors) {

      return response.status(500).json({
        status: 500,
        msgStatus: 'Internal Server Error Users Service - UserName',
        fail: true,
        errors
      })
    }

  },

}

export const InsertUser: Endpoint = {
  /**
   * Validate Data Request
   */
  validations: [

    check('name').isLength({ min: 3 }),
    check('phoneNumber').isLength({ min: 8 }),
    check('email').isEmail(),
    check('office').isLength({ min: 3 }),
    check('dt_Birth').isLength({ min: 10 }),
    check('dt_Admission').isLength({ min: 10 }),
    check('status').isLength({ min: 1 }),
    check('sector').isLength({ min: 3 }),
    check('user').isLength({ min: 5 }),
    check('password').isLength({ min: 8 }),
    check('salary').isLength({ min: 3 }),
    check('idProfile').isLength({ min: 1 }),
    check('document').isLength({ min: 8 }),
    check('address').isLength({ min: 5 }),
  ],
  /**
   * Handler Action GetAcessToken
   */
  handler: async function InsertUser(request: Request, response: Response) {

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() });
    }

    try {

      let checkUserExistence = await Model.FindUserByEmail({ email: request.body.email })
      let FindUserByUser = await Model.FindUserByUser({ user: request.body.user })


      if (checkUserExistence.length > 0 || FindUserByUser.length > 0) {

        return response.status(422).json({
          msg: 'User already exist',
          fail: true,
          status: 422

        })
      }

      const salt = bcrypt.genSaltSync()
      request.body.password = bcrypt.hashSync(request.body.password, salt)

      request.body.salary = (request.body.salary * 100)

      await Model.InsertUser(request.body)

      return response.status(200).json({
        status: 200,
        fail: false,
        msg: 'User registered successfully'
      })

    } catch (errors) {

      return response.status(500).json({
        status: 500,
        msg: 'Internal Server Error Users Service - InsertUser',
        fail: true,
        errors
      })
    }

  },

}


export const UpdateUser: Endpoint = {
  /**
   * Validate Data Request
   */
  validations: [
    check('id').isLength({ min: 1 }),
    check('name').isLength({ min: 3 }),
    check('phoneNumber').isLength({ min: 8 }),
    check('email').isEmail(),
    check('office').isLength({ min: 3 }),
    check('dt_Birth').isLength({ min: 10 }),
    check('dt_Admission').isLength({ min: 10 }),
    check('status').isLength({ min: 1 }),
    check('sector').isLength({ min: 3 }),
    check('user').isLength({ min: 5 }),
    check('salary').isLength({ min: 3 }),
    check('idProfile').isLength({ min: 1 }),
    check('document').isLength({ min: 8 }),
    check('address').isLength({ min: 5 }),
  ],
  /**
   * Handler Action GetAcessToken
   */
  handler: async function UpdateUser(request: Request, response: Response) {

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() });
    }

    try {

      let checkUserExistence = await Model.FindUserById({ id: request.body.id })


      if (checkUserExistence.length < 1) {

        return response.status(422).json({ msg: 'User not exist', fail: true })
      }


      let encryptedPassword = false

      if (!request.body.password) {
        let password = await Model.FindUserById({ id: request.body.id })

        request.body.password = password[0].password
        encryptedPassword = true
      }

      if (!encryptedPassword) {
        const salt = bcrypt.genSaltSync()
        request.body.password = bcrypt.hashSync(request.body.password, salt)
      }

      if (request.body.salary) {
        request.body.salary = (request.body.salary * 100)
      }


      let update = await Model.UpdateUser(request.body)
      if (update) {
        return response.status(200).json({
          status: 200,
          fail: false,
          msg: "User updated successfully"
        })
      }

    } catch (errors) {

      return response.status(500).json({
        status: 500,
        msgStatus: 'Internal Server Error Users Service - UpdateUser',
        fail: true,
        errors
      })
    }

  },

}


export const SelectAllUsers: Endpoint = {
  /**
   * Validate Data Request
   */
  validations: [

  ],
  /**
   * Handler Action GetAcessToken
   */
  handler: async function SelectAllUsers(request: Request, response: Response) {

    try {

      let Users = await Model.AllUsers()

      return response.status(200).json({
        Users,
        fail: false
      })
    } catch (errors) {

      return response.status(500).json({
        status: 500,
        msgStatus: 'Internal Server Error Users Service - SelectAllUsers',
        fail: true,
        errors
      })
    }

  },

}



export const SelectUserByToken: Endpoint = {
  /**
   * Validate Data Request
   */
  validations: [

    check('id').isLength({ min: 1 }),

  ],
  /**
   * Handler Action GetAcessToken
   */
  handler: async function SelectUserByToken(request: Request, response: Response) {

    try {

      let User = await Model.FindUserById({ id: request.params.id })


      if (User.length == 0) {
        return response.status(422).send({
          msg: 'Id of User is not valid',
          fail: true,
          status: 422
        })
      }


      return response.status(200).json({
        User,
        fail: false
      })
    } catch (errors) {

      return response.status(500).json({
        status: 500,
        msgStatus: 'Internal Server Error Users Service - SelectAllUsers',
        fail: true,
        errors
      })
    }

  },

}