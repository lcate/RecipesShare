using Microsoft.EntityFrameworkCore;
using RecipesSharing.Domain.Entities;
using RecipesSharing.Domain.Interfaces;
using RecipesSharing.Infrastructure.Context;

namespace RecipesSharing.Infrastructure.Repositories
{
    public class RecipeRepository : Repository<Recipe>, IRecipeRepository
    {
        public RecipeRepository(RecipesDbContext context): base(context) { }

        public override async Task<List<Recipe>> GetAll()
        {
            return await Db.Recipes
                .Include(x => x.Ratings)
                .Include(x => x.RecipeIngredients)
                    .ThenInclude(x => x.Ingredient)
                .OrderBy(c => c.Id)
                .ToListAsync();
        }

        public override async Task<Recipe?> GetById(int id)
        {
            Recipe? recipe = await Db.Recipes
                .Include(x => x.RecipeSteps)
                .Include(x => x.RecipeAppliances)
                .Include(x => x.RecipeIngredients)
                    .ThenInclude(x => x.Ingredient)
                .Include(x => x.Ratings)
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();

            return recipe;
        }

        public async Task<List<Recipe>> GetRecipesByUserId(string userId)
        {
            return await Db.Recipes
                .Where(b => b.UserFk == userId)
                .ToListAsync();
        }

        public async Task<List<Recipe>> GetLastThreeRecipes()
        {
            return await Db.Recipes
                .Include(x => x.Ratings)
                .OrderByDescending(x => x.Id)
                .Take(3)
                .ToListAsync();
        }
    }
}
