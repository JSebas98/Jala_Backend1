import { AllowedSchema, Validator } from 'express-json-validator-middleware';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);

export const attendanceSchema: AllowedSchema = {
    "$id":"/Attendance",
    "type":"object",
    "properties":{
        "userId":{ "type":"string" },
        "startTime":{ "type":"string" },
        "endTime":{ "type":"string" },
        "date": { "type":"string" },
        "notes": { "type":"string" }
    },
    "required": ["userId", "startTime", "endTime", "date"]
};

export const { validate } = new Validator({ allErrors: true });