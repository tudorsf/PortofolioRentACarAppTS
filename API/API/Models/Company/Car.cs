using API.Models.Enums;

namespace API.Models.Company
{
    public class Car
    {   
        public int Id { get; set; }
        public string Name { get; set; }

        public string Model { get; set; }
        public int PricePerDay { get; set; }

        public Company Company { get; set; }

        public int CompanyREF { get; set; }
        
        public List<Photo> Photos { get; set; }

        public List<Reservation> Reservations { get; set; }

        public int Horsepower { get; set; }

        public Engine engine { get; set; }

        public GearboxType geaboxType { get; set; }

        public DoorsNr doorsNr { get; set; }

        public CarType type { get; set; }

        private int _year;

        public int Year { 
            get { return _year; } 
            set
            {
                if (value >= DateTime.Now.Year - 15)
                {
                    _year = value;
                }
                else
                {
                    throw new ArgumentException("Sorry, you cannot rent a car older than 15 years");
                }
            } 
        }

    }
}
