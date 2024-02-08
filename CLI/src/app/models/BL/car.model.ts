import { Company } from "./company.model";
import {Photo} from "./photo.model";
import {Reservation} from "./reservation.model";
import { DoorsNr, Engine, CarType,GearboxType} from "../enums/carEnums";

export interface Car {
    id: number;
    name: string;
    pricePerDay: number;
    companyREF: number;
    photos: Photo[];
    reservations: Reservation[];
    doorsNr: DoorsNr;
    engine: Engine;
    type: CarType;
    gearboxType: GearboxType;
    brand: string;
    year: number;
    horsepower: number;
    

}
  