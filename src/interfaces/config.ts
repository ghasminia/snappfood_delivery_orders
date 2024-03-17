export default interface IConfig {
    app: {
        port: number,
        host: string
    },
    db: {
        type: string,
        host: string,
        port: number,
        username: string,
        password: string,
        database: string
    },
    url: {
        estimatedDelivery: string
    }
}
