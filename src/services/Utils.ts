import axios from 'axios';
import Config from '../config/config';

export default class Utils {
    private static instance: Utils;

    private constructor() { }

    static getInstance(): Utils {
        if (!Utils.instance) {
            Utils.instance = new Utils();
        }
        return Utils.instance;
    }
    async getEstimatedDeliveryTime(orderId: string) {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${Config.url.estimatedDelivery}?order_id=${orderId}`
        };

        const result = await axios.request(config).catch((error) => {
            return { status: false };
        });

        if (result.status !== 200) {
            return { status: false };
        }

        return { status: true, data: result.data };
    }

    enumToValues(enumObject: any): string[] {
        return Object.values(enumObject).filter((value) => typeof value === 'string') as string[];
    }

    oneWeekAgo(): Date {
        const date = new Date();
        date.setDate(date.getDate() - 7);
        return date;
    }
}
