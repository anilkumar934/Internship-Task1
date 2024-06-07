using Constants;
using EmployeeManagement;
using DataBase;
using Utility;
using Inputs;
using RoleManagement;

namespace MenuManagement
{
    class Menus
    {
        private EmployeeService _employeeService = new();
        private RoleService _roleService = new();
        public void ShowMainMenu()
        {
            Console.Write("\nMain Menu" + DisplayOptions.lineBreak + DisplayOptions.mainMenuOptions + DisplayOptions.choiceMessage);
            MainMenu choice = (MainMenu)OutputUtility.GetChoice(Convert.ToInt32(MainMenu.count));
            switch (choice)
            {
                case MainMenu.EmployeeManagement:
                    ShowEmployeeMenu();
                    break;
                case MainMenu.RoleManagement:
                    ShowRoleMenu();
                    break;
                case MainMenu.Exit:
                    OutputUtility.StoreData(DataStore.employeeData, EmployeeValidationDetails.employeeDataPath);
                    return;
                default:
                    break;
            }
            ShowMainMenu();
        }

        public void ShowEmployeeMenu()
        {
            Console.Write("\nEmployee Management Menu" + DisplayOptions.lineBreak + DisplayOptions.employeeMenuOptions + DisplayOptions.choiceMessage);
            EmployeeMenu choice = (EmployeeMenu)OutputUtility.GetChoice(Convert.ToInt32(EmployeeMenu.count));
            switch (choice)
            {
                case EmployeeMenu.AddEmployee:
                    _employeeService.AddEmployee();
                    break;
                case EmployeeMenu.DisplayEmployeeTable:
                    _employeeService.DisplayEmployeeTable(DataStore.employeeData);
                    break;
                case EmployeeMenu.DisplayEmployee:
                    string id = InputServices.ValidateId();
                    _employeeService.DisplayEmployee(id);
                    break;
                case EmployeeMenu.EditEmployee:
                    _employeeService.EditEmployee();
                    break;
                case EmployeeMenu.DeleteEmployee:
                    _employeeService.DeleteEmployee();
                    break;
                case EmployeeMenu.GoBack:
                    return;
                default:
                    break;
            }
            ShowEmployeeMenu();
        }

        private void ShowRoleMenu()
        {
            Console.Write("\nRole Management Menu" + DisplayOptions.lineBreak + DisplayOptions.roleMenuOptions + DisplayOptions.choiceMessage);
            RoleMenu choice = (RoleMenu)OutputUtility.GetChoice(Convert.ToInt32(RoleMenu.count));
            switch (choice)
            {
                case RoleMenu.AddRow:
                    _roleService.AddNewRole();
                    break;
                case RoleMenu.DisplayAllRoles:
                    _roleService.DisplayAllRoles(DataStore.roleData);
                    break;
                case RoleMenu.GoBack:
                    return;
                default:
                    break;
            }
            ShowRoleMenu();
        }

    }
}