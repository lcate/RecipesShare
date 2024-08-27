using Microsoft.EntityFrameworkCore;
using RecipesSharing.Domain.Entities;
using RecipesSharing.Domain.Interfaces;
using RecipesSharing.Infrastructure.Context;

namespace RecipesSharing.Infrastructure.Repositories
{
    public class CommentRepository : Repository<Comment>, ICommentRepository
    {
        public CommentRepository(RecipesDbContext context) : base(context) { }

        public override async Task<List<Comment>> GetAll()
        {
            return await Db.Comments.Include(b => b.Recipe)
                .OrderBy(c => c.Id)
                .ToListAsync();
        }

        public override async Task<Comment?> GetById(int id)
        {
            return await Db.Comments
                .Where(b => b.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task<List<Comment>> GetCommentsByRecipeId(int recipeId)
        {
            return await Db.Comments.Include(c => c.Recipe)
                            .Where(c => c.RecipeFk == recipeId)
                            .ToListAsync();
        }
    }
}
