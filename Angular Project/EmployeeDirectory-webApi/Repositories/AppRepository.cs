using Microsoft.EntityFrameworkCore;

namespace EmployeeDirectory_webApi.Repositories
{
    public class AppRepository<T>:IAppRepository<T> where T : class
    {
        private readonly AppDBcontext _context;
        private readonly DbSet<T> _dbSet;

        public AppRepository(AppDBcontext dBcontext)
        {
            _context = dBcontext;
            _dbSet = dBcontext.Set<T>();
        }

        public IEnumerable<T> GetAll()
        {
            return _dbSet.ToList();
        }
        public T GetById(string id)
        {
            return _dbSet.Find(id)!;
        }

        public void Create(T entity)
        {
            _dbSet.Add(entity);
            _context.SaveChanges();
        }

        public void Delete(T entity)
        {
            if (entity != null)
            {
                _dbSet.Remove(entity);
                _context.SaveChanges();
            }
        }
        public void Update(T entity)
        {
            _context.Update(entity);
        }

    }
}
