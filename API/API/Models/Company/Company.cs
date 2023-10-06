namespace API.Models.Company
{
    public class Company
    {   
        public int Id { get; set; }
        public int UserREF { get; set; }

        public string Name { get; set; }
        public string City { get; set; }

        public int Rating { get; set; }

        public List<Car> Cars { get; set; }
    }
}
