namespace API.Models.Company
{
    public class Company
    {   
        public int Id { get; set; }
        public int UserREF { get; set; }

        public string Name { get; set; }
        public string City { get; set; }
        public string Address { get; set; }

        public string PhoneNumber { get; set; }

        public string eMail { get; set; }


        public int Rating { get; set; }

        public List<Car> Cars { get; set; }
    }
}
