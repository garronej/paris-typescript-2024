/*
By declaring the schema validation alongside the type we end up in the same
situation as before: We can't guaranty that `isPerson` actually guards the `Person` type.  
We just made our code less error prone compared to our implementation of the `isPerson` function
without using Zod but we didn't solve the problem of having to keep in sync two different sources of truth.  
*/

import * as fs from "fs";
import { assert } from "tsafe";
import { z } from "zod";

type Person = {
    name: string;
    age: number;
};

const zPerson = z.object({
    name: z.string(),
    age: z.number()
});

function isPerson(maybePerson: unknown): maybePerson is Person {
    return zPerson.safeParse(maybePerson).success;
}

export function getAge(filePath: string): number {
    const person = JSON.parse(fs.readFileSync(filePath).toString("utf8")) as unknown;

    assert(isPerson(person));

    return person.age;
}
