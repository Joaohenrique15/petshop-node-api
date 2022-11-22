import { IEventHandler } from "@nestjs/cqrs";
import { RoomBookedEvent } from "../room-booked.events";

export class RoomBookedHandler implements IEventHandler<RoomBookedEvent> {
    handle(event: RoomBookedEvent) {
        console.log('RoomBookedHandler:handle - Manipulando o evento Toom Booked ...')
    }
}