import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/shared/guards/auth.guards";
import { AuthService } from "src/shared/services/auth.service";

@Controller('v1/accounts')
export class AccountController {
    constructor(private authService: AuthService) {

    }

    @Get('')
    @UseGuards(JwtAuthGuard)
    findAll(@Req() resquest) {
        //console.log(resquest.user)
        return [];
    }

    @Post('getToken')
    async createToken(): Promise<any> {
        return await this.authService.createToken();
    }
}