import { ICommandHandler } from "@nestjs/cqrs";
import { RoomRepository } from "../../repositories/room.repository";
import { BookRoomCommand } from "../book-room.command";

export class BookRoomHandler implements ICommandHandler<BookRoomCommand> {
    constructor(private readonly roomRepository: RoomRepository) { }

    async execute(command: BookRoomCommand): Promise<any> {
        console.log('BookRoomHandler:execute - Executando o comando ...')
        const room = await this.roomRepository.findOneById(command.roomId)
        room.book(command.customerId)
        //commit()
    }
}