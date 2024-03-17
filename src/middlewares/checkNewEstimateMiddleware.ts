import { NextFunction, Request, Response } from "express";
import Utils from "../services/Utils";
import { CustomError } from "../services/CustomError";

const middleware = async (request: Request, response: Response, next: NextFunction) => {
    const { order } = request.body;

    const estimatedDeliveryTime = await Utils.getInstance().getEstimatedDeliveryTime(order.id);
    if (!estimatedDeliveryTime.status) {
        return next(new CustomError(404, { code: 404, message: 'New delay estimation service is not available' }));
    }

    return next();
};

export default middleware;
