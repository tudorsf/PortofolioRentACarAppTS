﻿using System;
using System.Data;
using System.Threading;
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
        public async Task<ActionResult<Customer>> AddProfile([FromBody] Customer request)
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
            customer.NumberOfRatings = 0;






            _context.Customers.Add(customer);
            _context.SaveChanges();
            return customer;
        }



        [HttpPost("addReservation")]
        public async Task<ActionResult<Reservation>> AddReservation([FromBody] ReservationDTO request)
        {
            var reservation = new Reservation();

            var car = _context.Cars
                    .Include(c => c.Reservations)
                    .FirstOrDefault(r => r.Id == request.carId);

            if (car == null)

                return BadRequest("not available");

            var overlappingReservation = car.Reservations.FirstOrDefault(r =>
                                                    (request.startDate <= r.EndDate && request.endDate >= r.StartDate)
                                                                    );

            if (overlappingReservation != null)
                return BadRequest("Reservation overlaps with another existing reservation");

            else

            reservation.CarId = request.carId;
            reservation.CompanyId = request.companyId;
            reservation.CustomerId = request.customerId;
            //reservation.StartDate = request.startDate;


            reservation.StartDate = request.startDate.AddHours(2);

           
            reservation.EndDate = request.endDate.AddHours(2);

            TimeSpan timeDifference = request.endDate - request.startDate;

            
            int differenceInDays = (int)timeDifference.TotalDays;
            reservation.TotalPrice = GetPrice(request.carId, differenceInDays);


            car.Reservations.Add(reservation);


            _context.Reservations.Add(reservation);
            _context.SaveChanges();
            //return Ok();
            return reservation;
        }

        private int GetPrice(int id, int days)
        {
            var car = _context.Cars.FirstOrDefault(r => r.Id == id);

            int price = car.PricePerDay * (days + 1);

            return price;
        }




        [HttpGet("GetCars")]
        public async Task<ActionResult<IEnumerable<Car>>> GetCars()
        {
            var cars = await _context.Cars.
                                    Include(car => car.Photos)
                .Include(u => u.Reservations).ToListAsync();

            return cars;
        }


        [HttpGet("GetCust/{id}")]
        public ActionResult<Customer> GetCustomer(int id)

        {
            var customer = _context.Customers
                 .Include(c => c.Reservations)
                .FirstOrDefault(u => u.UserREF == id);//get customer details based on UserREF

            /*if(customer == null)
                return NotFound();

            else*/
                return customer;
        }

        [HttpPost("RateCompany")]

        public async Task<ActionResult<Company>> RateCompanyByCustomer (int id, decimal rating)
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

                if (reservation.CustRating != null)
                {
                    return BadRequest("already rated");

                }

                reservation.CustRating = rating;
                
                var company = _context.Companies.FirstOrDefault(c => c.Id == reservation.CompanyId);
                
                if(company == null)
                {
                    
                    return BadRequest("company not found");

                }
                
                company.Rating = (company.Rating * company.NumberOfRatings + rating) / (company.NumberOfRatings + 1);
            
                company.NumberOfRatings++;

                 _context.Companies.Update(company);
                await _context.SaveChangesAsync();

                return company;

         }

       /* [HttpPost("RateCar")]

        public async Task<ActionResult<Company>> RateCaryByCustomer(int id, decimal rating)
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

            if (reservation.CustRating != null)
            {
                return BadRequest("already rated");

            }

            reservation.CustRating = rating;

            var car = _context.Cars.FirstOrDefault(c => c.Id == reservation.CompanyId);

            if (car == null)
            {

                return BadRequest("company not found");

            }

            car.Rating = (car.Rating * car.NumberOfRatings + rating) / (car.NumberOfRatings + 1);

            car.NumberOfRatings++;

            _context.Car.Update(car);
            await _context.SaveChangesAsync();

            return car;

        }*/


    }
}
