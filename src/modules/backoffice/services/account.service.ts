import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';

@Injectable()
export class AccountService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {      
    }

    async create(data: User) : Promise<User> {
        const user = new this.userModel(data);
        return await user.save()
    }

    async findByUsername(username): Promise<User> {
        return await this.userModel
            .findOne({ username: username })
            .exec();
    }
}

