/*
    Zod is a widely used library for runtime type validation in TypeScript, 
    which we can leverage to safely implement a type guard for `Person`.

    However, using Zod in this way replaces our original `Person` type definition.
    Now, `Person` is inferred from the Zod schema, which feels somewhat counterintuitive; 
    ideally, the type definition would be the primary source of truth, with validation 
    derived from it. Zod schemas, as clever as the API is are inherently less intuitive to write
    and to reason about than plain type definitions.
    It might not be immediately apparent on such a simple example but on more complex type definitions
    the difference is more noticeable.

    Additionally, not all types in our codebase require validation, as not all data comes 
    from untrusted sources. Maintaining a mix of Zod-derived types for validated data 
    and TypeScript types for trusted data can lead to inconsistencies and reduced clarity.
*/
import * as fs from "fs";
import { assert } from "tsafe";
import { z } from "zod";

const zPerson = z.object({
    name: z.string(),
    age: z.number()
});

type Person = z.infer<typeof zPerson>;

function isPerson(maybePerson: unknown): maybePerson is Person {
    return zPerson.safeParse(maybePerson).success;
}

export function getAge(filePath: string): number {
    const person = JSON.parse(fs.readFileSync(filePath).toString("utf8")) as unknown;

    assert(isPerson(person));

    return person.age;
}
