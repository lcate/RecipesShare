
using Microsoft.EntityFrameworkCore;
using RecipesSharing.Domain.Entities;
using RecipesSharing.Domain.Interfaces;
using RecipesSharing.Infrastructure.Context;

namespace RecipesSharing.Infrastructure.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : BaseEntity
    {
        protected readonly RecipesDbContext Db;

        protected readonly DbSet<TEntity> DbSet;
        protected Repository(RecipesDbContext db)
        {
            Db = db;
            DbSet = db.Set<TEntity>();
        }

        public virtual async Task Add(TEntity entity)
        {
            DbSet.Add(entity);
            await SaveChanges();
        }

        public void Dispose()
        {
            Db?.Dispose();
        }

        public virtual async Task<List<TEntity>> GetAll()
        {
            return await DbSet.ToListAsync();
        }

        public virtual async Task<TEntity> GetById(int id)
        {
            return await DbSet.FindAsync(id);
        }

        public virtual async Task Remove(TEntity entity)
        {
            DbSet.Remove(entity);
            await SaveChanges();
        }

        public async Task<int> SaveChanges()
        {
            return await Db.SaveChangesAsync();
        }

        public async Task<IEnumerable<TEntity>> Search(System.Linq.Expressions.Expression<Func<TEntity, bool>> predicate)
        {
            return await DbSet.Where(predicate).ToListAsync();
        }

        public virtual async Task Update(TEntity entity)
        {
            DbSet.Update(entity);
            await SaveChanges();
        }
    }
}
