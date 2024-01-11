import { Company } from "./company.model";
import {Photo} from "./photo.model";
import {Reservation} from "./reservation.model";

export interface Car {
    id: number;
    name: string;
    pricePerDay: number;
    companyREF: number;
    photos: Photo[];
    reservations: Reservation[];
}
  