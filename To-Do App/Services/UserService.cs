using Repositories.Models;
using Repositories;
using Services.Interfaces;


namespace Services
{
    public class UserService : IUserService
    {
        private readonly IAppRepository<User> _repository;
        public UserService(IAppRepository<User> appRepository)
        {
            _repository = appRepository;
        }


        public IEnumerable<User> GetUsers()
        {
            return _repository.GetAll().ToList();
        }

        public void AddUser(User user)
        {
            _repository.Create(user);
        }

       
    }
}
