import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateAddressContract } from '../contracts/customer/create-address.contract';
import { CreateCustomerContract } from '../contracts/customer/create-customer.contract';
import { CreatePetContract } from '../contracts/customer/create-pet.contract';
import { QueryContract } from '../contracts/customer/query.contract';
import { CreateCustomerDTO } from '../dtos/create-customer.dto';
import { QueryDto } from '../dtos/query.dto';
import { Address } from '../models/address.model';
import { Customer } from '../models/customer.models';
import { Pet } from '../models/pet.model';
import { Result } from '../models/result.model';
import { User } from '../models/user.model';
import { AccountService } from '../services/account.service';
import { AddressService } from '../services/address.service';
import { CustomerService } from '../services/customer.service';

@Controller('v1/customers')
export class CustomerController {
    constructor(
        private readonly accountService: AccountService,
        private readonly customerService: CustomerService,
        private readonly addressService: AddressService) {
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
            const user = await this.accountService.create(new User(model.document, model.password, true))
            const customer = new Customer(model.name, model.document, model.email, null, null, null, null, user);
            const res = await this.customerService.create(customer);

            return new Result('Cliente inserido com sucesso', true, res, null)

        } catch (error) {
            throw new HttpException(new Result('Não foi possível realizar seu cadastro', false, null, error), HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post('addresses/:document/billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract))
    async addBillingAddress(@Param('document') document, @Body() model: Address) {
        try {
            const res = await this.addressService.addBillingAddress(document, model);

            return new Result('Endereço inserido com sucesso', true, model, null)

        } catch (error) {
            throw new HttpException(new Result('Não foi possível adicionar seu endereço', false, null, error), HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post('addresses/:document/shipping')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract))
    async addShippingAddress(@Param('document') document, @Body() model: Address) {
        try {
            const res = await this.addressService.addShippingAddress(document, model);

            return new Result('Endereço inserido com sucesso', true, model, null)

        } catch (error) {
            throw new HttpException(new Result('Não foi possível adicionar seu endereço', false, null, error), HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post(':document/pets')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract))
    async createPet(@Param('document') document, @Body() model: Pet) {
        try {
            const res = await this.customerService.createPet(document, model);
            return new Result('Pet inserido com sucesso', true, model, null)

        } catch (error) {
            throw new HttpException(new Result('Não foi possível adicionar seu pet', false, null, error), HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Put(':document/:id/pets')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract))
    async updatePet(@Param('document') document, @Param('id') id, @Body() model: Pet) {
        try {
            const res = await this.customerService.updatePet(document, id, model);
            return new Result('Pet atualizado com sucesso', true, model, null)

        } catch (error) {
            throw new HttpException(new Result('Não foi possível atualizar seu pet', false, null, error), HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Put(':document')
    put(@Param('document') document, @Body() body) {
        return new Result('Cliente alterado com sucesso', true, body, null)
    }

    @Delete(':document')
    delete(@Param('document') document) {
        return new Result('Cliente removido com sucesso', true, null, null)
    }
}

