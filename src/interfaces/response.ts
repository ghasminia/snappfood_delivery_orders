interface IError {
    code: number,
    message: string,
    meta: object
}

export interface ICustomError {
    statusCode: number,
    errors: Array<IError>
}

export interface IResponse {
    statusCode: number,
    data: object
}
