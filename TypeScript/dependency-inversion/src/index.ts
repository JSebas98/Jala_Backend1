import { Lamp } from "../lamp";
import Button from '../button';

let lamp: Switcheable = new Lamp();

let button = new Button(lamp);

button.onButtonListener(false);
button.onButtonListener(true);
button.onButtonListener(true);