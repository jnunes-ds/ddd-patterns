export default interface IProduct {
  get id(): string;
  get name(): string;
  get price(): number;
  changeName(name: string): void;
  changePrice(price: number): void;
  validate(): void;
}