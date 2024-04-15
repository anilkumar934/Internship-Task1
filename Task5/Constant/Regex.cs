namespace Constants
{
    class RegularExpressions 
    {
        public static string employeeId = @"^TZ[0-9]{4}$";
        public static string name = @"^[a-zA-z]{2,9}$";
        public static string email = @"^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";
        public static string mobileNumber = @"^[6-9]{1}[0-9]{9}$";
        public static string date = @"^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$";
        public static string integer = @"^\d+$";
    }
}