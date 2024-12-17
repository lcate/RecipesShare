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
                .OrderBy(c => c.Id)
                .ToListAsync();
        }

        public override async Task<Recipe> GetById(int id)
        {
            return await Db.Recipes.FindAsync(id);
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
                .OrderByDescending(x => x.Id)
                .Take(3)
                .ToListAsync();
        }
    }
}
