import { Controller, Post, Param, Body, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/modules/backoffice/interceptors/validator.interceptor';
import { CreateAddressContract } from '../contracts/address/create-address.contract';
import { AddressType } from '../enums/address-type.enum';
import { Address } from '../models/address.model';
import { Result } from '../models/result.model';
import { AddressService } from '../services/address.service';

@Controller('v1/addresses')
export class AddressController {
    constructor(private readonly addressService: AddressService) {
    }

    @Post(':document/billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract))
    async addBillingAddress(@Param('document') document, @Body() model: Address) {
        try {
            const res = await this.addressService.addAddress(document, model, AddressType.Billing);

            return new Result('Endereço inserido com sucesso', true, model, null)

        } catch (error) {
            throw new HttpException(new Result('Não foi possível adicionar seu endereço', false, null, error), HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post(':document/shipping')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract))
    async addShippingAddress(@Param('document') document, @Body() model: Address) {
        try {
            const res = await this.addressService.addAddress(document, model, AddressType.Shipping);

            return new Result('Endereço inserido com sucesso', true, model, null)

        } catch (error) {
            throw new HttpException(new Result('Não foi possível adicionar seu endereço', false, null, error), HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}

