import { Car } from "./car.model";


export interface Company {
  Id: number;
  UserREF: number;
  Name: string;
  City: string;
  Rating: number;
  Cars: Car[];
}
  