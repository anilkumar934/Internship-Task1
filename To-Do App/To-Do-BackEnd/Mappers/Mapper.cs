using AutoMapper;
using Models.DTOs;
using Repositories.Models;

namespace Repositories.Mappers
{
    public class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap<UserTask, UserTaskDTO>().ReverseMap();
            CreateMap<User, UserDTO>().ReverseMap();
        }
    }
}
