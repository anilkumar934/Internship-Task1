namespace Constants
{
    class RoleValidationDetails
    {
        public static ValidatingData roleName = new(){
            InputValue = "RoleName",
            IsRequired = DisplayOptions.requiredMsg,
            Regex = RegularExpressions.name,
            InputFormat = "RoleName"
        };
        public static ValidatingData department = new(){
            InputValue = "Department",
            IsRequired = DisplayOptions.requiredMsg,
            Regex = RegularExpressions.name,
            InputFormat = "Department"
        };
        public static ValidatingData description = new(){
            InputValue = "Description",
            IsRequired = DisplayOptions.optionalMsg,
            Regex = "",
            InputFormat = "Description"};
        public static ValidatingData location = new(){
            InputValue = "Location",
            IsRequired = DisplayOptions.requiredMsg,
            Regex = RegularExpressions.name,
            InputFormat = "Location"
        };
    }
}