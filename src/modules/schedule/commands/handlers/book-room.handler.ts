import { HttpException, HttpStatus } from "@nestjs/common";
import { EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { RoomRepository } from "../../repositories/room.repository";
import { BookRoomCommand } from "../book-room.command";

export class BookRoomHandler implements ICommandHandler<BookRoomCommand> {
    constructor(private readonly roomRepository: RoomRepository, private readonly publisher: EventPublisher,) { }

    async execute(command: BookRoomCommand) {
        const room = this.publisher.mergeObjectContext(
            await this.roomRepository.checkAvailability(command.roomId, command.date),
        );

        if (room) {
            room.book(command.customerId, command.date);
            await this.roomRepository.book(room);
            return;
        }

        throw new HttpException("Sala não disponível", HttpStatus.BAD_REQUEST);
    }
}