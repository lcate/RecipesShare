using RecipesSharing.Domain.Entities;
using RecipesSharing.Domain.Interfaces;

namespace RecipesSharing.Domain.Services
{
    public class RecipeService : IRecipeService
    {
        private readonly IRecipeRepository _recipeRepository;

        public RecipeService(IRecipeRepository recipeRepository)
        {
            _recipeRepository = recipeRepository;
        }

        public async Task<Recipe> Add(Recipe recipe)
        {
            await _recipeRepository.Add(recipe);
            return recipe;
        }

        public void Dispose()
        {
            _recipeRepository?.Dispose();
        }

        public async Task<IEnumerable<Recipe>> GetAll()
        {
            return await _recipeRepository.GetAll();
        }

        public async Task<Recipe> GetById(int id)
        {
            return await _recipeRepository.GetById(id);
        }

        public async Task<List<Recipe>> GetRecipesByUserId(string userId)
        {
            return await _recipeRepository.GetRecipesByUserId(userId);
        }

        public async Task<bool> Remove(Recipe recipe)
        {
            await _recipeRepository.Remove(recipe);
            return true;
        }

        public async Task<Recipe> Update(Recipe recipe)
        {
            if (!_recipeRepository.Search(c => c.Id == recipe.Id).Result.Any())
                return null;

            await _recipeRepository.Update(recipe);
            return recipe;
        }
    }
}
