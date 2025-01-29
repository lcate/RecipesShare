using RecipesSharing.Domain.Interfaces;
using RecipesSharing.Domain.Services;
using RecipesSharing.Infrastructure.Context;
using RecipesSharing.Infrastructure.Repositories;

namespace RecipesSharing.API.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static IServiceCollection ResolveDependencies(this IServiceCollection services)
        {
            services.AddScoped<RecipesDbContext>();

            services.AddScoped<IRatingRepository, RatingRepository>();
            services.AddScoped<IRecipeRepository, RecipeRepository>();
            services.AddScoped<IIngredientRepository, IngredientRepository>();

            services.AddScoped<IRatingService, RatingService>();
            services.AddScoped<IRecipeService, RecipeService>();
            services.AddScoped<IIngredientService, IngredientService>();

            return services;
        }
    }
}
