import { CustomerRepository } from "../repositories/customer.repository.js";
import DatabaseConnection, { DeleteOptionsInterface } from "@src/database/connection.js";

export class DestroyCustomerService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string, options?: DeleteOptionsInterface) {
    const customerRepository = new CustomerRepository(this.db);
    return await customerRepository.delete(id, options);
  }
}
