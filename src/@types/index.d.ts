import {Enumerate} from "./enumerate";

declare global {
  type RangeN<N1 extends number, N2 extends number> = Exclude<
    Enumerate<N2>, Enumerate<N1>
  >;

  type NonPrimitive = object;

  type Override<T, M extends {[K in keyof Partial<T>]: unknown}> = Omit<
    T,
    keyof M
  > & M;
}
