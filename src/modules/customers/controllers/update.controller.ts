import { db } from "@src/database/database.js";
import { NextFunction, Request, Response } from "express";
import { ReadCustomerService } from "../services/read.service.js";
import { UpdateCustomerService } from "../services/update.service.js";

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {

    if (Object.keys(req.body).length == 0) {
      return res.status(422).json({
        code: 422,
        status: "Unprocessable",
        message: "Unprocessable Entity",
        errors: {
          name: ["name is required"]
        }
      });
    }

    const session = db.startSession();

    db.startTransaction();

    let rcs = new ReadCustomerService(db);

    const customer = await rcs.handle(req.params.id, {
      restrictedFields: ["password"],
    });

    console.log(customer, "result2");

    if (customer && customer['code'] == req.body['code'] && customer['name'] == req.body['name']) {
      return res.status(422).json({
        code: 422,
        status: "Unprocessable Entity",
        message: "The request was well-formed but was unable to be followed due to semantic errors.",
        errors: {
          code: ["code is exists"],
          name: ["name is exists"],
        }
      });
    }

    const updateCustomerService = new UpdateCustomerService(db);
    const result = await updateCustomerService.handle(req.params.id, req.body, session);

    await db.commitTransaction();

    res.status(204).json(result);
  } catch (error) {
    await db.abortTransaction();
    next(error);
  } finally {
    await db.endSession();
  }
};
