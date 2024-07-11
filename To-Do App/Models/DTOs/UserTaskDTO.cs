using System.ComponentModel.DataAnnotations;

namespace Models.DTOs
{
    public class UserTaskDTO
    {
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [Required]
        [StringLength(250)]
        public string Description { get; set; }
        public string Status { get; set; } = "Active";

        public DateTime AddedDate { get; set; }
    }
}
