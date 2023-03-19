import { ObjectId } from "mongodb";

export interface CustomerInterface {
    _id?: string | ObjectId;
    email?: string;
    name?: string;
    address?: string;
    phone?: string;
    code?: string;
    isDeleted?: boolean;
}

export class CustomerEntity {
    public customer: CustomerInterface;

    constructor(customer: CustomerInterface) {
        this.customer = customer;
    }
}