import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Md5 } from 'md5-typescript';
import { Model } from 'mongoose';
import { Customer } from '../models/customer.models';
import { User } from '../models/user.model';

@Injectable()
export class AccountService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Customer') private readonly customerModel: Model<Customer>,
    ) {
    }

    async create(data: User): Promise<User> {
        const user = new this.userModel(data);
        return await user.save()
    }

    async findByUsername(username: string): Promise<User> {
        return await this.userModel
            .findOne({ username: username })
            .exec();
    }

    async findByDocument(document: string): Promise<User> {
        return await this.userModel
            .findOne({ document: document })
            .exec();
    }

    async authenticate(username: string, password: string): Promise<Customer> {
        var customer = await this.customerModel
            .findOne({ document: username })
            .populate('user')
            .exec();

        const pass = await Md5.init(`${password}${process.env.SALT_KEY}`);
        if (pass.toString() == customer.user.password.toString()) {
            return customer;
        } else {
            return null;
        }
    }

    async update(username: string, data: any): Promise<User> {
        return await this.userModel.findOneAndUpdate({ username }, data);
    }
}

