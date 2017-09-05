import { BaseEntity, User } from './../../shared';

export class Appointment implements BaseEntity {
    constructor(
        public id?: number,
        public reason?: string,
        public insuranceChange?: boolean,
        public phoneNumber?: string,
        public userAppointment?: User,
    ) {
        this.insuranceChange = false;
    }
}
