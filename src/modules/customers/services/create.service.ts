import { CustomerEntity } from "../entities/customer.entity.js";
import { CustomerRepository } from "../repositories/customer.repository.js";
import DatabaseConnection, { CreateOptionsInterface, DocumentInterface } from "@src/database/connection.js";

export class CreateCustomerService {
    private db: DatabaseConnection;
    constructor(db: DatabaseConnection) {
        this.db = db;
    }
    public async handle(doc: DocumentInterface, options?: CreateOptionsInterface) {
        const customerEntity = new CustomerEntity({
            email: doc.email,
            name: doc.name,
            code: doc.code,
            address: doc.address,
            phone: doc.phone,
            isDeleted: false,
        });

        const customerRepository = new CustomerRepository(this.db);
        const createResponse = await customerRepository.create(customerEntity.customer, options);
        const readResponse = await customerRepository.read(createResponse._id, { session: options?.session });

        return {
            _id: createResponse._id,
            email: readResponse.email,
            name: readResponse.name,
            code: readResponse.code,
            address: readResponse.address,
            phone: readResponse.phone,
        };
    }
}