/*
    Assuming `isPerson` is implemented correctly, we can be confident that `getAge` 
    will return a `number`.

    However, TypeScript doesn’t currently recognize that when `isPerson(person)` 
    evaluates to `true`, `person` can be safely treated as a `Person` type.
*/

import * as fs from "fs";

type Person = {
    name: string;
    age: number;
};

function isPerson(maybePerson: unknown): boolean {
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
