import { NextFunction, Request, Response } from "express";
import { ValidationError } from "express-json-validator-middleware";
import { BaseError } from "./baseError";

function handleError(
    err: BaseError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    let code: number = err.statusCode || 500;
    res.status(code).json({
        message: err.message || 'Internal server error.',
        description: err.description || 'Oops! Something went bad.'
    });
}

export default handleError;