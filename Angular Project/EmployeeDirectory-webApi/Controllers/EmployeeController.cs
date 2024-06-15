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
    public class EmployeeController : ControllerBase
    {
        private readonly IAppRepository<Employee> _appRepository;
        private readonly IMapper _mapper;
        public EmployeeController(IAppRepository<Employee> appRepository, IMapper mapper)
        {
            _appRepository = appRepository;
            _mapper = mapper;
        }



        [HttpGet("All")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<Employee>> GetEmployees()
        {
            var employees = _appRepository.GetAll();
            if (employees == null)
            {
                return NotFound("No EMployees Registered");
            }
            return Ok(employees);
        }


        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Employee> GetEmployeeById(string id)
        {
            var employee = _appRepository.GetById(id);
            if (employee == null)
            {
                return BadRequest("Requested employee Not Found");
            }
            return Ok(employee);
        }




        [HttpPost("filters")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<IEnumerable<Employee>> GetEmployeeByFName([FromBody] Filter filters)
        {
            var employees = _appRepository.GetAll();
            var x=employees.Where(e =>(string.IsNullOrEmpty(filters.Alphabet + "") || e.FirstName![0] == filters.Alphabet));
            x = x.Where(e => (filters.Locations.Count == 0 || filters.Locations.Contains(e.Location))
                                        && (filters.Departments.Count == 0 || filters.Departments.Contains(e.Department)));
            return Ok(x);

        }



        [HttpPost("Add")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Employee> AddEmployee([FromBody] EmployeeDTO dto)
        {
            if (dto == null)
            {
                return BadRequest("Data Should Not Empty");
            }
            var newEmployee = _mapper.Map<Employee>(dto);
            _appRepository.Create(newEmployee);
            return Ok(newEmployee);
        }




        [HttpDelete("Delete")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult DeleteEmployee(string id)
        {
            var employee = _appRepository.GetById(id);
            if (employee == null)
            {
                return NotFound();
            }
            _appRepository.Delete(employee);
            return Ok(true);
        }
    }
}
