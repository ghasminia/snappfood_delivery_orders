import { Request, Response, NextFunction } from "express";
import { CustomError, CustomErrorList } from "../services/CustomError";

const middleware = (
    error: CustomError | CustomErrorList,
    request: Request,
    response: Response,
    next: NextFunction
) => {

    if (error instanceof CustomError) {
        return response.status(error.status).json({
            errors: [error.error]
        });
    }

    if (error instanceof CustomErrorList) {
        return response.status(error.status).json({
            errors: error.errors
        });
    }

};

export default middleware;
