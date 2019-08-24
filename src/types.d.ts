import ZSchema from 'z-schema';
declare module 'z-schema' {
  /**
   * #DeclareExtendZSchemaTypings
   *
   * TODO: Figure out how to merge methods so that
   * SchemaManager.generateTypingsFileContents
   *
   * I'm aware it might be a class, and not an interface.
   * That we should not use any. I've tried many variants:
   *
   * ```typescript
   * // Extend the class
   * import ZSchema from 'z-schema'
   * declare namespace 'z-schema' { export class Foo extends ZSchema { ... } }
   *
   * // OR
   * import * as ZSchema from 'z-schema'
   * declare namespace 'z-schema' { export class Foo extends ZSchema { ... } }
   *
   * // OR
   * import { Validator as ZSchema } from 'z-schema'
   * declare namespace 'z-schema' { export class Foo extends ZSchema { ... } }
   *
   * // Export the class to do definition merging.
   * // Even though class should be interface
   * import ZSchema from 'z-schema'
   * declare namespace 'z-schema' { export interface Foo { ... } }
   *
   * // ... and so on.
   * ```
   *
   * But I'm never sure if I should "declare namespace", or "declare module",
   * if when I import, if it's making reference to the @types/z-schema,
   * that the typings are using classes instead of interfaces.
   *
   * It's just guess work for me at the moment.
   * So, I'll learn that part and rework this here as soon as I can.
   *
   * Also, I'm sure that TypeScript 3.5 has ways to do this,
   * links I find are BitRotten and old (back from pre 3.x) and it must be
   * easy to resolve. Should I know what I'm doing here.
   * At the moment, I don't :)
   * Docs is hard to grasp, I'll drop the ball for now.
   *
   * I wanna ship this, so, for now, i'll use @ts-ignore comment
   * and work on that later. Thanks :)
   *
   * https://www.typescriptlang.org/docs/handbook/declaration-files/library-structures.html#preventing-name-conflicts
   * https://github.com/Microsoft/TypeScript/issues/2957
   */
  export class Validator extends ZSchema {
    compileSchema(schema: any): boolean;
    getResolvedSchema(schema: string): any;
  }
}
