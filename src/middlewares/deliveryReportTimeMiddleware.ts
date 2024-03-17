import { NextFunction, Request, Response } from "express";
import { CustomError } from "../services/CustomError";

const middleware = async (request: Request, response: Response, next: NextFunction) => {
    const { order } = request.body;

    if (order.delivery_time > new Date()) {
        return next(new CustomError(400, { code: 400, message: "Order delivery_time is less than now" }));
    }

    return next();
};

export default middleware;
