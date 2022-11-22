import { Body, Controller, HttpException, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Result } from "src/modules/backoffice/models/result.model";
import { JwtAuthGuard } from "src/shared/guards/auth.guards";
import { BookRoomCommand } from "../commands/book-room.command";
import { BookRoomDTO } from "../dtos/book-room.dto";
import { RoomBookService } from "../service/room-book.service";

@Controller('v1/schedule')
@ApiTags('Schedules')
export class ScheduleController {
    constructor(private readonly roomBookService: RoomBookService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async Book(@Req() request, @Body() model: BookRoomDTO) {
        try {
            var command = new BookRoomCommand(request.user.document, model.roomId, model.date);
            await this.roomBookService.Book(command);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível reservar sua sala', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}