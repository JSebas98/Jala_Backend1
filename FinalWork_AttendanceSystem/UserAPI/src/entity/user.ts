import { UserProps } from "../shared/types";

export class UserDTO {
    
    private _id: string;
    private _name: string;
    private _nickname: string;
    private _totalAttendance: number;


    constructor(private props: UserProps) {
        this._id = props.id;
        this._name = props.name;
        this._nickname = props.nickname;
        this._totalAttendance = props.totalAttendance;
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get nickname(): string {
        return this._nickname;
    }

    public get totalAttendance(): number {
        return this._totalAttendance;
    }
}