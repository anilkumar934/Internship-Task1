namespace EmployeeDirectory_webApi.Models
{
    public class Department
    {
        public string? DepartmentId { get; set; }
        public string? DepartmentName { get; set; }
        public string? LocationId { get; set; }
        public ICollection<Role>? Roles { get; set; }
        public Location? Location { get; set; }
    }
}
