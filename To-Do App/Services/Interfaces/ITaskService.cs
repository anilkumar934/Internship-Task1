using Repositories.Models;

namespace Services.Interfaces
{
    public interface ITaskService
    {
        void Add(UserTask task);
        void Delete(UserTask task);
        IEnumerable<UserTask> GetAllTasks();
        UserTask GetTaskById(int id);
        void Update(UserTask task);
    }
}