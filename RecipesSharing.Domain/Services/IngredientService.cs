using RecipesSharing.Domain.Entities;
using RecipesSharing.Domain.Interfaces;

namespace RecipesSharing.Domain.Services
{
    public class IngredientService : IIngredientService
    {
        private readonly IIngredientRepository _ingredientRepository;

        public IngredientService(IIngredientRepository recipeRepository)
        {
            _ingredientRepository = recipeRepository;
        }

        public async Task<Ingredient> Add(Ingredient recipe)
        {
            await _ingredientRepository.Add(recipe);
            return recipe;
        }

        public void Dispose()
        {
            _ingredientRepository?.Dispose();
        }

        public async Task<IEnumerable<Ingredient>> GetAll()
        {
            return await _ingredientRepository.GetAll();
        }

        public async Task<Ingredient?> GetById(int id)
        {
            return await _ingredientRepository.GetById(id);
        }

        public async Task<Ingredient> GetByName(string name)
        {
            return await _ingredientRepository.GetByName(name);
        }

        public async Task<Ingredient> Update(Ingredient recipe)
        {
            if (!_ingredientRepository.Search(c => c.Id == recipe.Id).Result.Any())
                return null;

            await _ingredientRepository.Update(recipe);
            return recipe;
        }
    }
}
