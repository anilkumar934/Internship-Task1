using AutoMapper;
using EmployeeDirectory_webApi.DTOs;
using EmployeeDirectory_webApi.Models;
using EmployeeDirectory_webApi.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeDirectory_webApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IAppRepository<Department> _appRepository;
        private readonly IMapper _mapper;
        public DepartmentController(IAppRepository<Department> appRepository, IMapper mapper)
        {
            _appRepository = appRepository;
            _mapper = mapper;
        }



        [HttpGet("All")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<Department>> GetDEpartments()
        {
            var departments = _appRepository.GetAll();
            if (departments == null)
            {
                return NotFound("No Departments Registered");
            }
            return Ok(departments);
        }




        [HttpGet("{id}/Id")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Department> GetDepartment(string id)
        {
            var department = _appRepository.GetById(id);
            if (department == null)
            {
                return BadRequest("Requested department Not Found");
            }
            return Ok(department);
        }



        [HttpPost("Add")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Department> AddDepartment([FromBody] DepartmentDTO dto)
        {
            if (dto == null)
            {
                return BadRequest("Data Should Not Empty");
            }
            var newDepartment = _mapper.Map<Department>(dto);
            _appRepository.Create(newDepartment);
            return Ok(newDepartment);
        }




        [HttpDelete("Delete")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult DeleteDepartment(string id)
        {
            var department = _appRepository.GetById(id);
            if (department == null)
            {
                return NotFound();
            }
            _appRepository.Delete(department);
            return Ok(true);
        }
    }
}
