import { Request, Response, NextFunction } from "express";
import TripRepository from "../repositories/TripRepository";
import Utils from "../services/Utils";
import DeliveryReportRepository from "../repositories/DeliveryReportRepository";
import { DeliveryReportStatus } from "../interfaces/enum";
import { IDeliveryReport } from "../models/DeliveryReport";
import { CustomError } from "../services/CustomError";

const tripRepository = new TripRepository();
const deliveryReportRepository = new DeliveryReportRepository();

export default class ApiController {
    async createDelayForOrder(request: Request, response: Response, next: NextFunction): Promise<void> {
        const { order } = request.body;

        const checkTripStatus = await tripRepository.getEstimatedDeliveryTime(order.id);
        let nextDeliveryTime;
        if (checkTripStatus) {
            const estimatedDeliveryTime = await Utils.getInstance().getEstimatedDeliveryTime(order.id);
            if (estimatedDeliveryTime.status) {
                nextDeliveryTime = estimatedDeliveryTime.data?.etc;
            }
        }

        const newDeliveryReport: IDeliveryReport = {
            orderId: order.id,
            vendorId: order.vendorId,
            status: DeliveryReportStatus.DELAY,
            tripRecord: true
        };

        const deliveryReports = await deliveryReportRepository.create(newDeliveryReport).catch((error) => {
            return next(new CustomError(400, { code: 400, message: error.message }));
        });

        response.locals = {
            statusCode: 200,
            data: {
                deliveryReportId: deliveryReports?.id,
                vendorId: order.vendorId
            }
        };

        if (nextDeliveryTime) {
            response.locals.data.nextDeliveryTime = nextDeliveryTime;
        }

        return next();
    }


    async assignOrderToEmployeeForReview(request: Request, response: Response, next: NextFunction): Promise<void> {
        const { order, agentId } = request.body;

        const deliveryReportAsFifo = await deliveryReportRepository.findDeliveryReportAsFifoAndAssignToMe(order.id, agentId);
        if (!deliveryReportAsFifo) {
            return next(new CustomError(400, { code: 400, message: "There are no reports to assign you" }));
        }

        response.locals = {
            statusCode: 200,
            data: {
                deliveryReportId: deliveryReportAsFifo.id,
                vendorId: order.vendorId
            }
        };

        return next()
    }

    async getReportWeeklyDelayVendors(request: Request, response: Response, next: NextFunction): Promise<void> {
        const weeklyDelayVendors = await deliveryReportRepository.getWeeklyDelayVendors();
        response.locals = {
            statusCode: 200,
            data: weeklyDelayVendors
        };

        return next()
    }
}
