export interface InputUpdateCustomerDTO {
  id: string;
  name?: string;
  address?: {
    street?: string;
    number?: number;
    city?: string;
    state?: string;
    zipCode?: string;
  }
}

export interface OutputUpdateCustomerDTO {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    city: string;
    state: string;
    zipCode: string;
  }
}