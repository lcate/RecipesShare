namespace RecipesSharing.Domain.Services
{
    using RecipesSharing.Domain.Entities;
    using RecipesSharing.Domain.Interfaces;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class RatingService : IRatingService
    {
        private readonly IRatingRepository _ratingRepository;

        public RatingService(IRatingRepository ratingRepository)
        {
            _ratingRepository = ratingRepository;
        }

        public async Task<Rating> Add(Rating rating)
        {
            await _ratingRepository.Add(rating);
            return rating;
        }

        public void Dispose()
        {
            _ratingRepository?.Dispose();
        }

        public async Task<List<Rating>> GetRatingsForRecipeId(int recipeId)
        {
            return await _ratingRepository.GetRatingsForRecipeId(recipeId);
        }

        public async Task<Rating> GetById(int id)
        {
            return await _ratingRepository.GetById(id);
        }

        public async Task<bool> Remove(Rating rating)
        {
            await _ratingRepository.Remove(rating);
            return true;
        }
    }
}
