
using System.Text.Json;
using System.Text.RegularExpressions;
using ConsoleTables;
using Constants;
using Entity;




namespace Utility
{
    static class OutputUtility
    {
        public static int GetChoice(int menuCount)
        {
            string? choice = Console.ReadLine();
            
            if(choice != "" && choice!.Trim() != "" && Regex.IsMatch(choice,RegularExpressions.integer)){
                int number = Convert.ToInt32(choice);
                Delay();
                if(number <= menuCount && number >= 1) return number;
                Console.Write(DisplayOptions.inputNotMatch);
                return GetChoice(menuCount);
            }
            Console.Write(DisplayOptions.inputNotMatch);
            Delay();
            return GetChoice(menuCount);
        }
        public static ConsoleTable GenerateTableForEmployee()
        {
            ConsoleTable table = new("ID", "Name","DOB","Email","Mobile Number","Join Date","Location","Job Title","Department","Manager","Project");
            return table;
        }

        public static ConsoleTable GenerateTableForRole()
        {
            ConsoleTable table = new("Role Name", "Department", "Description","Location");
            return table;
        }


        public static void Delay()
        {
            Thread.Sleep(DisplayOptions.delayTime);
        }

         public static void StoreData(Dictionary<string,Employee> Data ,string Path)
         {
             var jsonFile = JsonSerializer.Serialize(Data);
             File.WriteAllText(Path,jsonFile);
         }

         public static Dictionary<string,Employee> GetData(string Path)
         {
             var dataFromFile = File.ReadAllText(Path);
             Dictionary<string,Employee> Data = JsonSerializer.Deserialize<Dictionary<string,Employee>>(dataFromFile) ?? [];
             return Data;
         }

    }
}