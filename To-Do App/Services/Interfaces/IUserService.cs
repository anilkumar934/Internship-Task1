using Repositories.Models;

namespace Services.Interfaces
{
    public interface IUserService
    {
        void AddUser(User user);
        IEnumerable<User> GetUsers();
    }
}