import { Switcheable } from "./switcheable";

export default class Button {
    constructor(private lamp: Switcheable) {

    }

    onButtonListener(status: boolean): void {
        status ? this.lamp.turnOn() : this.lamp.turnOff();
    }
}