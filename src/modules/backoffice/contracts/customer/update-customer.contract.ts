import { Injectable } from "@nestjs/common";
import { Flunt } from "src/utils/flunt";
import { UpdateCustomerDTO } from "../../dtos/customer/update-customer.dto";
import { Contract } from "../contract";

@Injectable()
export class UpdateCustomerContract implements Contract {
    errors: any[];

    validate(model: UpdateCustomerDTO): boolean {
        const flunt = new Flunt()

        flunt.hasMinLen(model.name, 5, 'Nome inválido');

        this.errors = flunt.errors;
        return flunt.isValid();
    }
}