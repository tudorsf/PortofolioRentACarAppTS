import { Car } from "./car.model";


export interface Company {
    id: number;
    userREF: number;
    name: string;
    city: string;
    rating: number;
    cars: Car[];
  }
  