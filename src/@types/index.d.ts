type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

type RangeN<N1 extends number, N2 extends number> = Exclude<Enumerate<N2>, Enumerate<N1>>;