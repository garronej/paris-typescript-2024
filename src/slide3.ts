/*
    This is where assertion functions come in. Using `assert(condition)` 
    serves the same purpose as a direct `if` check, but it conveys an assumption about 
    our system that we expect to always hold true.

    The downside here is that by moving the condition into a separate function, 
    we lose TypeScript’s ability to infer types based on control flow. Specifically, 
    TypeScript can't narrow down the type of `alice` from `Person | undefined` 
    to `Person` after the assertion, since it doesn't "see" the condition inline.
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
