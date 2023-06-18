import { NextFunction, Request, Response } from "express"

export const catchAsync = (cb: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    cb(req, res).catch(next)
  }
}
