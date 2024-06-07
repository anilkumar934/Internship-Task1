namespace Constants
{

    class ValidatingData
    {
        public string InputValue = "";
        public string IsRequired = "";
        public string Regex = "";
        public string InputFormat = "";
    }



    class EmployeeValidationDetails
    {
        public static ValidatingData employeeId = new(){
            InputValue = "EmployeeId",
            IsRequired = DisplayOptions.requiredMsg,
            Regex =  RegularExpressions.EmployeeId,
            InputFormat =  "TZ0000"
        };
        public static ValidatingData firstName = new()
        {
            InputValue = "FirstName",
            IsRequired = DisplayOptions.requiredMsg,
            Regex = RegularExpressions.Name,
            InputFormat = "1-9 Alphabets"
        };
        public static ValidatingData lastName = new()
        {
            InputValue = "LastName",
            IsRequired = DisplayOptions.requiredMsg,
            Regex = RegularExpressions.Name,
            InputFormat = "1-9 Alphabets"
        };
        public static ValidatingData dateOfBirth = new()
        {
            InputValue = "DateOfBirth",
            IsRequired = DisplayOptions.optionalMsg,
            Regex = RegularExpressions.Date,
            InputFormat = "dd-MM-yyyy"
        };
        public static ValidatingData email = new()
        {
            InputValue = "Email",
            IsRequired = DisplayOptions.requiredMsg,
            Regex = RegularExpressions.Email,
            InputFormat = "anil@tech.com"
        };
        public static ValidatingData mobileNumber = new()
        {
            InputValue = "MobileNumber",
            IsRequired = DisplayOptions.optionalMsg,
            Regex = RegularExpressions.MobileNumber,
            InputFormat = "0000000000"
        };
        public static ValidatingData joinDate = new()
        {
            InputValue = "JoinDate",
            IsRequired = DisplayOptions.requiredMsg,
            Regex = RegularExpressions.Date,
            InputFormat = "dd-MM-yyyy"
        };
        public static ValidatingData location = new() { 
            InputValue = "Location",
            IsRequired = DisplayOptions.requiredMsg, 
            Regex = "", 
            InputFormat = "HYD" 
        };
        public static ValidatingData jobTitle = new() { 
            InputValue = "JobTitle", 
            IsRequired = DisplayOptions.requiredMsg, 
            Regex = "", 
            InputFormat = "FSD" 
        };
        public static ValidatingData department = new() { 
            InputValue = "Department", 
            IsRequired = DisplayOptions.requiredMsg, 
            Regex = "", 
            InputFormat = "PE" 
        };
        public static ValidatingData manager = new() { 
            InputValue = "Manager", 
            IsRequired = DisplayOptions.optionalMsg, 
            Regex = "", 
            InputFormat = "ManagerName" 
        };
        public static ValidatingData Project = new() { 
            InputValue = "Project", 
            IsRequired = DisplayOptions.optionalMsg, 
            Regex = "", 
            InputFormat = "projectName" 
        };
        public static string employeeDataPath = @"C:\Users\anil.a\Documents\GitHub\Internship-Tasks\Task5\EmployeeData.json";
    }
}