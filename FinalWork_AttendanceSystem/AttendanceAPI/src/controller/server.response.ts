import { Response } from 'express';

export class ServerResponse {
    static success<T>(res: Response, data?: T, message?: string) {
        res.status(200).json({data, message});
    }

    static created<T>(res: Response, data?: T, message?: string) {
        res.status(201).json({data, message});
    }
}