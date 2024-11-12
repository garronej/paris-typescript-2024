/*
    Now let’s explore how we can combine type-aware assertions (`assert condition`)
    and user-defined type guards (`maybePerson is Person`) to create a generic utility 
    that enhances type safety and makes our code’s intent clearer.

    - Currently, there’s no guarantee that `getAge` will actually return a number, 
      since the type system isn’t enforcing that the parsed object truly matches 
      the `Person` type. 

    => Type system is compromised.
*/

import * as fs from "fs";

type Person = {
    name: string;
    age: number;
};

export function getAge(personJsonFilePath: string): number {
    const person = JSON.parse(fs.readFileSync(personJsonFilePath, "utf8")) as Person;

    return person.age;
}
