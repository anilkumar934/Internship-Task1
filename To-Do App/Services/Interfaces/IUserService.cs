namespace Services.Interfaces
{
    public interface IUserService
    {
        void AddUser(UserService user);
        IEnumerable<UserService> GetUsers();
    }
}