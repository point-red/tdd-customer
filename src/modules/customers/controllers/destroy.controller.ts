import { NextFunction, Request, Response } from "express";
import { DestroyCustomerService } from "../services/destroy.service.js";
import { db } from "@src/database/database.js";

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = db.startSession();

    db.startTransaction();
    const destroyCustomerService = new DestroyCustomerService(db);
    const result = await destroyCustomerService.handle(req.params.id, { session });

    await db.commitTransaction();

    res.status(200).json(result);
  } catch (error) {
    await db.abortTransaction();
    next(error);
  } finally {
    await db.endSession();
  }
};
