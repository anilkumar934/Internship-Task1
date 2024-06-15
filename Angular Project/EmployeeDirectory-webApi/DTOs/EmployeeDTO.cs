namespace EmployeeDirectory_webApi.DTOs
{
    public class EmployeeDTO
    {
        public string? EmployeeId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateOnly? DateOfBirth { get; set; }
        public string? Email { get; set; }
        public string? MobileNumber { get; set; }
        public DateOnly? JoinDate { get; set; }
        public string? Location { get; set; }
        public string? JobTitle { get; set; }
        public string? Department { get; set; }
        public string? Manager { get; set; }
        public string? Project { get; set; }
    }
}
