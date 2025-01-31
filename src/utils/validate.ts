import { Request, Response, NextFunction } from "express";
import { ZodError, type Schema } from "zod";
import { fromZodError } from "zod-validation-error";
import { errorResponse } from "./apiResponse";

export const validate =
  <T>(schema: Schema<T>) =>
  (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body = schema.parse(request.body);
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return response
          .status(400)
          .json(errorResponse(fromZodError(error).message, 400));
      }
    }
  };
