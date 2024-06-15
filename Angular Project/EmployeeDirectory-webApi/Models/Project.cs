namespace EmployeeDirectory_webApi.Models
{
    public class Project
    {
        public string Id { get; set; }
        public string? Name { get; set; }
        public DateOnly? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? Description { get; set; }
    }
}
