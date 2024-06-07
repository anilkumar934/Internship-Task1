using Entity;
using Constants;
using Inputs;
using DataBase;
using ConsoleTables;
using Utility;
using System.Reflection;
using MenuManagement;


namespace EmployeeManagement
{
    class EmployeeService
    {
        public void AddEmployee()
        {
            Employee newEmployee = GetEmployeeData();
            AddEmployeeToDataStore(newEmployee);
            OutputUtility.Delay();
            Console.WriteLine(DisplayOptions.dataAddSuccessMsg);
            OutputUtility.Delay();
        }

        public void DisplayEmployeeTable(Dictionary<string,Employee> employeeInfo)
        {
            ConsoleTable table = OutputUtility.GenerateTableForEmployee();
            foreach (Employee person in employeeInfo.Values)
            {
                AddEmployeeRow(person,table);   
            }
            OutputUtility.Delay();
            Console.WriteLine(table);
        }

        public void DisplayEmployee(string id)
        {
            if (DataStore.employeeData.Count == 0)
            {
                Console.WriteLine(DisplayOptions.lineBreak + DisplayOptions.directoryEmpty + DisplayOptions.lineBreak);
                return;
            }
            Employee person = DataStore.employeeData[id!];
            ConsoleTable table = OutputUtility.GenerateTableForEmployee();
            AddEmployeeRow(person,table);
            OutputUtility.Delay();
            Console.WriteLine(table);
        }

        public void EditEmployee()
        {
            if (DataStore.employeeData.Count == 0)
            {
                Console.WriteLine(DisplayOptions.lineBreak + DisplayOptions.directoryEmpty + DisplayOptions.lineBreak);
                return;
            }
            DisplayEmployeeTable(DataStore.employeeData);
            string id = InputServices.ValidateId();
            Employee employeeToEdit = DataStore.employeeData[id];
            while (true)
            {
                Console.Write(DisplayOptions.editEmployeeOptions + DisplayOptions.choiceMessage);
                EditEmployeeMenu option = (EditEmployeeMenu)OutputUtility.GetChoice(Convert.ToInt32(EditEmployeeMenu.count));
                switch (option)
                {
                    case EditEmployeeMenu.FirstName:
                        EditEmployeeSpecificField(employeeToEdit, EmployeeValidationDetails.firstName);
                        break;
                    case EditEmployeeMenu.LastName:
                        EditEmployeeSpecificField(employeeToEdit, EmployeeValidationDetails.lastName);
                        break;
                    case EditEmployeeMenu.DateOfBirth:
                        EditEmployeeSpecificField(employeeToEdit, EmployeeValidationDetails.dateOfBirth);
                        break;
                    case EditEmployeeMenu.Email:
                        EditEmployeeSpecificField(employeeToEdit, EmployeeValidationDetails.email);
                        break;
                    case EditEmployeeMenu.MobileNumber:
                        EditEmployeeSpecificField(employeeToEdit, EmployeeValidationDetails.mobileNumber);
                        break;
                    case EditEmployeeMenu.JoinDate:
                        EditEmployeeSpecificField(employeeToEdit, EmployeeValidationDetails.joinDate);
                        break;
                    case EditEmployeeMenu.Location:
                        EditEmployeeSpecificField(employeeToEdit, EmployeeValidationDetails.location);
                        break;
                    case EditEmployeeMenu.JobTitle:
                        EditEmployeeSpecificField(employeeToEdit, EmployeeValidationDetails.jobTitle);
                        break;
                    case EditEmployeeMenu.Department:
                        EditEmployeeSpecificField(employeeToEdit, EmployeeValidationDetails.department);
                        break;
                    case EditEmployeeMenu.Manager:
                        EditEmployeeSpecificField(employeeToEdit, EmployeeValidationDetails.manager);
                        break;
                    case EditEmployeeMenu.Project:
                        EditEmployeeSpecificField(employeeToEdit,EmployeeValidationDetails.Project);
                        break;
                    case EditEmployeeMenu.GoBack:
                        Menus newMenu = new();
                        newMenu.ShowEmployeeMenu();
                        break;
                }
            }
        }

        public void DeleteEmployee()
        {
            if (DataStore.employeeData.Count == 0)
            {
                Console.WriteLine(DisplayOptions.lineBreak + DisplayOptions.directoryEmpty + DisplayOptions.lineBreak);
                return;
            }
            string id = InputServices.ValidateId();
            DataStore.employeeData.Remove(id!);
            OutputUtility.Delay();
            Console.WriteLine(DisplayOptions.delSuccessMsg);
            OutputUtility.Delay();
        }

        private Employee GetEmployeeData()
        {
            Employee employeeInfo = new()
            {
                EmployeeId = InputServices.GetString(EmployeeValidationDetails.employeeId),
                FirstName = InputServices.GetString(EmployeeValidationDetails.firstName),
                LastName = InputServices.GetString(EmployeeValidationDetails.lastName),
                DateOfBirth = InputServices.GetDate(EmployeeValidationDetails.dateOfBirth),
                Email = InputServices.GetString(EmployeeValidationDetails.email),
                MobileNumber = InputServices.GetString(EmployeeValidationDetails.mobileNumber),
                JoinDate = InputServices.GetDate(EmployeeValidationDetails.joinDate),
                Location = InputServices.GetString(EmployeeValidationDetails.location),
                JobTitle = InputServices.GetString(EmployeeValidationDetails.jobTitle),
                Department = InputServices.GetString(EmployeeValidationDetails.department),
                Manager = InputServices.GetString(EmployeeValidationDetails.manager),
                Project = InputServices.GetString(EmployeeValidationDetails.Project),
            };
            return employeeInfo;
        }

        private void AddEmployeeToDataStore(Employee newEmployee)
        {
            DataStore.employeeData.Add(newEmployee.EmployeeId!, newEmployee);
        }

        private void EditEmployeeSpecificField(Employee emp, ValidatingData EmployeeValidationDetails)
        {
            Type type = emp.GetType();
            PropertyInfo[] properties = type.GetProperties();
            foreach (PropertyInfo property in properties)
            {
                if (EmployeeValidationDetails.InputValue == Convert.ToString(property.Name))
                {
                    Console.WriteLine("Current Value is : " + property.GetValue(emp));
                    if (property.GetValue(emp)!.GetType() == typeof(string))
                    {
                        property.SetValue(emp, InputServices.GetString(EmployeeValidationDetails));
                    }
                    else
                    {
                        property.SetValue(emp, InputServices.GetDate(EmployeeValidationDetails));
                    }
                    return;
                }
            }
            DisplayEmployee(emp.EmployeeId!);
        }
        private void AddEmployeeRow(Employee person,ConsoleTable table)
        {
            table.AddRow(person.EmployeeId, person.FirstName + " " + person.LastName, person.DateOfBirth,person.Email,person.MobileNumber,person.JoinDate,person.Location,person.JobTitle, person.Department,  person.Manager, person.Project);
        }

    }
}
