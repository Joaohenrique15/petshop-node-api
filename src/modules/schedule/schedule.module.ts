import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { ScheduleController } from './controllers/schedule.controller';
import { RoomRepository } from './repositories/room.repository';
import { RoomBookService } from './service/room-book.service';

@Module({
    imports: [CqrsModule],
    controllers: [ScheduleController],
    providers: [
        RoomBookService,
        RoomRepository,
        ...CommandHandlers
    ],
})
export class ScheduleModule {}
