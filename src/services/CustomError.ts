export interface ErrorObject {
    code: number,
    message?: string,
    meta?: any
}

export class CustomError extends Error {
    status: number;
    error: ErrorObject

    constructor(
        status: number,
        error: ErrorObject
    ) {
        super();
        this.status = status;
        this.error = error;
    }
}

export class CustomErrorList extends Error {
    status: number;
    errors: ErrorObject[]

    constructor(
        status: number,
        errors: ErrorObject[]
    ) {
        super();
        this.status = status;
        this.errors = errors;
    }
}
