/*
In most implementations of `assert`, you can optionally provide an error message that will be assigned to the runtime
error if the condition is not met.

However, it’s often better not to provide a specific error message. Assertion errors indicate a bug in your code, not
something the end-user should be able interpret. The most valuable information in an assertion error is usually
the line number where it was triggered, pointing you directly to the issue.

Since assertion messages are generally intended for your future self or fellow developers, they don’t need to rely on
runtime values. Most `assert` statements are self-explanatory, making additional context unnecessary. When extra context
is helpful, it can be provided in a comment above the `assert` statement, rather than within a runtime message.

The only valid reason to include a custom error message is when it provides specific runtime details that will help you
diagnose the precise instance of the assertion failure.
*/

const persons = [
    { name: "Alice", age: 42 },
    { name: "Bob", age: 43 }
];

export function getPersonAge(name: "Alice" | "Bob"): number {
    const alice = persons.find(person => person.name === name);

    assert(
        alice !== undefined,
        () => `${name} not found in among ${persons.map(({ name }) => name).join(", ")}`
    );

    return alice.age;
}

function assert(condition: any, message?: () => string): asserts condition {
    if (!condition) {
        throw new Error(message?.() ?? "Wrong assumption");
    }
}
