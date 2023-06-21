import Joi from "joi"
import createError from "http-errors"
import { Messages } from "../constants/messages"

export const getOtpSchema = Joi.object({
  mobile: Joi.string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .required()
    .error(createError.BadRequest(Messages.INVALID_MOBILE)),
})

export const checkOtpSchema = Joi.object({
  mobile: Joi.string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .required()
    .error(createError.BadRequest(Messages.INVALID_MOBILE)),
  code: Joi.string()
    .length(6)
    .required()
    .error(createError.BadRequest(Messages.INVALID_CODE)),
})
