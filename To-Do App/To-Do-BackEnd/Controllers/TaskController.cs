using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.DTOs;
using Repositories.Models;
using Services.Interfaces;

namespace To_Do_List.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class TaskController : ControllerBase
    {
        private readonly ITask _task;
        private readonly IMapper _mapper;
        public TaskController(ITask _taskService, IMapper mapper)
        {
            _task = _taskService;
            _mapper = mapper;
        }


        [HttpGet("Status/{status}")]
        public ActionResult<IEnumerable<Task>> GetTasksByStatus(string status)
        {
            var tasks = _task.GetAllTasks().Where(t => t.UserId == int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!) && (t.status == status || status == "Dashboard"));
            tasks =  tasks.OrderBy(task => task.status).ToList();
            return Ok(tasks);
        }


        [HttpPost("Add")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<UserTask> AddTask([FromBody] UserTaskDTO dto)
        {
            int UserId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            if (dto == null)
            {
                return BadRequest("Data Should Not Empty");
            }
            var newTask = _mapper.Map<UserTask>(dto);
            newTask.UserId = UserId;
            newTask.AddedDate = DateTime.Now;
            _task.Add(newTask);
            return Ok(newTask);
        }




        [HttpDelete("Delete/{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult DeleteTask(int id)
        {
          int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
          var task = _task.GetTaskById(id);
          if (task == null)
          {
            return NotFound();
          }
            if (task.UserId != userId) return BadRequest("Unauthorized user deleting Task");
          _task.Delete(task);
          return Ok(true);
        }




        [HttpPut("{id}")]
        public ActionResult<UserTask> UpdateTask(int id,[FromBody] UserTaskDTO taskDto)
        {
            int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var task = _task.GetTaskById(id);
            if(task.UserId != userId)
            {
                return Unauthorized(new {Error = "Unknow user"});
            }
            var updatetask = _mapper.Map(taskDto, task);
            _task.Update(updatetask);
            return Ok(new { Message="success"});
        }

    }
}
