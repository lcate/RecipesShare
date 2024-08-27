using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RecipesSharing.API.Configuration;
using RecipesSharing.API.JwtFeatures;
using RecipesSharing.Domain.Entities;
using RecipesSharing.Infrastructure.Context;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<RepositoryContext>(options =>
{
    options.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=RecipeSharing;Trusted_Connection=True;MultipleActiveResultSets=true");
    options.LogTo(Console.WriteLine).EnableSensitiveDataLogging();
});
builder.Services.AddDbContext<RecipesDbContext>(options =>
{
    options.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=RecipeSharing;Trusted_Connection=true;MultipleActiveResultSets=true;");
    options.LogTo(Console.WriteLine).EnableSensitiveDataLogging();
});


builder.Services.AddControllers();

builder.Services.AddAutoMapper(typeof(AutomapperConfig).Assembly);

builder.Services.AddIdentity<AppUser, IdentityRole>()
    .AddEntityFrameworkStores<RepositoryContext>();

var jwtSettings = builder.Configuration.GetSection("JwtSettings");
builder.Services.AddAuthentication(opt =>
{
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["validIssuer"],
        ValidAudience = jwtSettings["validAudience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
            .GetBytes(jwtSettings.GetSection("securityKey").Value))
    };
});

builder.Services.AddScoped<JwtHandler>();

builder.Services.ResolveDependencies();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());
app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
