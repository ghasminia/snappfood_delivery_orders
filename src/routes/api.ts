import express from 'express';
import ApiController from '../controllers/ApiController';
import deliveryReportTimeMiddleware from '../middlewares/deliveryReportTimeMiddleware';
import deliveryReportNotCheckMiddleware from '../middlewares/deliveryReportNotCheckMiddleware';
import deliveryReportNotAssignMeMiddleware from '../middlewares/deliveryReportNotAssignMeMiddleware';
import orderMiddleware from '../middlewares/models/orderMiddleware';

const router = express.Router()
const apiController = new ApiController()

router
    .post("/orders/:orderId/delay",
        orderMiddleware,
        deliveryReportTimeMiddleware,
        deliveryReportNotCheckMiddleware,
        apiController.createDelayForOrder
    )
    .post("/orders/:orderId/assign-employee",
        orderMiddleware,
        deliveryReportNotAssignMeMiddleware,
        apiController.assignOrderToEmployeeForReview
    )
    .get("/vendors/reports/weekly", apiController.getReportWeeklyDelayVendors)

export default router
