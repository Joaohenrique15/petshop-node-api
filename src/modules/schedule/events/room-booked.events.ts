
export class RoomBookedEvent {
    constructor(
        private readonly customerId: string,
        private readonly roomId: string
    ) { }
}