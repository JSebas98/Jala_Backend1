import { Switcheable } from "./switcheable";

export class Lamp implements Switcheable {
    turnOn(): void {
        console.log("Lamp is on!");
    }
    
    turnOff(): void {
        console.log("Lamp is off!");
    }
}