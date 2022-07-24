import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserCreation } from "../interfaces/users.interfaces";

export const userLoginSchema: SchemaOf<IUserCreation> = yup.object().shape({
  name: yup.string().required("name is a required field"),
  password: yup.string().required("password is a required field"),
});

export const validateUserLogin =
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
