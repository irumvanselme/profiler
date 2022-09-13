const name = "dd";
let b = [10, 20, 30];

let a = Object.freeze({
    name,
    [Symbol.iterator]: function* () {
        yield* b
    }
})


console.log(a)