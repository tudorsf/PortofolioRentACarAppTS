using API.Models.Enums;

namespace API.Models.DTO
{
    public class CarDTO
    {   
        public string name { get; set; }

        public string brand { get; set; }
        public int pricePerDay { get; set; }

        public int companyREF { get; set; }

        public int Horsepower { get; set; }

        public Engine engine { get; set; }

        public GearboxType geaboxType { get; set; }

        public DoorsNr doorsNr { get; set; }

        public CarType type { get; set; }

        public int _year { get; set; }
    }
}
