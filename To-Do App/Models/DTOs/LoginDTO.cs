using System.ComponentModel.DataAnnotations;

namespace Models.DTOs
{
    public class LoginDTO
    {
        [Required]
        [RegularExpression("^[a-zA-Z0-9_]{3,20}$")]
        public string? UserName { get; set; }
        [Required]
        public string? token { get; set; }
    }
}
