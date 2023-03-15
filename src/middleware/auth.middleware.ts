import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  _id: string;
}

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, "process.env.JWT_SECRET") as JwtPayload;
    const requser = decodedToken._id;
    console.log("DATA:", requser);

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }
};
