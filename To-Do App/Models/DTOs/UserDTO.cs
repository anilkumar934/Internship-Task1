using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Models.DTOs
{
    public class UserDTO
    {
        [Required]
        [RegularExpression("^[a-zA-Z0-9_]{3,20}$")]
        public string? UserName { get; set; }
        [Required]
        [StringLength(100)]
        public string? Password { get; set; }
    }
}
