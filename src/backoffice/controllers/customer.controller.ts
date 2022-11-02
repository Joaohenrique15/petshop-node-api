import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors } from '@nestjs/common';
import { retry } from 'rxjs';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateCustomerContract } from '../contracts/customer.contract';
import { CreateCustomerDTO } from '../dtos/create-customer-dto';
import { Customer } from '../models/customer.models';
import { Result } from '../models/result.model';

@Controller('v1/customers')
export class CustomerController {
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
    post(@Body() body: CreateCustomerDTO) {
        return new Result('Cliente inserido com sucesso', true, body, null)
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

