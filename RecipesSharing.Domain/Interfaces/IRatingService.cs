namespace RecipesSharing.Domain.Interfaces
{
    using RecipesSharing.Domain.Entities;
    using System;

    public interface IRatingService : IDisposable
    {
        Task<List<Rating>> GetRatingsForRecipeId(int recipeId);
        Task<Rating> Add(Rating rating);

        Task<Rating> GetById(int id);

        Task<bool> Remove(Rating rating);
    }
}
