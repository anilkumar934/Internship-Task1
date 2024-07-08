using Repositories;
using Services.Interfaces;


namespace Services
{
    public class UserService : IUserService
    {
        private readonly IAppRepository<UserService> _repository;
        public UserService(IAppRepository<UserService> appRepository)
        {
            _repository = appRepository;
        }


        public IEnumerable<UserService> GetUsers()
        {
            return _repository.GetAll().ToList();
        }

        public void AddUser(UserService user)
        {
            _repository.Create(user);
        }

    }
}
