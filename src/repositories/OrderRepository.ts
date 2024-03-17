import Order from "../models/Order";

export default class OrderRepository {
    async findById(orderId: number): Promise<Order | null> {
        const order: any = await Order.findByPk(orderId, { raw: true });
        return order;
    }
}
