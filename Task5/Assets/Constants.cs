
namespace Constants
{
    enum MenuOptionsCount
    {
        ManiMenuCount = 3,
        EmployeeManagerCount = 6,
        RoleManagerCount = 3
    }
    
    class RegularExpressions 
    {
        public static string EmployeeIdRegex = @"^TZ[0-9]{4}$";
        public static string NameRegex = @"^[a-zA-z]{2,9}$";
        public static string EmailRegex = @"^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";
        public static string MobileNumberRegex = @"^[1-9]{1}[0-9]{9}$";
        public static string DateRegex = @"^(0[1-9]|[12][0-9]|3[01])\-(0[1-9]|1[0-2])\-19[8-9]{2}|20[0-2]{1}[0-9]{1}$";
        public static string IntegerRegex = @"^\d+$";
    }

    class DisplayOptions
    {
        public static string MainMenuOptions = "\n1.Employee Management\n2.Role Management\n3.Exit\n";
        public static string EmployeeMenuOptions = "\n1.Add Employee\n2.Display All Employees\n3.Display One Emploee\n4.Edit Employee\n5.Delete Employee\n6.Go Back\n";
        public static string EditEmployeeOptions = "\n1.Name\n2.Date Of Birth\n3.Email\n4.Mobile Number\n5.Join date\n6.Location\n7.Job Title\n8.Department\n9.Manager\n10.Project";
        public static string RoleMenuOptions = "\n1.Add Role\n2.Display All Roles\n3.GoBack\n";
        public static string Line = "\n------------------------------\n";
        public static string choiceMessage = "\nChoose One option from above(1 or 2 ....) : ";
        public static string DataNotFound = "---------Data Not Found---------\n";
    }


}
