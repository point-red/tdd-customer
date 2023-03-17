import { RoleInterface } from "@src/modules/roles/entities/role.entity.js";
import { db } from "@src/database/database.js";
import { ReadRoleService } from "@src/modules/roles/services/read.service.js";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ReadUserService } from "@src/modules/users/services/read.service.js";

export async function userMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({
      code: 403,
      status: "Forbidden",
      message: "Unauthorized Access",
    });
  }

  const accessToken = authHeader.split(" ")[1];

  try {
    const decodedToken: any = jwt.verify(accessToken, "process.env.JWT_SECRET");
    const readUserService = new ReadUserService(db);
    const user = await readUserService.handle(decodedToken._id, {
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
    return res.status(403).json({
      code: 403,
      status: "Forbidden",
      message: "Don't have necessary permissions for this resource.",
    });
  }
}

