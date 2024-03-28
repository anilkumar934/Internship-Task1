using System.Text.RegularExpressions;
using Constants;
using DataBase;

namespace Inputs
{
    class Input
    {
        public string GetValue(string InputType, string Field,string pattern,string format)
        {
            Console.Write($"Enter {InputType} (Ex: {format}) : ");
            string? input = Console.ReadLine();
            if (input == "" && Field == "Required"){
                Console.WriteLine("Input should not be empty");
                return GetValue(InputType,Field,pattern,format);
            }
            else if (pattern != "" && !Regex.IsMatch(input!,pattern))
            {
                Console.WriteLine($"Invalid {InputType}");
                return GetValue(InputType,Field,pattern,format);
            }
            if(input == "") input = "Not Specified";
            return input!;
        }

        public DateTime GetDate(string InputType,string Field,string pattern,string format)
        {
            Console.Write($"Enter {InputType} (Ex: {format}) : ");
            string? Date = Console.ReadLine();
            if(Date == "" || Date!.Trim() == "" || string.IsNullOrEmpty(Date)) 
            {
                if(Field == "Required")
                {
                    Console.WriteLine("Input field should not be empty");
                    return GetDate(InputType,Field,pattern,format);
                }
                else return DateTime.Today;
            }
            else if(pattern != "" && !Regex.IsMatch(Date!,pattern))
            {
                Console.WriteLine($"InValid {InputType}");
                return GetDate(InputType,Field,pattern,format);
            }
            DateTime parsedDate = DateTime.ParseExact(Date, "dd-MM-yyyy", null);
            return parsedDate;
        }

        public long GetNumber(string InputType,string Field,string pattern,string format)
        {
            Console.Write($"Enter {InputType} (Ex: {format}) : ");
            string? Number = Console.ReadLine();
            if(Number == "" || Number!.Trim() == "") 
            {
                if(Field == "Required")
                {
                    Console.WriteLine("Input field should not be empty");
                    return GetNumber(InputType,Field,pattern,format);
                }
                else return 0;
            }
            if(pattern != "" && !Regex.IsMatch(Number,pattern))
            {
                Console.WriteLine($"Enter Valid {InputType}");
                return GetNumber(InputType,Field,pattern,format);
            }
            return Convert.ToInt64(Number);
        }

        public string ValidateId()
        {
            Console.Write("Enter Employee Id : ");
            string? Id = Console.ReadLine();
            if(Id == "" || Id!.Trim() == "") 
            {
                Console.WriteLine("Id should not empty");
                return ValidateId();
            }
            else if(!Regex.IsMatch(Id!,RegularExpressions.EmployeeIdRegex))
            {
                Console.WriteLine("Inavlid Id");
                return ValidateId();
            }
            else if(!DataStore.EmployeeData.ContainsKey(Id!))
            {
                Console.WriteLine("Entered Employee is Not in Directory !. Try to enter a New Employee id ");
                return ValidateId();
            }
            return Id!;
        }

    }
}

