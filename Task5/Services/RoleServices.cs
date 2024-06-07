using Entity;
using Constants;
using Inputs;
using DataBase;
using Utility;
using ConsoleTables;
namespace RoleManagement
{
    public class RoleService
    {
        public void AddNewRole()
        {
            Role newRole = new Role()
            {
                RoleName = InputServices.GetString(RoleValidationDetails.roleName),
                Department = InputServices.GetString(RoleValidationDetails.department),
                Description = InputServices.GetString(RoleValidationDetails.description),
                Location = InputServices.GetString(RoleValidationDetails.location)
            };
            DataStore.roleData.Add(newRole.RoleName,newRole);
        }

        public void DisplayAllRoles(Dictionary<string,Role>roleInfo)
        {
            ConsoleTable table = OutputUtility.GenerateTableForRole();
            foreach (Role item in roleInfo.Values)
            {
                AddRoleRow(item,table);
            }   
            Console.WriteLine(table);
        }

        private void AddRoleRow(Role item,ConsoleTable table)
        {
            table.AddRow(item.RoleName,item.Department,item.Description,item.Location);
        }
    }
}