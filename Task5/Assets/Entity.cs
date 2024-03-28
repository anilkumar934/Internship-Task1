namespace Entity
{
    public class Employee
    {
        public string EmployeeId;
        public string FirstName;
        public string LastName;
        public DateTime? DateOfBirth;
        public string Email;
        public long? MobileNumer;
        public DateTime JoinDate;
        public string Location;
        public string JobTitle;
        public string Department;
        public string? Manager;
        public string? Project;
        public Employee(string EmployeeId ,string FirstName,string LastName,DateTime? DateOfBirth,string Email,long? MobileNumer,DateTime JoinDate,string Location,string JobTitle,string Department,string? Manager,string? Project)
        {
            this.EmployeeId = EmployeeId;
            this.FirstName = FirstName;
            this.LastName = LastName;
            this.DateOfBirth = DateOfBirth;
            this.Email = Email;
            this.MobileNumer = MobileNumer;
            this.JoinDate = JoinDate;
            this.Location = Location;
            this.JobTitle = JobTitle;
            this.Department = Department;
            this.Manager = Manager;
            this.Project = Project;
        }
    }
    public class Role
    {
        public string RoleName;
        public string Department;
        public string? Description;
        public string Location;
        public Role(string RoleName,string Department,string? Description,string Location)
        {
            this.RoleName = RoleName;
            this.Department = Department;
            this.Description = Description;
            this.Location = Location;
        }
    }

}