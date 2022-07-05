export class BaseError extends Error {
    
    constructor(
        public statusCode: number,
        public message: string,
        public description: string) {
            super(message);
            this.statusCode = statusCode;
            this.name = this.constructor.name;
            this.description = description;
    }
}