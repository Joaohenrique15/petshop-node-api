import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/modules/backoffice/services/account.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly accountService: AccountService,
        private readonly jwtService: JwtService,
    ) { }

    async createToken(document: string, email: string, roles: string[]) {
        const user: JwtPayload = {
            document: document,
            email: email,
            roles: roles
        };
        
        return await this.jwtService.sign(user);
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        //return await this.accountService.findByDocument(payload.document);
        return payload;
    }
}