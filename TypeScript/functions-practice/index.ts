// // Named
// function greet(name: string) {
//     return 'hello' + name;
// }

// // FUnction expression
// let greet2 = function(name: string) {
//     return 'hello' + name;
// }

// // Arrow functions
// let greet3 = (name:string) => {
//     return 'hello' + name;
// }

// // Shorthand (one line body) 
// let greet4 = (name: string) => 'hello' + name; 

// // Not recommended at all
// let greet5 = new Function('name', 'return "Hello " + name;');

// // Optional parameters - Have to be at the end
// function log(message: string, userId?: string){
//     console.log(message, userId || 'Not signed in');
// }

// // Default parameters
// function log_default(message: string, userId = 'Not signed in'){
//     console.log(message, userId);
// }

// log('User signed in', '1234');
// log('User signed in');
// log_default('User signed in');

// // Rest parameters
// function sum(numbers: number[]): number {
//     return numbers.reduce((total, n) => total + n, 0);
// }

// sum([1, 3, 2]);

// function sumVariadic(): number {
//     return Array.from(arguments)
//         .reduce((total, n) => total + n, 0);
// }

// function sumVariadicSafe(...numbers: number[]): number {
//     return numbers.reduce((total, n) => total + n, 0);
// }

// sumVariadicSafe(1, 2, 3, 4);


// function add(a: number, b: number){
//     return a + b;
// }

// add(10, 20);
// add.apply(null, [10, 20]);
// add.call(null, 10, 20);
// add.bind(null, 10, 20)();

// This
// let x = {
//     a () {
//         return this;
//     }
// }

// console.log(x.a());

// let a = x.a;
// a();

// console.log(a());

// function fancyDate(this: Date) {
//     return `${this.getDate()} / ${this.getMonth()} / ${this.getFullYear()}`;
// }

// fancyDate.call(new Date());
// fancyDate(); // Error

// Generator functions
// function* createNumbers(): IterableIterator<number> {
//     let n: number = 0;
//     while (true) {
//         yield n++;
//     }
// }

// let numbers = createNumbers();
// console.log(numbers.next());
// console.log(numbers.next());
// console.log(numbers.next());


// function* generateFibonacci(): IterableIterator<number> {
//     let n1: number = 0;
//     let n2: number = 1;
//     while (true) {
//         yield n1;
//         [n1, n2] = [n2, n1 + n2];
//     }
// }

// let fibonacciSequence = generateFibonacci();
// console.log(fibonacciSequence.next());
// console.log(fibonacciSequence.next());
// console.log(fibonacciSequence.next());
// console.log(fibonacciSequence.next());
// console.log(fibonacciSequence.next());
// console.log(fibonacciSequence.next());
// console.log(fibonacciSequence.next());
// console.log(fibonacciSequence.next());
// console.log(fibonacciSequence.next());
// console.log(fibonacciSequence.next());
// console.log(fibonacciSequence.next());
// console.log(fibonacciSequence.next());

// Iterator

// let numbers = {
//     *[Symbol.iterator]() {
//         for(let n = 1; n<=10; n++) {
//             yield n;
//         }
//     }
// }

// console.log(numbers);

// for(let a of numbers){
//     console.log(a);
// }

// // Spread iterator
// let allNumbers = [...numbers];

// // Destructure iterator
// let [one, two, ...rest] = numbers;

// Function type
// function sum(a: number, b:number): number {
//     return a + b;
// }

// // Call signature (firma de funcion)
// type myFunc = (a:number, b:number) => number;

// type Log = (message: string, userId?: string) => void;

// type Log2 = {
//     (message: string, userId?: string): void;
// }

// Overloaded functions: function with multiple call signatures

class Reservation {
    constructor(private from: Date, private to: Date | string, private destination?: string) {

    }
}

type Reserve = {
    (from: Date, to: Date, destination: string): Reservation
    (from: Date, destination: string): Reservation
}

let reserve: Reserve = (from: Date, to: Date | string, destination?: string): Reservation => {
    return new Reservation(from, to, destination);
}

let myReservation = reserve(new Date(), new Date(), 'Bogotá');
let myReservation2 = reserve(new Date(), 'Cali');
let myReservation3 = reserve(new Date(), 'Cali');