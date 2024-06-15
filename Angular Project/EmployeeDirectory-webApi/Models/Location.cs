namespace EmployeeDirectory_webApi.Models
{
    public class Location
    {
        public string? LocationId { get; set; }
        public string? LocationName { get; set; }
        public ICollection<Department>? Departments { get; set; }
    }
}
