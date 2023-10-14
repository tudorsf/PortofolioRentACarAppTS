import { Company } from "./company.model";
import {Photo} from "./photo.model";
import {Reservation} from "./reservation.model";

export interface Car {
    id: number;
    name: string;
    pricePerDay: number;
    company: Company;
    companyREF: number;
    photos: Photo[];
    reservations: Reservation[];
}
  