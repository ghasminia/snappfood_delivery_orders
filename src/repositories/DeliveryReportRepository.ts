import { Op, literal } from "sequelize";
import DeliveryReport, { IDeliveryReport } from "../models/DeliveryReport";
import { DeliveryReportStatus } from "../interfaces/enum";
import Utils from "../services/Utils";

export default class DeliveryReportRepository {
    async create(deliveryReport: Omit<IDeliveryReport, "id">): Promise<DeliveryReport> {
        const _deliveryReport = await DeliveryReport.create(deliveryReport, { raw: true });
        return _deliveryReport;
    }

    async findNotCheckedReports(orderId: number): Promise<DeliveryReport | null> {
        const deliveryReports = await DeliveryReport.findOne({
            where: {
                orderId: { [Op.eq]: orderId },
                agentId: { [Op.eq]: null },
                status: { [Op.eq]: DeliveryReportStatus.DELAY }
            },
            raw: true
        });
        return deliveryReports;
    }

    async findAssignToMe(agentId: number): Promise<DeliveryReport | null> {
        const deliveryReports = await DeliveryReport.findOne({
            where: {
                agentId: { [Op.eq]: agentId },
                status: { [Op.ne]: DeliveryReportStatus.CHECKED }
            },
            raw: true
        });
        return deliveryReports;
    }

    async findDeliveryReportAsFifoAndAssignToMe(orderId: number, agentId: number): Promise<DeliveryReport | null> {
        const deliveryReports = await DeliveryReport.findOne({
            where: {
                orderId: { [Op.eq]: orderId },
                agentId: { [Op.eq]: null },
                status: { [Op.eq]: DeliveryReportStatus.DELAY }
            },
            order: [["createdAt", "ASC"]],
            raw: true
        });

        if (deliveryReports) {
            DeliveryReport.update(
                {
                    agentId: agentId,
                    status: DeliveryReportStatus.FOLLOW_UP
                },
                { where: { id: deliveryReports.id } }
            );
        }

        return deliveryReports;
    }

    async getWeeklyDelayVendors(): Promise<DeliveryReport[] | null> {
        const deliveryReports = await DeliveryReport.findAll({
            where: {
                createdAt: { [Op.gte]: Utils.getInstance().oneWeekAgo() },
            },
            group: ["vendorId", "id"],
            order: [["createdAt", "DESC"]],
            raw: true
        });
        return deliveryReports;
    }
}
