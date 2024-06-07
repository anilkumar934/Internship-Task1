namespace Constants
{

    enum MainMenu
    {
        EmployeeManagement = 1,
        RoleManagement,
        Exit,
        count = 3
    }

    enum EmployeeMenu
    {
        AddEmployee = 1,
        DisplayEmployeeTable,
        DisplayEmployee,
        EditEmployee,
        DeleteEmployee,
        GoBack,
        count = 6
    }

    enum RoleMenu
    {
        AddRow = 1,
        DisplayAllRoles,
        GoBack,
        count = 3
    }    


    enum EditEmployeeMenu
    {
        FirstName = 1,
        LastName,
        DateOfBirth,
        Email,
        MobileNumber,
        JoinDate,
        Location,
        JobTitle,
        Department,
        Manager,
        Project,
        GoBack,
        count = 12
    }
}