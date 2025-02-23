import {Enumerate} from "./enumerate";

declare global {
  type RangeN<N1 extends number, N2 extends number> = Exclude<
    Enumerate<N2>, Enumerate<N1>
  >;

type RangeN<N1 extends number, N2 extends number> = Exclude<Enumerate<N2>, Enumerate<N1>>;