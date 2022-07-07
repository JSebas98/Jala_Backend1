import { Attendance } from "../shared/types";

export class UserDomain {
    constructor(
        private _id: string,
        private _name: string,
        private _nickname: string,
        private _totalAttendance: number,
        private _attendances?: Attendance[]
    ) {}

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get nickname() {
        return this._nickname;
    }

    get totalAttendance() {
        return this._totalAttendance
    }

    get attendances() {
        return this._attendances;
    }

    set attendances(attendances: Attendance[] | undefined) {
        this._attendances = attendances;
    }

    set totalAttendance(newAttendances: number) {
        this._totalAttendance += newAttendances;
    }
}