using AutoMapper;
using Azure.Core;
using EmployeeDirectory_webApi.DTOs;
using EmployeeDirectory_webApi.Models;
using EmployeeDirectory_webApi.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeDirectory_webApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly IAppRepository<Location> _appRepository;
        private readonly IMapper _mapper;
        public LocationController(IAppRepository<Location> appRepository,IMapper mapper)
        {
            _appRepository = appRepository;
            _mapper = mapper;
        }



        [HttpGet("All")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<Location>> GetLocations()
        {
            var locations = _appRepository.GetAll();
            if(locations ==  null)
            {
                return NotFound("No Locations Registered");
            }
            return Ok(locations);
        }




        [HttpGet("{id}/Id")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Location> GetLocaton(string id)
        {
            var location = _appRepository.GetById(id);
            if(location == null)
            {
                return BadRequest("Requested location Not Found");
            }
            return Ok(location);
        }



        [HttpPost("Add")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Location> AddLocation([FromBody] LocationDTO dto)
        {
            if (dto == null)
            {
                return BadRequest("Data Should Not Empty");
            }
            var newLocation = _mapper.Map<Location>(dto);
            _appRepository.Create(newLocation);
            return Ok(newLocation);
        }




        [HttpDelete("Delete")]
        public ActionResult DeleteLocation(string id)
        {
            var location = _appRepository.GetById(id);
            if (location == null)
            {
                return NotFound();
            }
            _appRepository.Delete(location);
            return Ok(true);
        }
    }
}
