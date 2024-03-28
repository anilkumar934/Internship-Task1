using Entity;

namespace DataBase
{
    class DataStore
    {
        public static Dictionary<string,Employee> EmployeeData = new Dictionary<string, Employee>();
        public static Dictionary<string,Role> RoleData = new Dictionary<string, Role>();
    }
}