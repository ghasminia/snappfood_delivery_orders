import { NextFunction, Request, Response } from "express";

const middleware = (request: Request, response: Response, next: NextFunction) => {
    const { data, statusCode } = response.locals;
    
    if (data) {
        return response.status(statusCode).json({ data });
    } 
    
    return response.status(500).json({ errors: [{ code: 500, message: 'system encountered an error' }] });
};

export default middleware;
