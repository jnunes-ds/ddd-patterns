import {toXML, XmlOptions} from 'jstoxml';
import {OutputListCustomerDTO} from "@usecase/customer/list/list.customer.dto";

export default class CustomerPresenter {
  static toListXML(data: OutputListCustomerDTO): string {
    const xmlOptions: XmlOptions = {
      header: true,
      indent: '  ',
    }

    return toXML({
      customers: {
        customer: data.customers.map(customer => ({
          id: customer.id,
          name: customer.name,
          address: {
            street: customer.address.street,
            number: customer.address.number,
            city: customer.address.city,
            state: customer.address.state,
            zipCode: customer.address.zipCode
          }
        }))
      }
    }, xmlOptions);
  }

}