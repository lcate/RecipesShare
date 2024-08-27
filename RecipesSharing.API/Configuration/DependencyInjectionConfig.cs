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

            services.AddScoped<ICommentRepository, CommentRepository>();
            services.AddScoped<IRecipeRepository, RecipeRepository>();

            services.AddScoped<ICommentService, CommentService>();
            services.AddScoped<IRecipeService, RecipeService>();

            return services;
        }
    }
}
