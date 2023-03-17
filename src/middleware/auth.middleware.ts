import { secretKey } from "@src/config/auth.js";
import { db } from "@src/database/database.js";
import { RoleInterface } from "@src/modules/roles/entities/role.entity.js";
import { ReadRoleService } from "@src/modules/roles/services/read.service.js";
import { ReadUserService } from "@src/modules/users/services/read.service.js";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function userMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      code: 401,
      status: "Unauthorized",
      message: "Authentication credentials is invalid.",
    });
  }

  const accessToken = authHeader.split(" ")[1];

  if (accessToken == undefined) {
    return res.status(401).json({
      code: 401,
      status: "Unauthorized",
      message: "Authentication credentials is invalid.",
    });
  }

  try {

    const decodedToken: any = jwt.verify(accessToken, secretKey);

    const readUserService = new ReadUserService(db);
    const user = await readUserService.handle(decodedToken.sub, {
      restrictedFields: ["password"],
    });

    if (!user) {
      return res.status(403).json({
        code: 403,
        status: "Forbidden",
        message: "Authentication credentials are invalid.",
      });
    }

    const readRoleService = new ReadRoleService(db);
    const result = (await readRoleService.handle(user.role_id)) as RoleInterface;

    if (!result.permissions.includes("read-user")) {
      return res.status(403).json({
        code: 403,
        status: "Forbidden",
        message: "Don't have necessary permissions for this resource.",
      });
    }

    next();
  } catch (error) {
    console.error("userMiddleware", error)
    return res.status(403).json({
      code: 403,
      status: "Forbidden",
      message: "Don't have necessary permissions for this resource.",
    });
  }
}

