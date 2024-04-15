using Constants;
using Entity;
using Utility;

namespace DataBase
{
    class DataStore
    {
        public static Dictionary<string,Employee> employeeData = OutputUtility.GetData(EmployeeValidationDetails.employeeDataPath);
        public static Dictionary<string,Role> roleData = [];

        // OutputUtility.GetData<Role>(RoleValidationDetails.RoleDataPath)
    }
}