import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { Guid } from "guid-typescript";
import { JwtAuthGuard } from "src/shared/guards/auth.guards";
import { RoleInterceptor } from "src/shared/interceptors/role.interceptor";
import { AuthService } from "src/shared/services/auth.service";
import { AuthenticateDto } from "../dtos/account/authenticate.dto";
import { ChangePasswordDto } from "../dtos/account/change-password.dto";
import { ResetPasswordDto } from "../dtos/account/reset-password.dto";
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

    @Post('reset-password')
    async resetPassword(@Body() model: ResetPasswordDto): Promise<any> {
        try {
            const password = Guid.create().toString().substring(0, 8).replace('-', '');
            await this.accountService.update(model.document, { password: password });
            // TODO: Enviar E-mail com a senha
            return new Result('Uma nova senha foi enviada para seu E-mail', true, null, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível restaurar sua senha', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post('change-password')
    @UseGuards(JwtAuthGuard)
    async changePassword(@Req() request, @Body() model: ChangePasswordDto): Promise<any> {
        try {
            // TODO: Encriptar senha
            await this.accountService.update(request.user.document, { password: model.newPassword });
            return new Result('Sua senha foi alterada com sucesso!', true, null, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível alterar sua senha', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post('refresh')
    @UseGuards(JwtAuthGuard)
    async refreshToken(@Req() request): Promise<any> {
        const token = await this.authService.createToken(request.user.document, request.user.email, request.user.roles);
        return new Result(null, true, token, null);
    }
}