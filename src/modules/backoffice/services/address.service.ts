import { HttpService } from "@nestjs/axios";
import { Injectable,  } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AddressType } from "../enums/address-type.enum";
import { Address } from "../models/address.model";
import { Customer } from "../models/customer.models";

@Injectable()
export class AddressService {
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>,
        private readonly httpService: HttpService) { }

    async addAddress(document: string, data: Address, type: AddressType): Promise<Customer> {
        const options = { upsert: true }; // new: true, setDefaultsOnInsert: true };
        if (type == AddressType.Billing) {
            return await this.model.findOneAndUpdate({ document }, {
                $set: {
                    billingAddress: data,
                },
            }, options);
        } else {
            return await this.model.findOneAndUpdate({ document }, {
                $set: {
                    shippingAddress: data,
                },
            }, options);
        }
    }

    getAddressByZipCode(zipcode: string) {
        const url = `https://viacep.com.br/ws/${zipcode}/json/`;
        return this.httpService.get(url);
    }
}