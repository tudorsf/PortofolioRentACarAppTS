namespace API.Models.Company
{

    public class Reservation
    {
        public int Id { get; set; }
        public int CarId { get; set; }

        public int CompanyId { get; set; }
        public int CustomerId { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public int TotalPrice { get; set; }

        public decimal? CustRating { get; set; } //rating given by customer

        public decimal? CompRating { get; set; } //rating given by customer


    }


}
