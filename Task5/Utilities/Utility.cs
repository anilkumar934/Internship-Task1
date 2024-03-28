using System.Text.RegularExpressions;
using ConsoleTables;
using Constants;


namespace Utility
{
    class OutputUtility
    {
        public static int GetChoice(int MenuCount)
        {
            string? choice = Console.ReadLine();
            
            if(choice != "" && choice!.Trim() != "" && Regex.IsMatch(choice,RegularExpressions.IntegerRegex)){
                int Number = Convert.ToInt32(choice);
                if(Number <= MenuCount && Number >= 1) return Number;
                goto Error;
            }
            goto Error;
            Error : {
                    Console.Write("Entered Value is Not Matching .\nPlease Enter the Options From above : ");
                    return GetChoice(MenuCount);
                }   
        }
        public static ConsoleTable GenerateTableForEmployee()
        {
            ConsoleTable table = new ConsoleTable("ID", "Name", "Role","department","Location","Join Date","Manager","Project");
            return table;
        }
        // private void some()
        // {
        //     Console.Write("Entered Value is Not Matching .\nPlease Enter the Options From above : ");
        //     return GetChoice(MenuCount);
        // }
    }
}