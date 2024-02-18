using System.Text.Json.Serialization;
using System.Text.Json;
using API.Models.Company;
using API.Models.DTO;
using API.Models.UserModels;
using LoginAPI3.Data;
using LoginAPI3.Models.UserModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models.Customer;

namespace API.Controllers
{
    [Route("api/[controller]")]

    public class CompanyController : Controller
    {
       
        private readonly IConfiguration _configuration;
        private readonly DataContext _context;
        public CompanyController(IConfiguration configuration, DataContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        


        [HttpPost("addProfile")]
        public async Task<ActionResult<Company>> AddProfile([FromBody]CompanyDTO request)
        {
            if (_context.Companies.Any(u => u.UserREF == request.userREF))
            {
                return BadRequest("Profile already exists.");
            }

            var company = new Company();

            company.Name = request.name;
            company.City = request.city;
            company.UserREF = request.userREF;
            company.Address = request.address;
            company.PhoneNumber = request.phoneNumber;
            company.eMail = request.email;
            company.Rating = 5;
            company.NumberOfRatings = 0;


            _context.Companies.Add(company);
            _context.SaveChanges();
            return company;
        }

      

        [HttpPost("addCar")]
        public async Task<ActionResult<Car>> AddCar([FromBody] CarDTO request)
        {

            var car = new Car();

            car.Name = request.name;
            car.PricePerDay = request.pricePerDay;
            car.CompanyREF = request.companyREF;
            car.doorsNr = request.doorsNr;
            car.Horsepower = request.Horsepower;
            car.engine = request.engine;
            car.gearboxType = request.gearboxType;
            car.Model = request.brand;
            car.Year = request.year;
            car.type = request.type;
            car.engineCapacity = request.engineCapacity;

            /*byte[] photoBytes = Convert.FromBase64String(request.photos);

            var photo = new Photo
            {
                CarREF = car.Id,
                photo = photoBytes
            };

            car.Photos.Add(photo);
            */


            foreach (var elements in request.photos)
            {
                

                byte[] photoBytes = Convert.FromBase64String(elements);

                var photo = new CarPhotos
                {
                    CarREF = car.Id,
                    Photo = photoBytes
                };

                car.Photos.Add(photo);

                _context.CPhotos.Add(photo);
            }

            _context.Cars.Add(car);



            _context.SaveChanges();
            return car;
        }

        [HttpGet("GetComp/{id}")]
        public async Task<ActionResult<Company>> GetCompany(int id)

        {
            /*JsonSerializerOptions options = new()
            {
                ReferenceHandler = ReferenceHandler.IgnoreCycles,
                WriteIndented = true
            };*/

            var company = _context.Companies.
                Include(u => u.Cars).
                    ThenInclude(car => car.Reservations).
                    Include(u => u.Cars).
                    ThenInclude(car => car.Photos).
                   FirstOrDefault(u => u.UserREF == id); //get company details based on UserREF

            //var json = JsonSerializer.Serialize(company, options); 

            return company;
        }

        [HttpPost("RateCustomer")]

        public async Task<ActionResult<Customer>> RateCustomerByCompany(int id, decimal rating)
        {
           
            var reservation = _context.Reservations.FirstOrDefault(r => r.Id == id);


            if (reservation == null)
            {
                return BadRequest("Reservation not found");
            }

            if (reservation.EndDate > DateTime.UtcNow)
            {
                return BadRequest("Cannot rate a reservation that has not ended yet");
            }

            if (reservation.CompRating != null)
            {
                return BadRequest("Already rated");
            }

            reservation.CompRating = rating;

            var customer = _context.Customers.FirstOrDefault(c => c.Id == reservation.CustomerId);

            if (customer == null)
            {
                return BadRequest("Customer not found");
            }

            customer.Rating = (customer.Rating * customer.NumberOfRatings + rating) / (customer.NumberOfRatings + 1);
            customer.NumberOfRatings++;

            _context.Customers.Update(customer);
            await _context.SaveChangesAsync();

            return customer;


        }

       










    }
}
