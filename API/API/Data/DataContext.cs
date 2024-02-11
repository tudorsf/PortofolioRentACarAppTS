using API.Models.Company;
using API.Models.Customer;
using API.Models.UserModels;
using LoginAPI3.Models.UserModels;
using Microsoft.EntityFrameworkCore;



namespace LoginAPI3.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }

        public DbSet<LoggedInUser> LoggedInUsers { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<Car> Cars { get; set; }

        public DbSet<Company> Companies { get; set; }

        public DbSet<Customer> Customers { get; set; }

        public DbSet<Reservation> Reservations { get; set; }


        public DbSet<CarPhotos> CPhotos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Car>()
                .HasOne(c => c.Company)
                .WithMany(co => co.Cars)
                
                .HasForeignKey(c => c.CompanyREF);
        }


    }
}
