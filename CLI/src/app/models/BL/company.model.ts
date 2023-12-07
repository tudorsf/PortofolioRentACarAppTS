import { Car } from "./car.model";


export interface Company {
  id: number;
  userREF: number;
  name: string;
  city: string;
  address: string;
  phoneNumber: string;
  eMail: string;
  rating: number;
  cars: Car[];
}
  
