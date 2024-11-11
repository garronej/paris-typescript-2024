/*
    A naive solution would involve checking if "Alice" exists in the `persons` array 
    and throwing an error if she doesn’t.

    While this approach works, it can obscure the intentionality behind our code. 
    Explicit error throwing is generally reserved for situations where we know 
    something can possibly go wrong.

    In this case, however, we are making a strong assumption: "Alice" should always be in 
    the `persons` array. If she isn't, it points to a deeper issue with our code that 
    needs addressing upstream, rather than a runtime error to handle here.
*/

const persons = [
    { name: "Alice", age: 42 },
    { name: "Bob", age: 43 }
];

export function getAliceAge(): number {
    const alice = persons.find(person => person.name === "Alice");

    if (alice === undefined) {
        throw new Error("Alice not found");
    }

    return alice.age;
}
