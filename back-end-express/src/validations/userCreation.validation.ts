import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserCreation } from "../interfaces/users.interfaces";

export const createAccountSchema: SchemaOf<IUserCreation> = yup.object().shape({
  name: yup
    .string()
    .min(3, "your name must have at least 3 characteres.")
    .required("name is a required field"),
  password: yup
    .string()
    .min(6, "your password must have at least 6 characteres")
    .required("password is a required field"),
});

export const validateUserCreation =
  (schema: SchemaOf<IUserCreation>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.validUser = validatedData;
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
