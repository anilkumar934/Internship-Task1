using AutoMapper;
using EmployeeDirectory_webApi.DTOs;
using EmployeeDirectory_webApi.Models;

namespace EmployeeDirectory_webApi.Mappers
{
    public class Mapper:Profile
    {
        public Mapper()
        {
            CreateMap<Location,LocationDTO>().ReverseMap();
            CreateMap<Employee,EmployeeDTO>().ReverseMap();
            CreateMap<Department,DepartmentDTO>().ReverseMap();
            CreateMap<Role,RoleDTO>().ReverseMap();
        }
    }
}
