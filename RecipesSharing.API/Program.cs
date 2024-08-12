using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using RecipesSharing.API.Configuration;
using RecipesSharing.Domain.Entities;
using RecipesSharing.Infrastructure.Context;
using System;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<RepositoryContext>(options =>
{
    options.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=RecipesSharing;Trusted_Connection=True;MultipleActiveResultSets=true");
    options.LogTo(Console.WriteLine).EnableSensitiveDataLogging();
});


builder.Services.AddAutoMapper(typeof(AutomapperConfig).Assembly);

builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<RepositoryContext>();

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

app.UseAuthorization();

app.MapControllers();

app.Run();
