namespace API.Models.DTO
{
    public class ReservationDTO
    {   
        public int Id { get; set; }

        public int customerREF { get; set; }

        public int companyREF { get; set; }

        public int carREF { get; set; }

        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }

       
    }
}
