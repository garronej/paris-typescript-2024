/*

We can split up the single assert statement into two separate statements:
1. A runtime validation with no type level narrowing.
2. A type level assertion with no guarantee for it to be true at runtime but that will narrow down the type of `person` to `Person`.

*/

import * as fs from "fs";
import { assert, is, type Equals } from "tsafe";
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

    assert(zPerson.safeParse(person).success); // Runtime validation ( with no type level narrowing )
    assert(is<Person>(person)); // Type level assertion ( with no guarantee for it to be true at runtime )

    return person.age;
}
