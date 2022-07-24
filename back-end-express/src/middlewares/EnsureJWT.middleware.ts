import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ApiError from "../errors/ApiError";

const ensureJWTMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let jwtToken = req.headers.authorization;

  if (!jwtToken) {
    throw new ApiError("Missing authorization token.", 404);
  }

  try {
    const [, token] = jwtToken?.split(" ");

    const secret = process.env.SECRET_KEY || "default";

    const decoded = jwt.verify(token, secret);

    const { sub } = decoded;

    req.user = {
      id: sub as string,
    };

    return next();
  } catch (err) {
    throw new ApiError("Invalid Token", 401);
  }
};

export default ensureJWTMiddleware;
