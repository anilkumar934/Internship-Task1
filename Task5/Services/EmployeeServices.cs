using Entity;
using Constants;
using Inputs;
using DataBase;
using ConsoleTables;
using Utility;

namespace EmployeeManagement
{
    class EmployeeService
    {
        Input HandleData = new Input();
        public void AddEmployee()
        {
            string EmployeeId = HandleData.GetValue("Employee Id", "Required", RegularExpressions.EmployeeIdRegex,"TZ0000");
            string FirstName = HandleData.GetValue("First Name", "Required", RegularExpressions.NameRegex,"Anil");
            string LastName = HandleData.GetValue("Last Name", "Required", RegularExpressions.NameRegex,"Ak");
            DateTime? DateOfBirth = HandleData.GetDate("Date Of Birth", "Optional", RegularExpressions.DateRegex,"01-01-2000");
            string Email = HandleData.GetValue("Email", "Required", RegularExpressions.EmailRegex,"anil@tech.com");
            long? MobileNumer = HandleData.GetNumber("Mobile Number", "Optional", RegularExpressions.MobileNumberRegex,"0000000000");
            DateTime JoinDate = HandleData.GetDate("Date", "Required", RegularExpressions.DateRegex,"01-01-2000");
            string Location = HandleData.GetValue("Location", "Required", "","HYD");
            string JobTitle = HandleData.GetValue("Role", "Required", "","FSD");
            string Department = HandleData.GetValue("Department", "Required", "","PE");
            string? Manager = HandleData.GetValue("Manager", "optional", "","ManagerName");
            string? Project = HandleData.GetValue("Project", "optional", "","projectName");
            Employee NewEmployee = new Employee(EmployeeId, FirstName, LastName, DateOfBirth, Email, MobileNumer, JoinDate, Location, JobTitle, Department, Manager, Project);
            AddEmployeeToDataStore(NewEmployee);
            Console.WriteLine("Employee is successfully Added to directory .");
        }

        public void DisplayEmployees(Dictionary<string, Employee> EmployeeInfo)
        {
            ConsoleTable table = OutputUtility.CreateTableForEmployee();
            foreach (Employee person in EmployeeInfo.Values)
            {
                table.AddRow(person.EmployeeId, person.FirstName + " " + person.LastName, person.JobTitle, person.Department, person.Location, person.JoinDate, person.Manager, person.Project);
            }
            Console.WriteLine(table);
            // if (EmployeeInfo.Count == 0) Console.WriteLine(DisplayOptions.DataNotFound + DisplayOptions.Line);
        }

        public void DisplayEmployeeById()
        {
            string Id = HandleData.ValidateId();
            Employee person = DataStore.EmployeeData[Id!];
            ConsoleTable table = OutputUtility.CreateTableForEmployee();
            table.AddRow(person.EmployeeId, person.FirstName + " " + person.LastName, person.JobTitle, person.Department, person.Location, person.JoinDate, person.Manager, person.Project);
            Console.WriteLine(table);
        }

        public void EditEmployeeById()
        {
            string Id = HandleData.ValidateId();
            Console.WriteLine(DisplayOptions.EditEmployeeOptions + DisplayOptions.choiceMessage);
            // switch (OutputUtility.GetChoice(Convert.ToInt32(MenuOptionsCount.)));
        }

        public void DeleteEmployeeById()
        {
            string Id = HandleData.ValidateId();
            DataStore.EmployeeData.Remove(Id!);
            Console.WriteLine("\nEmployee Deleted Successfully .");
        }

        private void AddEmployeeToDataStore(Employee NewEmployee)
        {
            DataStore.EmployeeData.Add(NewEmployee.EmployeeId, NewEmployee);
        }
    }
}
