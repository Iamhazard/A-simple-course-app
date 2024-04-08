using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class CreateCoursesDto
    {
        [Required]

        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        public int Duration { get; set; }
        [Required]
        public string Lessons { get; set; } = string.Empty;


    }
}