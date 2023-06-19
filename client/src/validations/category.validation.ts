import Joi from "joi"
import createError from "http-errors"

import { Messages } from "../constants/messages"
import { MONGO_ID_PATTERN } from "../constants/regex.constant"

export const createCategorySchema = Joi.object({
  name: Joi.string().required().error(createError.BadRequest(Messages.INVALID_CODE)),
  value: Joi.string().required().error(createError.BadRequest(Messages.INVALID_VALUE)),
  parent: Joi.string()
    .pattern(MONGO_ID_PATTERN)
    .error(createError.BadRequest(Messages.INVALID_PARENT)),
})
