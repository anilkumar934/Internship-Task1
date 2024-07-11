using Repositories;
using Repositories.Models;
using Services.Interfaces;

namespace Services
{
    public class TaskService : ITaskService
    {
        private readonly IAppRepository<UserTask> _repository;
        public TaskService(IAppRepository<UserTask> repository)
        {
            _repository = repository;
        }

        public IEnumerable<UserTask> GetAllTasks()
        {
            return _repository.GetAll();
        }

        public UserTask GetTaskById(int id)
        {
            return _repository.GetById(id);
        }

        public void Add(UserTask task)
        {
            _repository.Create(task);
        }

        public void Delete(UserTask task)
        {
            _repository.Delete(task);
        }

        public void Update(UserTask task)
        {
            _repository.Update(task);
        }
    }
}
