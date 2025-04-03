export interface InputListCustomerDTO {}

type Customer = {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface OutputListCustomerDTO {
  customers: Customer[];
}