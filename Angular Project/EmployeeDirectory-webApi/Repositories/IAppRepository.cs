namespace EmployeeDirectory_webApi.Repositories
{
    public interface IAppRepository<T> where T : class
    {
        IEnumerable<T> GetAll();
        T GetById(string id);
        void Create(T entity);
        void Update(T entity);
        void Delete(T entity);
    }
}
