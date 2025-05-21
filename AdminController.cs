using MentorWayProject.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class AdminController : ControllerBase
{
    private readonly MentorWayContext _context;

    public AdminController(MentorWayContext context)
    {
        _context = context;
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        var utilizatori = await _context.Utilizatori.CountAsync();
        var cursuri = await _context.Cursuri.CountAsync();
        var rezervari = await _context.Rezervari.CountAsync();

        return Ok(new
        {
            utilizatori,
            cursuri,
            rezervari
        });
    }

    [HttpGet("rezervari-recente")]
    public async Task<IActionResult> RezervariRecente()
    {
        var rezervari = await _context.Rezervari
            .OrderByDescending(r => r.DataOra)
            .Take(5)
            .Include(r => r.Curs)
            .ToListAsync();

        return Ok(rezervari);
    }
}
