using API.Models.Company;
using API.Models.DTO;
using API.Models.UserModels;
using LoginAPI3.Data;
using LoginAPI3.Models.UserModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public async Task<ActionResult<User>> AddProfile([FromBody] CompanyDTO request)
        {
            if (_context.Companies.Any(u => u.UserREF == request.userREF))
            {
                return BadRequest("Profile already exists.");
            }

            var company = new Company();

            company.Name = request.name;
            company.City = request.city;
            company.UserREF = request.userREF;
            company.Rating = 5;


            _context.Companies.Add(company);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPost("addCar")]
        public async Task<ActionResult<User>> AddCar([FromBody] CarDTO request)
        {
            
            var car = new Car();

            car.Name = request.name;
            car.PricePerDay = request.pricePerDay;
            //car.Photos = request.Photos;
            car.CompanyREF = request.companyREF;

            _context.Cars.Add(car);


            
            _context.SaveChanges();
            return Ok();
        }

        [HttpGet("GetComp/{id}")]
        public async Task<ActionResult<Company>> GetCompanies(int id)
        {
            var company = _context.Companies.Include(u => u.Cars).ThenInclude(car => car.Reservations).FirstOrDefault(u => u.Id == id);


            return company;


        }


       

    }
}
