import { NextFunction, Request, Response } from "express";
import { CustomError } from "../services/CustomError";
import DeliveryReportRepository from "../repositories/DeliveryReportRepository";

const deliveryReportRepository = new DeliveryReportRepository();

const middleware = async (request: Request, response: Response, next: NextFunction) => {
    const { agentId } = request.body;

    const checkStatusReport = await deliveryReportRepository.findAssignToMe(agentId);    
    if (checkStatusReport) {
        return next(new CustomError(400, { code: 400, message: "You have not checked report" }));
    }

    return next();
};

export default middleware;
