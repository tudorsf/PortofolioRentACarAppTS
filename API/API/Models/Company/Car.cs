namespace API.Models.Company
{
    public class Car
    {   
        public int Id { get; set; }
        public string Name { get; set; }
        public int PricePerDay { get; set; }

        public Company Company { get; set; }

        public int CompanyREF { get; set; }
        
        public List<Photo> Photos { get; set; }

        public List<Reservation> Reservations { get; set; }

    }
}
