// Named
function greet(name: string) {
    return 'hello' + name;
}

// FUnction expression
let greet2 = function(name: string) {
    return 'hello' + name;
}

// Arrow functions
let greet3 = (name:string) => {
    return 'hello' + name;
}

// Shorthand (one line body) 
let greet4 = (name: string) => 'hello' + name; 

// Not recommended at all
let greet5 = new Function('name', 'return "Hello " + name;');

// Optional parameters - Have to be at the end
function log(message: string, userId?: string){
    console.log(message, userId || 'Not signed in');
}

// Default parameters
function log_default(message: string, userId = 'Not signed in'){
    console.log(message, userId);
}

log('User signed in', '1234');
log('User signed in');
log_default('User signed in');

// Rest parameters
function sum(numbers: number[]): number {
    return numbers.reduce((total, n) => total + n, 0);
}

sum([1, 3, 2]);

function sumVariadic(): number {
    return Array.from(arguments)
        .reduce((total, n) => total + n, 0);
}

function sumVariadicSafe(...numbers: number[]): number {
    return numbers.reduce((total, n) => total + n, 0);
}

sumVariadicSafe(1, 2, 3, 4)


function add(a: number, b: number){
    return a + b;
}

add(10, 20);
add.apply(null, [10, 20]);
add.call(null, 10, 20);
add.bind(null, 10, 20);