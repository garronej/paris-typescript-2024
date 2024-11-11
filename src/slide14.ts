/*
This single assert statement has two purpose:
1. It ensures that that the `person` object is actually of type `Person` at runtime.
2. It let TypeScript know that we can safely narrow down the type
   of `person` from `unknown` to `Person` after the `assert` statement.

However, this assert statement can still appear a bit cryptic to anyone
not familiar to your utilities.  
*/

import * as fs from "fs";
import { assert, type Equals, typeGuard } from "tsafe";
import { z } from "zod";

type Person = {
    name: string;
    age: number;
};

const zPerson = z.object({
    name: z.string(),
    age: z.number()
});

assert<Equals<z.infer<typeof zPerson>, Person>>;

export function getAge(filePath: string): number {
    const person = JSON.parse(fs.readFileSync(filePath).toString("utf8")) as unknown;

    assert(typeGuard<Person>(person, zPerson.safeParse(person).success));

    return person.age;
}
