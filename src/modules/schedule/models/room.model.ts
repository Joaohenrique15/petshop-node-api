import { AggregateRoot } from "@nestjs/cqrs";


export class Room extends AggregateRoot {
    constructor(private readonly id: string) {
        super();
    }

    book(customerId: string) {

    }
}