import { NextFunction, Request, Response } from "express";
import OrderRepository from "../../repositories/OrderRepository";
import { CustomError } from "../../services/CustomError";

const orderRepository = new OrderRepository();
const middleware = async (request: Request, response: Response, next: NextFunction) => {
    const agentId = request.params.agentId || request.body.agentId;

    if (!agentId) {
        return next(
            new CustomError(400, { code: 400, message: "agentId is required" })
        );
    }

    const agent = await orderRepository.findById(parseInt(agentId));
    if (!agent) {
        return next(
            new CustomError(404, { code: 404, message: "agent not found" })
        );
    }

    request.body.agent = agent;
    return next();
};

export default middleware;
