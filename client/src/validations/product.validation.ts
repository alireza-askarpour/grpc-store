import Joi from "joi"
import createError from "http-errors"

import { Messages } from "../constants/messages"
import { MONGO_ID_PATTERN } from "../constants/regex.constant"

export const createProductValidation = Joi.object({
  title: Joi.string().required().error(createError.BadRequest(Messages.INVALID_TITLE)),
  description: Joi.string().required().error(createError.BadRequest(Messages.INVALID_DESCRIPTION)),
  images: Joi.array().items(Joi.string()).required().error(createError.BadRequest(Messages.INVALID_IMAGES)),
  tags: Joi.array().items(Joi.string()).required().error(createError.BadRequest(Messages.INVALID_TAGS)),
  category: Joi.string().pattern(MONGO_ID_PATTERN).required().error(createError.BadRequest(Messages.INVALID_CATEGORY)),
  price: Joi.number().required().error(createError.BadRequest(Messages.INVALID_PRICE)),
  count: Joi.number().required().error(createError.BadRequest(Messages.INVALID_COUNT)),
})
