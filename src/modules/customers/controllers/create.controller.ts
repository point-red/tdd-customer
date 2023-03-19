import { NextFunction, Request, Response } from "express";
import { validate } from "../request/create.request.js";
import { CreateCustomerService } from "../services/create.service.js";
import { db } from "@src/database/database.js";

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const session = db.startSession();

        db.startTransaction();

        validate(req.body);

        const createCustomerService = new CreateCustomerService(db);
        const result = await createCustomerService.handle(req.body, { session });

        await db.commitTransaction();

        res.status(201).json(result);
    } catch (error) {
        console.log("error,", error);
        await db.abortTransaction();
        next(error);
    } finally {
        await db.endSession();
    }
};
