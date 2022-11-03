
export class CreateCustomerDTO {
    constructor(
        public name: string,
        public document: string,
        public email: string,
        public password: string,
    ) { }
}

