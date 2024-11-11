/*
    Now that TypeScript recognizes the implication of the `isPerson(person)` condition,
    we can use a type-aware assertion function to make our intent even clearer.

    However, this code is still not fully type-safe. It’s possible to make 
    mistakes within the `isPerson` type guard itself. Custom type guards, 
    while powerful, operate outside of TypeScript's usual type-checking safeguards, 
    meaning TypeScript cannot verify their accuracy or alignment with the actual 
    `Person` type definition.
*/

import * as fs from "fs";
import { assert } from "tsafe";

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

    assert(isPerson(person));

    return person.age;
}
