using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Nodes;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Models.DTOs;
using Repositories;
using Repositories.Models;
using Repositories.Mappers;

namespace To_Do_List.Controllers
{
    [Route("api/[controller]")]
  [ApiController]
  public class UserController : ControllerBase
  {
    private readonly IAppRepository<User> _appRepository;
    private readonly IMapper _mapper;
    private readonly IConfiguration _config;
    public UserController(IAppRepository<User> appRepository, IMapper mapper,IConfiguration configuration)
    {
      _appRepository = appRepository;
      _mapper = mapper;
      _config = configuration;
    }


    [HttpGet("Name/{name}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<User> GetUserByName(string name)
    {
        var user = _appRepository.GetAll().FirstOrDefault(u => u.UserName == name);
            if (user == null)
            {
                return NotFound(new {message = "Requested User Not Found" });
            }
        return Ok(user);
    }



    [HttpPost("Add")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public ActionResult AddUser([FromBody] UserDTO dto)
    {
            var user = _appRepository.GetAll().FirstOrDefault(u => u.UserName == dto.UserName);
            if (user != null) { return BadRequest(new { message = false }); }
            var newUser = _mapper.Map<User>(dto);
            _appRepository.Create(newUser);
            return Ok(new { message = true });
    }


    [HttpPost("validate")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<LoginDTO> validateUser([FromBody] UserDTO validateUser)
    {
        var users = _appRepository.GetAll();
        LoginDTO response = new() { UserName = validateUser.UserName};
        foreach (var user in users)
        {
            if(user.UserName == validateUser.UserName && user.Password == validateUser.Password) {

                var key = Encoding.ASCII.GetBytes(_config.GetValue<string>("JWTSecret")!);
                var tokenHandler = new JwtSecurityTokenHandler();
                var tokenDescriptor = new SecurityTokenDescriptor()
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub,user.Id.ToString())
                    }),
                    Expires = DateTime.Now.AddHours(4),
                    SigningCredentials = new(new SymmetricSecurityKey(key),SecurityAlgorithms.HmacSha512Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                response.token = tokenHandler.WriteToken(token);
                 break; 
            }
        }
        return Ok(response);
    }

    [HttpGet("isauthorized")]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<JsonObject> isAuthorized()
    {
        
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId) || !int.TryParse(userId, out var parsedUserId))
        {
            return Unauthorized(new {message = false});
        }
        return Ok(new { message = true });
    }

    }
}
