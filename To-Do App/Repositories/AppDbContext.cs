using Microsoft.EntityFrameworkCore;
using Repositories.Models;

namespace To_Do_List
{
    public class AppDbContext:DbContext
  {
    public AppDbContext(DbContextOptions<AppDbContext> options):base(options)
    {

    }
    public DbSet<UserTask> Tasks { get; set; }
    public DbSet<User> Users { get; set; }
  }

}
