namespace Constants
{
    class RegularExpressions 
    {
        public static string EmployeeId = @"^TZ[0-9]{4}$";
        public static string Name = @"^[a-zA-z]{2,9}$";
        public static string Email = @"^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";
        public static string MobileNumber = @"^[6-9]{1}[0-9]{9}$";
        public static string Date = @"^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$";
        public static string Integer = @"^\d+$";
    }
}