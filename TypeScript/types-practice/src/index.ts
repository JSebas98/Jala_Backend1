// Any
// let a: any = 30;
// let b: any = "Hello";
// let c = a + b;

// Unknown
// let a: unknown = 30;
// let b: unknown = [1, 2, 3]

//Boolean

// Literal

// Number

//Bigint
// let twoMillion = 2_000_000;
// let a = 132n;

// Strings
// let a = 'test';
// let b = 'test2';

// const c = '!';

// let d = a + ' ' +  b + c;

// let e: string = 'zoom';

// let f: 'literal' = 'literal';

// Symbol
// let a = Symbol('a');
// let b: symbol = Symbol('b');
// let a2 = Symbol('a');
// let c = a === a2;
//let d = a + 3;

// const e = Symbol('e');
// const f: unique symbol = Symbol('f');
// const g: unique symbol = Symbol('f');

// let i = e === f;

// Objects
// let a: object = {
//     b: 'x'
// };

// // a.b;

// let b = {
//     c: {
//         d: 'f'
//     }
// }

// b.c.d;

// let c: {b: number} = {
//     b: 2
// };

// c.b;

// let d: {
//     firstName: string,
//     lastName: string
// } = {
//     firstName: 'pedro',
//     lastName: 'perez'
// }

// class Person {
//     constructor(
//         public firstName: string,
//         public lastName: string,
//     ){}
// }

// d = new Person('pedro', 'perez');

// let e = new Person('carlos', 'martinez');

// let i;

// let j = i * 2;
// let a: {
//     b:number,
//     c?: string,
//     [key: number]: boolean
// };

// a = {
//     b: 23,
//     10: true,
//     20: true,
//     25: false
// }

// let tickets: {
//     [seatNumber: string]: string
// } = {
//     'e21': 'pedro',
//     'f23': 'carlos'
// }

// TYpe alias
// type Age = number;

// type Person = {
//     name: string,
//     age: Age
// }

// let age: Age = 55;

// let person: Person = {
//     name: "Sebastian",
//     age: age
// };

// type Age = string; Error duplicate

// Union and Intersection
// type Cat = { name: string, purrs: boolean };
// type Dog = { name: string, barks: boolean, wags: boolean };

// type CatOrDogOrBoth = Cat | Dog;
// type CatAndDog = Cat & Dog;

// let animal: CatOrDogOrBoth = {
//     name: "Tomás",
//     purrs: true
// }

// animal = {
//     name: "Paco",
//     barks: true,
//     wags: false
// }

// animal = {
//     name: "Tomás",
//     purrs: true,
//     barks: true,
//     wags: false
// }

// let b: CatAndDog = {
//     name: "CatDog",
//     purrs: true,
//     barks: false,
//     wags: true
// }

// Arrays
// let a: number[] = [1, 2];
// let b: string[] = ['1', '2']
// type MixedArray = (string | number) [];
// let c: MixedArray = [1, 'a']

// c.map(_ => {
//     if(typeof _ === 'number') {
//         return _ * 3;
//     }
//     return _.toUpperCase();
// });

// function buildArray(): (string | number | boolean)[]
// {
//     let a = [];
//     a.push(1);
//     a.push('1');

//     return a;
// }

// let myArray: (string | number | boolean)[] = buildArray();
// myArray.push('test')
// myArray.push(true)

// Tuples
// let a: [number] = [2];
// // a = [2, 3, 4]; // Error
// // a = []; // Error
// let b: [string, string, number] = ['test', 'test', 1998];
// b = ['Hola', 'Mundo', 1998]

// let trainFares: [number, number?][] = [
//     [3.75],
//     [8.5, 7.7],
// //    [1.2, 3.6, 3.2] // Error extra number
// ];

// // Tuples with min elems, but infinite max elems
// let names: [string, ...string[]] = ["Sebas"];
// names = ['Sara', 'Pepe', 'Carlos'];
// // names = []; // Error empty

// let list: [number, boolean, ...string[]] = [5, true];
// list = [3, false, 'Carla', 'Operadora']

// Read Only Array
// let as: readonly number[] = [1, 2, 3]; // Const blocks assignations, not mutation
// // as.push(8); // Error
// as = [5];

// let bs: readonly number[] = as.concat(4); // Concat copies as and adds a 4

// let copied = as.slice();
// copied[0] = 100;

// function c(): void {
//     let r = 2 + 1;
// }

// function d(): never{
//     throw TypeError('Always Error');
// }

// d();

// function e(): never {
//     while (true){

//     }
// }

// e();

// Enums
enum Language {
    English = 0,
    Spanish = 1
}

enum Language { // Enums can be "divided"
    Russian = 2
}

let testEnum = Language.Spanish;
let secondTestEnum = Language['English'];
let thirdTestEnum = Language.Russian;

enum Language2 {
    English = 100,
    Spanish = 200 + 300,
    Russian
}

let russian = Language2.Russian;

enum Color {
    Red = '0x2154',
    blue = '#0x6454',
    Pink = 0xc1005,
    White = 255
}

let red = Color['Red'];