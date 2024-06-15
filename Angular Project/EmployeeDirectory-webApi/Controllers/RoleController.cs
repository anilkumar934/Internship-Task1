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
    public class RoleController : ControllerBase
    {
        private readonly IAppRepository<Role> _appRepository;
        private readonly IMapper _mapper;
        public RoleController(IAppRepository<Role> appRepository,IMapper mapper)
        {
            _appRepository = appRepository;
            _mapper = mapper;
        }

        [HttpGet("All")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<Role>> GetRoles()
        {
            var roles = _appRepository.GetAll();
            if (roles == null)
            {
                return NotFound("No Roles Registered");
            }
            return Ok(roles);
        }




        [HttpGet("{id}/Id")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Role> GetRole(string id)
        {
            var role = _appRepository.GetById(id);
            if (role == null)
            {
                return BadRequest("Requested Role Not Found");
            }
            return Ok(role);
        }



        [HttpPost("Add")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<RoleDTO> AddRole([FromBody] RoleDTO dto)
        {
            if (dto == null)
            {
                return BadRequest("Data Should Not Empty");
            }
            var newRole = _mapper.Map<Role>(dto);
            _appRepository.Create(newRole);
            return Ok(newRole);
        }




        [HttpDelete("Delete")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult DeleteRole(string id)
        {
            var role = _appRepository.GetById(id);
            if (role == null)
            {
                return NotFound();
            }
            _appRepository.Delete(role);
            return Ok(true);
        }

    }
}
