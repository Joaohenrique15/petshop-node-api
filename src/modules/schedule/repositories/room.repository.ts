import { Room } from "../models/room.model";

export class RoomRepository {
    async findOneById(id: string): Promise<Room> {
        console.log('RoomRepository:findOneById - Recuperando a sala ...')
        
        return new Room('1234566')
    }
}