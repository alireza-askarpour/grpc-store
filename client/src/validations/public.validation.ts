import Joi from "joi"
import createHttpError from "http-errors"

import { Messages } from "../constants/messages"
import { MONGO_ID_PATTERN } from "../constants/regex.constant"

export const objectIdValidation = Joi.object({
  id: Joi.string().pattern(MONGO_ID_PATTERN).error(createHttpError.BadRequest(Messages.INVALID_ID)),
})
