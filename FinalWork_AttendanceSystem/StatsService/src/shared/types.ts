interface Attendance {
    userId: string,
    startTime: string,
    endTime: string,
    date: Date,
    notes?: string
}

type ResponseAttendance = { data: Attendance[] };

export { Attendance, ResponseAttendance };