namespace EmployeeDirectory_webApi.Models
{
    public class Role
    {
        public string? RoleId { get; set; }
        public string? RoleName { get; set; }
        public string? DepartmentId { get; set; }
        public Department? Department { get; set; }
    }
}
