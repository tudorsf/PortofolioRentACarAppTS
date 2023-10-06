using System;
using System.Data;
using API.Models.Company;
using API.Models.Customer;
using API.Models.DTO;
using LoginAPI3.Data;
using LoginAPI3.Models.UserModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    public class CustomerController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly DataContext _context;
        public CustomerController(IConfiguration configuration, DataContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("addProfile")]
        public async Task<ActionResult<User>> AddProfile([FromBody] Customer request)
        {
            if (_context.Customers.Any(u => u.UserREF == request.UserREF))
            {
                return BadRequest("Profile already exists.");
            }

            var customer = new Customer();
            customer.UserREF = request.UserREF;
            customer.Name = request.Name;
            customer.phoneNumber = request.phoneNumber;
            customer.eMail = request.eMail;
            
            customer.Rating = 5;






            _context.Customers.Add(customer);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPost("addReservation")]
        public async Task<ActionResult<User>> AddReservation([FromBody] ReservationDTO request)
        {
            var reservation = new Reservation();

            var car = _context.Cars
                    .Include(c => c.Reservations)
                    .FirstOrDefault(r => r.Id == request.carREF);



            reservation.CarId = request.carREF;
            reservation.CompanyId = request.companyREF;
            reservation.CustomerId = request.customerREF;
            reservation.StartDate = request.startDate;
            reservation.EndDate = request.endDate;
            
            TimeSpan timeDifference = request.endDate - request.startDate;

            
            int differenceInDays = (int)timeDifference.TotalDays;
            reservation.TotalPrice = GetPrice(request.carREF, differenceInDays);


            car.Reservations.Add(reservation);


            _context.Reservations.Add(reservation);
            _context.SaveChanges();
            return Ok();
        }

        private int GetPrice(int id, int days)
        {
            var car = _context.Cars.FirstOrDefault(r => r.Id == id);

            int price = car.PricePerDay * days;

            return price;
        }
    }
}
