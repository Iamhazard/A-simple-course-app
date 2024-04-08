namespace API.Models
{
    public class CourseModel
    {

        public int Id { get; set; }

        public required string Title { get; set; }
        public required string Description { get; set; }
        public int Duration { get; set; }
        public required string Lessons { get; set; }
    }
}