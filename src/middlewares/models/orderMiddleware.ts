import { NextFunction, Request, Response } from "express";
import OrderRepository from "../../repositories/OrderRepository";
import { CustomError } from "../../services/CustomError";

const orderRepository = new OrderRepository();
const middleware = async (request: Request, response: Response, next: NextFunction) => {
    const orderId = request.params.orderId || request.body.orderId;

    if (!orderId) {
        return next(new CustomError(400, { code: 400, message: 'orderId is required' }));
    }

    const order = await orderRepository.findById(parseInt(orderId));
    if (!order) {
        return next(new CustomError(404, { code: 404, message: 'order not found' }));
    }    

    request.body.order = order;
    return next();
};

export default middleware;
