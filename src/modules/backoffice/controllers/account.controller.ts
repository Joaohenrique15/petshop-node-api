import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { JwtAuthGuard } from "src/shared/guards/auth.guards";
import { RoleInterceptor } from "src/shared/interceptors/role.interceptor";
import { AuthService } from "src/shared/services/auth.service";
import { AuthenticateDto } from "../dtos/account/authenticate.dto";
import { Result } from "../models/result.model";
import { AccountService } from "../services/account.service";

@Controller('v1/accounts')
export class AccountController {
    constructor(
        private authService: AuthService,
        private readonly accountService: AccountService
    ) {

    }

    @Get('')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(new RoleInterceptor(['admin']))
    findAll(@Req() resquest) {
        //console.log(resquest.user)
        return [];
    }

    @Post('getToken')
    async authenticate(@Body() model: AuthenticateDto): Promise<any> {
        const customer = await this.accountService.authenticate(model.username, model.password);

        if (!customer)
            throw new HttpException(new Result('Usuário ou senha inválidos', false, null, null), HttpStatus.UNAUTHORIZED);
            
        if (!customer.user.active)
            throw new HttpException(new Result('Usuário inativo', false, null, null), HttpStatus.UNAUTHORIZED);

        // Gera o token
        const token = await this.authService.createToken(customer.document, customer.email, customer.user.roles);
        return new Result(null, true, token, null);
    }

}