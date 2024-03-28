using Entity;
using Constants;
using Inputs;
using DataBase;
namespace RoleManagement
{
    public class RoleService
    {
        Input HandleData = new Input();
        public void AddNewRole()
        {
            string RoleName = HandleData.GetValue("RoleName","Required",RegularExpressions.NameRegex,"Name");
            string Department = HandleData.GetValue("Department","Required",RegularExpressions.NameRegex,"department");
            string Description = HandleData.GetValue("Description","Optional",RegularExpressions.NameRegex,"Description");
            string Location = HandleData.GetValue("Location","Required",RegularExpressions.NameRegex,"Location");
            Role NewRole = new Role(RoleName,Department,Description,Location);
            DataStore.RoleData.Add(NewRole.RoleName,NewRole);
        }

        public void DisplayAllRoles(Dictionary<string,Role>RoleInfo)
        {
            foreach (Role item in RoleInfo.Values)
            {
                Console.WriteLine($"{item.RoleName}    {item.Department}   {item.Description}   {item.Location}");
            }   
        }

    }
}