using API.Data;
using API.Dtos;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CourseController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CourseController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/course/createCourses
        [HttpPost("createCourses")]
        public async Task<ActionResult<string>> CreateCourses(CreateCoursesDto createCoursesDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var course = new CourseModel
            {
                Title = createCoursesDto.Title,
                Description = createCoursesDto.Description,
                Duration = createCoursesDto.Duration,
                Lessons = createCoursesDto.Lessons
            };

            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            return Ok(new CourseResponseDto
            {
                IsSuccess = true,
                Message = "Courses Created Successfully",
            });
        }
        //api/course/getcourses
        [HttpGet("getcourses")]

        public async Task<ActionResult<CourseDetails>> GetCourseDetail()
        {
            var allcourses = await _context.Courses.ToListAsync();

            // Return the list of courses
            return Ok(allcourses);

        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRole(string id)
        {
            // find role by their id

            var course = await _context.Courses.FindAsync(id);

            if (course is null)
            {
                return NotFound("Course not found.");
            }

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();

            return BadRequest("Role deletion failed.");

        }



    }
}
