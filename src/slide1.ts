/*
    We use `?` and `!` operators here to bypass type errors, assuming that the `persons` array
    will always include an entry for "alice". 
    We feel that we can do that because we know for a fact that the persons array should have an Alice entry. 
    If this assumption proves false, it indicates a logic issue 
    that needs to be resolved upstream rather than handled at runtime.

    However, human errors are possible. For instance, we might inadvertently rename "Alice" to "alice"
    within the `persons` array without updating the `getAliceAge` function accordingly.

    If this happens, `getAliceAge`—intended to return a `number`—would return `undefined`. This breaks 
    the type system, potentially causing runtime errors elsewhere in the application, which would 
    be difficult to trace back to our initial assumption about the `persons` array in `getAliceAge`.
*/

const persons = [
    { name: "Alice", age: 42 },
    { name: "Bob", age: 43 }
];

export function getAliceAge(): number {
    const alice = persons.find(person => person.name === "Alice");

    return alice?.age!;
}
