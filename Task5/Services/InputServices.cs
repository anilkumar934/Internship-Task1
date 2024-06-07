using System.Text.RegularExpressions;
using Constants;
using DataBase;
using Utility;


namespace Inputs
{
    class InputServices
    {
        public static string GetString(ValidatingData EmployeeDetails)
        {
            if(EmployeeDetails.IsRequired == DisplayOptions.requiredMsg) Console.Write($"Enter {EmployeeDetails.InputValue} (*) (Ex: {EmployeeDetails.Regex}) : ");
            else Console.Write($"Enter {EmployeeDetails.InputValue} (Ex: {EmployeeDetails.Regex}) : ");
            string? input = Console.ReadLine();
            if (input == "" && EmployeeDetails.IsRequired == DisplayOptions.requiredMsg){
                Console.WriteLine(DisplayOptions.inputNotEmptyMsg);
                return GetString(EmployeeDetails);
            }
            else if (EmployeeDetails.Regex != "" && !Regex.IsMatch(input!.Trim(),EmployeeDetails.Regex))
            {
                Console.WriteLine(DisplayOptions.notValidMsg + EmployeeDetails.InputValue);
                return GetString(EmployeeDetails);
            }
            else if(EmployeeDetails.InputValue == "EmployeeId" && DataStore.employeeData.ContainsKey(input!))
            {
                Console.WriteLine(DisplayOptions.employeeExistMsg);
                return GetString(EmployeeDetails);
            }
            if(input == "") input = DisplayOptions.notSpecifiedMsg;
            return input!.Trim();
        }

        public static DateOnly GetDate(ValidatingData EmployeeDetails)
        {
            if(EmployeeDetails.IsRequired == DisplayOptions.requiredMsg) Console.Write($"Enter {EmployeeDetails.InputValue} (*) (Ex: {EmployeeDetails.Regex}) : ");
            else Console.Write($"Enter {EmployeeDetails.InputValue} (Ex: {EmployeeDetails.Regex}) : ");
            string? Date = Console.ReadLine();
            if(Date == "" || Date!.Trim() == "" || string.IsNullOrEmpty(Date)) 
            {
                if(EmployeeDetails.IsRequired == DisplayOptions.requiredMsg)
                {
                    Console.WriteLine(DisplayOptions.inputNotEmptyMsg);
                    return GetDate(EmployeeDetails);
                }
                else return DateOnly.FromDateTime(DateTime.Today);
            }
            else if(EmployeeDetails.Regex != "" && !Regex.IsMatch(Date!.Trim(),EmployeeDetails.Regex))
            {
                Console.WriteLine(DisplayOptions.notValidMsg + EmployeeDetails.InputValue);
                return GetDate(EmployeeDetails);
            }
            DateTime parsedDate = DateTime.ParseExact(Date, "dd-MM-yyyy",null);
            return DateOnly.FromDateTime(parsedDate);
        }

        public static string ValidateId()
        {

            Console.Write("Enter Employee Id : ");
            string? id = Console.ReadLine();
            if(id == "" || id!.Trim() == "") 
            {
                Console.WriteLine(DisplayOptions.inputNotEmptyMsg);
                return ValidateId();
            }
            else if(!Regex.IsMatch(id!,RegularExpressions.EmployeeId))
            {
                id.Trim();
                Console.WriteLine(DisplayOptions.notValidMsg);
                return ValidateId();
            }
            else if(!DataStore.employeeData.ContainsKey(id!))
            {
                Console.WriteLine(DisplayOptions.employeeExistMsg);
                return ValidateId();
            }
            OutputUtility.Delay();
            return id;
        }

    }
}