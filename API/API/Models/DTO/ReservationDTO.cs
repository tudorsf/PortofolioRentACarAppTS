namespace API.Models.DTO
{
    public class ReservationDTO
    {   
        public int Id { get; set; }

        public int customerId { get; set; }

        public int companyId { get; set; }

        public int carId { get; set; }

        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }

       
    }
}
