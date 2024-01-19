import { Reservation } from "./reservation.model";

export interface Customer{
    id:number;
    userREF:number;
    name: string;
    eMail: string;
    phoneNumber: string;
    rating: number;
    reservations: Reservation;

}