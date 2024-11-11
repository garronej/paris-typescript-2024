/*
By combining utilities leveraging the `extends` keyword we can write a 
type level assertion that gives us a compile time error if two given types are not equal.

By introducing such an assertion we can now confidently treat the type definition of `Person`
as our source of truth since if we ever update it we'll get a TypeScript error notifying us that
the schema validation is out of sync.  

Now this code is fully safe however we can still improve on it.  
Having to to explicitly define `isPerson` seem a bit boilerplaty.  
If we are to generalize this pattern we'd end up declaring a lot of similar functions that
have nothing specific to the type they are guarding.  

We'd like to to be able to inline the type guard logic directly in the `getAge` function.
*/

import * as fs from "fs";
import { assert, type Equals } from "tsafe";
import { z } from "zod";

type Person = {
    name: string;
    age: number;
};

const zPerson = z.object({
    name: z.string(),
    age: z.number()
});

// We will get a type error if
// `z.infer<typeof zPerson>`
// is different from `Person`
assert<Equals<z.infer<typeof zPerson>, Person>>;

function isPerson(maybePerson: unknown): maybePerson is Person {
    return zPerson.safeParse(maybePerson).success;
}

export function getAge(filePath: string): number {
    const person = JSON.parse(fs.readFileSync(filePath).toString("utf8")) as unknown;

    assert(isPerson(person));

    return person.age;
}
