# Asserting your way to type safety

Context: [Paris TypeScript Meetup](https://www.meetup.com/paris-typescript/events/303407468/?eventOrigin=group_upcoming_events)  
Author: [u/garronej](https://github.com/garronej)

Two common criticisms of TypeScript:

1. TypeScript slows down development by getting in the way.
2. TypeScript isn’t truly type-safe; it’s just glorified auto-completion. You can always cast to `any` and bypass the type system.

My perspective:

These concerns can be greatly alleviated by taking advantage of TypeScript's utilities, such as type-aware assertion functions (`asserts condition`) and user-defined type guards (`condition is Type`), to reinforce type safety effectively.

[Go to Slide 1](/src/slide1.ts)
