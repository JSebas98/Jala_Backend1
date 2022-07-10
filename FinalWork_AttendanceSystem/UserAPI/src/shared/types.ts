interface Attendance {
    userId?: string,
    startTime?: string,
    endTime?: string,
    date?: Date,
    notes?: string 
}

interface UserUpdate {
    id: string,
    totalAttendance: number
}


export { Attendance, UserUpdate };