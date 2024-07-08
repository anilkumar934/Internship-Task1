namespace Repositories.Models
{
    public class UserTask
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int UserId { get; set; }
        public string status { get; set; }
        public DateTime AddedDate { get; set; }
        public User User { get; set; }
    }
}
