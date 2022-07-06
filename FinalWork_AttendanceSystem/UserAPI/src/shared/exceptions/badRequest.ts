import { BaseError } from './baseError';

export class BadRequest extends BaseError {
    constructor(public description: string) {
        super(400, 'Bad request', description);
    }
}