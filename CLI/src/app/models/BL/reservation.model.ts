export interface Reservation {
    id: number;
    carId: number;
    companyId: number;
    customerId: number;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    custRating: number | null; //rating given by customer
    compRating: number | null; //rating given by company
  }
  