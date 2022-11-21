import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RoomBookService } from "../service/room-book.service";

@Controller('v1/schedule')
@ApiTags('Schedules')
export class ScheduleController {
    constructor(private readonly roomBookService: RoomBookService) { }

    @Post()
    async Book(@Body() body: any) {
        await this.roomBookService.Book(body.customerId, body.roomId)
    }
}