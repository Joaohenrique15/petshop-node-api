import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/modules/backoffice/interceptors/validator.interceptor';
import { CreateAddressContract } from '../contracts/address/create-address.contract';
import { CreateCreditCardContract } from '../contracts/customer/create-credit-card.contract';
import { CreateCustomerContract } from '../contracts/customer/create-customer.contract';
import { UpdateCustomerContract } from '../contracts/customer/update-customer.contract';
import { CreatePetContract } from '../contracts/pet/create-pet.contract';
import { QueryContract } from '../contracts/query.contract';
import { CreateCustomerDTO } from '../dtos/customer/create-customer.dto';
import { UpdateCustomerDTO } from '../dtos/customer/update-customer.dto';
import { QueryDto } from '../dtos/query.dto';
import { Address } from '../models/address.model';
import { CreditCard } from '../models/credit-card.model';
import { Customer } from '../models/customer.models';
import { Pet } from '../models/pet.model';
import { Result } from '../models/result.model';
import { User } from '../models/user.model';
import { AccountService } from '../services/account.service';
import { AddressService } from '../services/address.service';
import { CustomerService } from '../services/customer.service';
import { PetService } from '../services/pet.service';

@Controller('v1/customers')
export class CustomerController {
    constructor(
        private readonly accountService: AccountService,
        private readonly customerService: CustomerService,
        private readonly addressService: AddressService,
        private readonly petService: PetService) {
    }

    @Get()
    async getAll() {
        try {
            const customers = await this.customerService.findAll();
            return new Result(null, true, customers, null)

        } catch (error) {
            throw new HttpException(new Result('Não foi possível buscar todos os clientes', false, null, error), HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Get(':document')
    async getCustomerDetailByDocument(@Param('document') document) {
        try {
            const res = await this.customerService.find(document);
            return new Result(null, true, res, null)

        } catch (error) {
            throw new HttpException(new Result('Não foi possível buscar o cliente', false, null, error), HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post('query')
    @UseInterceptors(new ValidatorInterceptor(new QueryContract()))
    async query(@Body() model: QueryDto) {
        const customers = await this.customerService.query(model);
        return new Result(null, true, customers, null);
    }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract))
    async post(@Body() model: CreateCustomerDTO) {
        try {
            const user = await this.accountService.create(new User(model.document, model.password, ['user'], true))
            const customer = new Customer(model.name, model.document, model.email, null, null, null, null, user);
            const res = await this.customerService.create(customer);

            return new Result('Cliente inserido com sucesso', true, res, null)

        } catch (error) {
            throw new HttpException(new Result('Não foi possível realizar seu cadastro', false, null, error), HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Put(':document')
    @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract))
    async put(@Param('document') document, @Body() model: UpdateCustomerDTO) {
        try {
            await this.customerService.update(document, model);
            return new Result('Cliente alterado com sucesso', true, null, null)

        } catch (error) {
            throw new HttpException(new Result('Não foi possível realizar a alteração', false, null, error), HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Delete(':document')
    delete(@Param('document') document) {
        return new Result('Cliente removido com sucesso', true, null, null)
    }

    @Post(':document/credit-cards')
    @UseInterceptors(new ValidatorInterceptor(new CreateCreditCardContract()))
    async createBilling(@Param('document') document, @Body() model: CreditCard) {
        try {
            await this.customerService.saveOrUpdateCreditCard(document, model);
            return new Result(null, true, model, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível adicionar seu cartão de crédito', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}

