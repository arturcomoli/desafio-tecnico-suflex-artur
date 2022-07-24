import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserUpdate } from "../interfaces/users.interfaces";

export const updateAccountSchema: SchemaOf<IUserUpdate> = yup.object().shape({
  id: yup.string(),
  name: yup.string().min(3, "your name must have at least 3 characteres."),
  password: yup
    .string()
    .min(6, "your password must have at least 6 characteres"),
});

export const validateUserUpdate =
  (schema: SchemaOf<IUserUpdate>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.validUpdate = validatedData;
        next();
      } catch (err: any) {
        return res.status(400).json({
          status: "error",
          message: err.errors?.join(", "),
        });
      }
    } catch (err) {
      next(err);
    }
  };
