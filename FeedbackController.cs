using MentorWayProject.Data;
using MentorWayProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class FeedbackController : ControllerBase
{
    private readonly MentorWayContext _context;

    public FeedbackController(MentorWayContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> PostFeedback([FromBody] Feedback feedback)
    {
        Console.WriteLine($"📥 Feedback primit: CursId={feedback.CursId}, UtilizatorId={feedback.UtilizatorId}, Rating={feedback.Rating}");

        if (feedback.Rating < 1 || feedback.Rating > 5)
            return BadRequest("Rating invalid.");

        var areRezervare = await _context.Rezervari.AnyAsync(r =>
            r.UtilizatorId == feedback.UtilizatorId &&
            r.CursId == feedback.CursId &&
            r.DataOra < DateTime.Now);

        if (!areRezervare)
            return BadRequest("Poți lăsa feedback doar dacă ai participat la acest curs.");

        var feedbackExistent = await _context.Feedbacks.AnyAsync(f =>
            f.UtilizatorId == feedback.UtilizatorId &&
            f.CursId == feedback.CursId);

        if (feedbackExistent)
            return BadRequest("Ai trimis deja feedback pentru acest curs.");

        _context.Feedbacks.Add(feedback);
        await _context.SaveChangesAsync();

        return Ok("Feedback salvat cu succes.");
    }

    [HttpGet("curs/{cursId}")]
    public async Task<IActionResult> GetFeedbackByCurs(int cursId)
    {
        try
        {
            var feedback = await _context.Feedbacks
                .Where(f => f.CursId == cursId)
                .ToListAsync();

            return Ok(feedback);
        }
        catch (Exception ex)
        {
            Console.WriteLine("❌ Eroare la GET feedback: " + ex.Message);
            return StatusCode(500, "Eroare server la încărcarea feedbackului.");
        }
    }
}
