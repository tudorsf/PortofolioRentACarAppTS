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

        
    }
}
