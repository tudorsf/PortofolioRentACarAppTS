using API.Models.Company;

namespace API.Models.Customer
{
    public class Customer
    {
        public int Id { get; set; }
        public int UserREF { get; set; }

        public string Name { get; set; }

        public string eMail { get; set; }
        public string phoneNumber { get; set; }
        public int Rating { get; set; }

        public List<Reservation> Reservations { get; set; }


    }
}
