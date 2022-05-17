import { File } from "./types";

export enum FileMapper {
    'A' = 0,
    'B' = 1,
    'C' = 2,
    'D' = 3,
    'E' = 4,
    'F' = 5,
    'G' = 6,
    'H' = 7
}

export function turnNumberIntoFile(number: number): File {
    const CHAR_CODE_FOR_A = 65;
    return String.fromCharCode(CHAR_CODE_FOR_A + number) as File;
}