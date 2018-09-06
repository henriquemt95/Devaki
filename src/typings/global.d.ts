import { NextFunction, Request, Response } from 'express';
import { ValidationChain } from 'express-validator/check'

declare interface Endpoint {
  handler: (req: Request, res: Response) => any;
  validations: ValidationChain[];
}


declare interface RequestGet{
  url:string,
  header:Object
}


declare interface RequestPost{
  url:string,
  header:Object,
  form:Object
}
