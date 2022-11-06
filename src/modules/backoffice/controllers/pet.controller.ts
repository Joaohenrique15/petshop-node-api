import { Controller, Post, Put, Param, Body, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/modules/backoffice/interceptors/validator.interceptor';
import { CreatePetContract } from '../contracts/pet/create-pet.contract';
import { Pet } from '../models/pet.model';
import { Result } from '../models/result.model';
import { PetService } from '../services/pet.service';

@Controller('v1/pets')
export class PetController {
    constructor(private readonly petService: PetService) {
    }

    @Post(':document/pets')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract))
    async createPet(@Param('document') document, @Body() model: Pet) {
        try {
            const res = await this.petService.createPet(document, model);
            return new Result('Pet inserido com sucesso', true, model, null)

        } catch (error) {
            throw new HttpException(new Result('Não foi possível adicionar seu pet', false, null, error), HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Put(':document/:id/pets')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract))
    async updatePet(@Param('document') document, @Param('id') id, @Body() model: Pet) {
        try {
            const res = await this.petService.updatePet(document, id, model);
            return new Result('Pet atualizado com sucesso', true, model, null)

        } catch (error) {
            throw new HttpException(new Result('Não foi possível atualizar seu pet', false, null, error), HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}

