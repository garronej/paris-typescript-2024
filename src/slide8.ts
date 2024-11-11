/*
By labeling the `isPerson` function as a type guard for the `Person` type (using the `is` keyword),
we let TypeScript know that when `isPerson(person)` evaluates to `true`, `person` can be safely treated as a `Person` type.

We get rid of the type error.  
*/

import * as fs from "fs";

type Person = {
    name: string;
    age: number;
};

function isPerson(maybePerson: unknown): maybePerson is Person {
    return (
        typeof maybePerson === "object" &&
        maybePerson !== null &&
        "name" in maybePerson &&
        typeof (maybePerson as Person).name === "string" &&
        "age" in maybePerson &&
        typeof (maybePerson as Person).age === "number"
    );
}

export function getAge(filePath: string): number {
    const person = JSON.parse(fs.readFileSync(filePath).toString("utf8")) as unknown;

    if (!isPerson(person)) {
        throw new Error("Invalid person");
    }

    return person.age;
}
