using Constants;
using EmployeeManagement;
using DataBase;
using Utility;
using RoleManagement;

namespace Menu
{
    class Start
    {
        EmployeeService employee = new EmployeeService();
        RoleService role = new RoleService();
        internal void StartMainMenu()
        {
            Console.WriteLine("\n\nMain Menu");
            Console.Write(DisplayOptions.Line + DisplayOptions.MainMenuOptions + DisplayOptions.choiceMessage);
            switch (OutputUtility.GetChoice(Convert.ToInt32(MenuOptionsCount.ManiMenuCount)))
            {
                case 1:
                    StartEmployeeMenu();
                    break;
                case 2:
                    StartRoleMenu();
                    break;
                case 3:
                    Environment.Exit(0);
                    break;
            }
        }

        private void StartEmployeeMenu()
        {
            Console.WriteLine("\n\nEmployee Management Menu");
            Console.Write(DisplayOptions.Line + DisplayOptions.EmployeeMenuOptions + DisplayOptions.choiceMessage);
            switch (OutputUtility.GetChoice(Convert.ToInt32(MenuOptionsCount.EmployeeManagerCount)))
            {
                case 1:
                    employee.AddEmployee();
                    StartEmployeeMenu();
                    break;
                case 2:
                    employee.DisplayEmployees(DataStore.EmployeeData);
                    StartEmployeeMenu();
                    break;
                case 3:
                    employee.DisplayEmployeeById();
                    StartEmployeeMenu();
                    break;
                case 4:
                    employee.EditEmployeeById();
                    StartEmployeeMenu();
                    break;
                case 5:
                    employee.DeleteEmployeeById();
                    StartEmployeeMenu();
                    break;
                case 6:
                    StartMainMenu();
                    break;
            }
        }

        private void StartRoleMenu()
        {
            Console.WriteLine("\n\nRole Management Menu");
            Console.Write(DisplayOptions.Line + DisplayOptions.RoleMenuOptions + DisplayOptions.choiceMessage);
            switch (OutputUtility.GetChoice(Convert.ToInt32(MenuOptionsCount.RoleManagerCount)))
            {
                case 1:
                    role.AddNewRole();
                    StartRoleMenu();
                    break;
                case 2:
                    role.DisplayAllRoles(DataStore.RoleData);
                    StartRoleMenu();
                    break;
                case 3:
                    StartMainMenu();
                    break;
            }
        }

    }
}