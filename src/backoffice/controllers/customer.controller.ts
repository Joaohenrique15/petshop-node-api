import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateCustomerContract } from '../contracts/customer.contract';
import { CreateCustomerDTO } from '../dtos/create-customer-dto';
import { Customer } from '../models/customer.models';
import { Result } from '../models/result.model';
import { User } from '../models/user.model';
import { AccountService } from '../services/account.service';
import { CustomerService } from '../services/customer.service';

@Controller('v1/customers')
export class CustomerController {
    constructor(
        private readonly accountService: AccountService,
        private readonly customerService: CustomerService) {
    }

    @Get()
    get() {
        return new Result(null, true, [], null)
    }

    @Get(':document')
    getByDocument(@Param('document') document) {
        return new Result(null, true, {}, null)
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

    @Put(':document')
    put(@Param('document') document, @Body() body) {
        return new Result('Cliente alterado com sucesso', true, body, null)
    }

    @Delete(':document')
    delete(@Param('document') document) {
        return new Result('Cliente removido com sucesso', true, null, null)
    }
}

