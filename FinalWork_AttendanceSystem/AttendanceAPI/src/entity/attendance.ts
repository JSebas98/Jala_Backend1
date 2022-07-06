export class Attendance {
    constructor(
        private _id: string,
        private _userId: string,
        private _startTime: string,
        private _endTime: string,
        private _date: Date,
        private _notes: string
    ) {}

    get id() {
        return this._id;
    }

    get userId() {
        return this._userId;
    }

    get startTime() {
        return this._startTime;
    }

    get endTime() {
        return this._endTime;
    }

    get date() {
        return this._date;
    }

    get notes() {
        return this._notes;
    }
}