// bind() returns a bound function that, when executed later,
//will have the correct context ("this") for calling the
// original function.

function list(...numbers: number[]): number[] {
    return Array.from(numbers);
}

let list1 = list(1, 2, 3);

// Using bind
let bound_list = list.bind(null, 4, 5, 6); // Copies list() and assigns initial parameters 4, 5, 6
let list2 = bound_list();
let list3 = bound_list(1, 2, 3, 4, 5);
let list4 = bound_list(1, 2, 3, 4, 5);