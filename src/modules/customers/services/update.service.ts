import { CustomerEntity } from "../entities/customer.entity.js";
import { CustomerRepository } from "../repositories/customer.repository.js";
import DatabaseConnection, { DocumentInterface } from "@src/database/connection.js";

export class UpdateCustomerService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string, doc: DocumentInterface, session: unknown) {
    const customerEntity = new CustomerEntity({
      name: doc.name,
      email: doc.email,
      address: doc.address,
      phone: doc.phone,
    });

    const userRepository = new CustomerRepository(this.db);
    return await userRepository.update(id, customerEntity.customer, { session });
  }
}
