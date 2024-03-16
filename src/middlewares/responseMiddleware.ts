import { NextFunction, Request, Response } from "express";

const middleware = (request: Request, response: Response, next: NextFunction) => {
    if (response.locals.error) {
        response.status(response.locals.error.statusCode).json({ errors: response.locals.error.errors });
    } else if (response.locals.data) {
        response.status(response.locals.data.statusCode).json({ data: response.locals.data.data });
    } else {
        response.status(500).json({ errors: [{ code: 500, message: 'system encountered an error' }] });
    }
};

export default middleware;
