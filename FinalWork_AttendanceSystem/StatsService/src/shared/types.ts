interface Attendance {
    userId: string,
    startTime: string,
    endTime: string,
    date: Date,
    notes?: string
}

type ResponseAttendance = { data: Attendance[] };

interface MessageReceived {
    event: string,
    userId: string
}

interface UserUpdate {
    id: string,
    totalAttendance: number
}

export { Attendance, ResponseAttendance, MessageReceived, UserUpdate };