using AutoMapper;
using EmployeeDirectory_webApi.Models;
using EmployeeDirectory_webApi.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeDirectory_webApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IAppRepository<Project> _appRepository;
        public ProjectController(IAppRepository<Project> appRepository)
        {
            _appRepository = appRepository;
        }



        [HttpGet("All")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<Project>> GetProjects()
        {
            var projects = _appRepository.GetAll();
            if (projects == null)
            {
                return NotFound("No Departments Registered");
            }
            return Ok(projects);
        }
    }
}
