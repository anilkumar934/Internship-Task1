namespace EmployeeDirectory_webApi.Models
{
    public class Filter
    {
        public char? Alphabet { get; set; }
        public ICollection<string>? Status { get; set; }
        public ICollection<string>? Locations { get; set; }
        public ICollection<string>? Departments { get; set; }
    }
}
