import { BadGatewayException, BadRequestException, CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { Contract } from "src/backoffice/contracts/contract";
import { Result } from "src/backoffice/models/result.model";

@Injectable()
export class ValidatorInterceptor implements NestInterceptor{
    constructor(public contract: Contract) {

    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const body = context.switchToHttp().getRequest().body;
        const valid = this.contract.validate(body);

        if(!valid){
            throw new HttpException(new Result('Ops, algo saiu errado', false, null, this.contract.errors), HttpStatus.BAD_REQUEST)
            console.log('Passou aqui krl')

        }

        return next.handle();
    }
}