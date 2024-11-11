Two main criticisms of TypeScript:

1. TypeScript gets in my way of doing things. It slows me down.
2. TypeScript is not really type-safe, it's just glorified auto-completion.  
   You can always cast to `any` and get around the type system.

Those two point are linked to one another.
The first frustration comes from the fact that there are things you know are
true but TypeScript is not aware of so you end up using `any` or `!` to get around
the problem and move on.

But because you know that you've done it in some place now all your trust in the
type system is gone and you start seeing it as mere suggestions rather than
guarantees.

In this talk I'll argue that the use of carefully crafted utilities leveraging the
`assert` and `is` TypeScript keyword can significantly mitigate those issues.

So let me show you a few practical examples of how you can leverage the `asserts`
keyword through generic utility functions.

The focus here is not to go through the details of the implementation of the utilities
I'm going to show you. If you are curious I've gathered them into a NPM module
called [tsafe](https://github.com/garronej/tsafe), you can check it out.

To be clear, this talk is not about selling you `tsafe` you can very well prefer
to copy paste the implementation of the utilities in your project.

So before jumping into the examples let's see what the `asserts` keyword is.

```ts
/*
function assert(condition: any, msg?: string) {
    if (!condition) {
        throw new Error(msg ?? "Assertion failed");
    }
}
*/

function assert(condition: any, msg?: string): asserts condition {
    if (!condition) {
        throw new Error(msg);
    }
}

declare const x: string | undefined;

assert(x !== undefined);

x.toUpperCase();
```

So in a word, when you call a function that has a return type of `asserts condition`
typescript will know that if the function doesn't throw an error then the condition
is truthy.

Let's see how this alone can help us get rid of all the !

```ts
import { assert } from "tsafe/assert";

type Shape = {
    type: "circle" | "square";
    radius?: number;
    sideLength?: number;
};

function getArea(shape: Shape): number {
    switch (shape.type) {
        case "circle":
            assert(shape.radius !== undefined);
            return Math.PI * shape.radius ** 2;
        case "square":
            assert(shape.sideLength !== undefined);
            return shape.sideLength ** 2;
    }
}
```

If you pick up the habit of asserting things you know should be true everywhere
the type system can't structurally enforce it. Your code will be much easier to
reason about and when runtime errors actually occurs it will be so much easier to
track down the source of the problem.  
Instead of having an obscure `undefined is not a function` error you'll have a
clear line pointing to the wrong assumption you've made about the system.

Now let's see another primitive that can be combined with `assert` to do super useful
things: `is` or user-defined type guards.

```ts
type Person = {
    name: string;
    age: number;
};

function isPerson(x: any): x is Person {
    return (
        typeof x === "object" &&
        x !== null &&
        "name" in x &&
        typeof x.name === "string" &&
        "age" in x &&
        typeof x.age === "number"
    );
}

declare const maybePerson: unknown;

if (isPerson(maybePerson)) {
    // TypeScript knows that maybePerson is a Person
}

// Now combined we can do

assert(isPerson(maybePerson));
```
