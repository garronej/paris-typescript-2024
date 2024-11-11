/*
    This is where the `asserts` keyword proves useful. By marking our `assert` function 
    with `asserts condition`, we signal to TypeScript that if this function completes without 
    throwing an error, the specified condition can be assumed true.

    This guarantees that `getAliceAge` will never return an incorrect type. Even if our 
    assumption about "Alice" being in `persons` is wrong, we'll encounter a runtime error 
    at the assertion, pinpointing precisely where our assumption failed. This approach 
    makes debugging easier and guarantee the `getAliceAge` isn't lying about it's return type.
*/

const persons = [
    { name: "Alice", age: 42 },
    { name: "Bob", age: 43 }
];

export function getAliceAge(): number {
    const alice = persons.find(person => person.name === "Alice");

    assert(alice !== undefined);

    return alice.age;
}

function assert(condition: any): asserts condition {
    if (!condition) {
        throw new Error("Assertion failed: assumption about system state was incorrect");
    }
}
