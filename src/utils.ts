/**
 * Type Guard utilities
 *
 * ScalarTypeMapTypes, PrimitiveOrConstructorType, GuardType, typeGard are coming from
 * this nice article [Generic type guard in Typescript][1]
 *
 * [1]: https://dev.to/krumpet/generic-type-guard-in-typescript-258l
 */

/**
 * This is private because it is only for mapping type name to infered type
 */
export interface ScalarTypeMapTypes {
  string: string;
  number: number;
  boolean: boolean;
}

// tslint:disable-next-line:no-any
export type NewableClass = new (...args: any[]) => any;

export type PrimitiveOrConstructorType =
  | NewableClass
  | keyof ScalarTypeMapTypes;

/**
 * Infer the guarded type from a specific case of PrimitiveOrConstructorType
 */
export type GuardedType<T extends PrimitiveOrConstructorType> = T extends new (
  // tslint:disable-next-line:no-any
  ...args: any[]
) => infer U
  ? U
  : T extends keyof ScalarTypeMapTypes
  ? ScalarTypeMapTypes[T]
  : never;

export function typeGuard<T extends PrimitiveOrConstructorType>(
  // tslint:disable-next-line:no-any
  o: any,
  className: T,
): o is GuardedType<T> {
  const localPrimitiveOrConstructor: PrimitiveOrConstructorType = className;
  if (typeof localPrimitiveOrConstructor === 'string') {
    return typeof o === localPrimitiveOrConstructor;
  }
  return o instanceof localPrimitiveOrConstructor;
}

class A {
  public a: string = 'a';
}

class B extends A {
  public b: number = 5;
}

const f = typeGuard(A, 'b');
