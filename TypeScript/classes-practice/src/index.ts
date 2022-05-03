import King from "./king";
import Piece from "./piece";
import Position from "./position";

class Game {}


// const king = new King('Black', 'A', 1);

// console.log(king.canMove(new Position('B', 1)));
// console.log(king.canMove(new Position('A', 1)));
// console.log(king.canMove(new Position('A', 2)));
// console.log(king.canMove(new Position('B', 2)));
// console.log(king.canMove(new Position('A', 3)));
// console.log(king.canMove(new Position('B', 3)));


// Intefaces

type Sushi = {
    calories: number,
    salty: boolean,
    tasty: boolean
}

interface Sushi2 {
    calories: number,
    salty: boolean,
    tasty: boolean
}

// "extension" of types
type Food = {
    calories: number,
    salty: boolean
}

type Sushi3 = Food & {
    salty: boolean
}

type Cake = Food & {
    sweet: boolean
}

interface Food2 {
    calories: number,
    salty: boolean
}

interface Sushi4 extends Food2 {
    salty: boolean
}

interface Cake2 extends Food2 {
    sweet: boolean
}

class Test {

}

class Test2 {

}

// Extends only one class
class Test3 extends Test {

}

type test2 = {
    name: string
}

// Multiple inheratance (types, interfaces, classes)
interface Sushi5 extends test2, Food2, Test {
    salty: boolean
}

// Types are more flexible. They allow & and |; interfaces don't
type A = number;
type B = A | string;

interface AA {
    good(x: number): string
    bad(x: number): string
}

interface BB extends AA { // Error: entension is incorrect, string and number types for bad()
    good(x: number | string): string
    bad(x: number): string
}

// Partials
interface AAA {
    good(x: number): string
}

interface AAA {
    bad(x: number): string
}

// Declaration merging
interface BBB extends AAA {
    good(x: number): string
    bad(x: number): string
}

// Implementation forces to implement methods from interfaces
class C implements BBB {
    good(x: number): string {
        throw new Error("Method not implemented.");
    }
    bad(x: number): string {
        throw new Error("Method not implemented.");
    }

}

// Interfaces can have properties
interface Animal {
    readonly name: string
    eat(food: string): void
    sleep(hours: number): void
}

interface Feline {
    meow(): void;
}

// Absctract class
abstract class Feline2 {
    abstract meow(): void
}

// Class might implement multiple interfaces and even abstract classes
class Cat implements Animal, Feline2 {
    readonly name: string
    
    constructor(){
        this.name = '';
    }

    meow(): void {
        throw new Error("Method not implemented.");
    }

    eat(food: string): void {
        throw new Error("Method not implemented.");
    }
    sleep(hours: number): void {
        throw new Error("Method not implemented.");
    }
}

