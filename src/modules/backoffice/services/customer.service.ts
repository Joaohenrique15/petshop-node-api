import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UpdateCustomerDTO } from "../dtos/customer/update-customer.dto";
import { QueryDto } from "../dtos/query.dto";
import { CreditCard } from "../models/credit-card.model";
import { Customer } from "../models/customer.models";


@Injectable()
export class CustomerService {
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>) {

    }

    async create(data: Customer): Promise<Customer> {
        const customer = new this.model(data);
        return await customer.save()
    }
    
    async findAll(): Promise<Customer[]> {
        return await this.model.find({}, 'name email document').sort('name').exec();
    }

    async find(document: string): Promise<Customer[]> {
        return await this.model.find({ document }).populate('user', 'username').exec();
    }
    
    async query(model: QueryDto): Promise<Customer[]> {
        return await this.model.find(model.query, model.fields, { skip: model.skip, limit: model.take }).sort(model.sort).exec();
    }

    async update(document: string, data: UpdateCustomerDTO): Promise<Customer> {
        return await this.model.findOneAndUpdate({ document }, data);
    }
    
    async saveOrUpdateCreditCard(document: string, data: CreditCard): Promise<Customer> {
        const options = { upsert: true };
        return await this.model.findOneAndUpdate({ document }, {
            $set: {
                card: data,
            },
        }, options);
    }
}