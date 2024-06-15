
using EmployeeDirectory_webApi.Repositories;
using Microsoft.EntityFrameworkCore;

namespace EmployeeDirectory_webApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddDbContext<AppDBcontext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("AppDbConnection")));
            builder.Services.AddAutoMapper(typeof(Program));
            builder.Services.AddScoped(typeof(IAppRepository<>), typeof(AppRepository<>));
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:4200")
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseCors("AllowSpecificOrigin");
            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
