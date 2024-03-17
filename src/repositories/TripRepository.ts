import { Op } from 'sequelize';
import Trip from "../models/Trip";
import { TripStatus } from "../interfaces/enum"

export default class TripRepository {
    async getEstimatedDeliveryTime(orderId: number): Promise<Trip | null> {
        const trip = await Trip.findOne({
            where: {
                orderId,
                status: { [Op.in]: [TripStatus.ASSIGNED, TripStatus.VENDOR_AT, TripStatus.PICKED] }
            },
            raw: true
        });
        return trip;
    }

    async create(trip: Omit<Trip, "id">): Promise<Trip> {
        const _trip = await Trip.create(trip, { raw: true });;
        return _trip;
    }
}
