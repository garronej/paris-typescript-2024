/*
    We could add a type annotation to the `zPerson` declaration to indicate that it 
    should validate the `Person` type. However, this doesn't fully solve our problem, 
    as the schema can still enforce additional properties that are not part of `Person`.

    For example, in this case, the schema incorrectly enforces a `notInPerson` property, 
    and we receive no type error, allowing an unintended discrepancy between the schema 
    and the `Person` type.

    Ideally, we want a type-level assertion that guarantees the inferred type of our schema 
    matches the `Person` type exactly. This would ensure our schema aligns perfectly with 
    our intended type definition, preventing mismatches.
*/

import * as fs from "fs";
import { assert } from "tsafe";
import { z } from "zod";

type Person = {
    name: string;
    age: number;
};

const zPerson: z.ZodType<Person> = z.object({
    name: z.string(),
    age: z.number(),
    notInPerson: z.string()
});

function isPerson(maybePerson: unknown): maybePerson is Person {
    return zPerson.safeParse(maybePerson).success;
}

export function getAge(filePath: string): number {
    const person = JSON.parse(fs.readFileSync(filePath).toString("utf8")) as unknown;

    assert(isPerson(person));

    return person.age;
}
