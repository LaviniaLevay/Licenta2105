using Microsoft.AspNetCore.Mvc;
using MentorWayProject.Data;
using MentorWayProject.Models;
using Microsoft.EntityFrameworkCore;

namespace MentorWayProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RezervareController : ControllerBase
    {
        private readonly MentorWayContext _context;

        public RezervareController(MentorWayContext context)
        {
            _context = context;
        }

        // ✅ POST: Creează o rezervare
        [HttpPost]
        public async Task<IActionResult> CreeazaRezervare([FromBody] Rezervare rezervare)
        {
            Console.WriteLine("📩 PRIMIT REZERVARE:");
            Console.WriteLine($"👤 Utilizator ID: {rezervare.UtilizatorId}");
            Console.WriteLine($"📚 CursId: {rezervare.CursId}");
            Console.WriteLine($"📅 DataOra: {rezervare.DataOra}");

            if (rezervare.UtilizatorId == 0 || rezervare.CursId == 0 || rezervare.DataOra == null)
                return BadRequest("Datele trimise nu sunt complete.");

            // 🔒 VALIDARE: doar luni–vineri, 09:00–18:00
            var zi = rezervare.DataOra.DayOfWeek;
            var ora = rezervare.DataOra.Hour;

            if (zi == DayOfWeek.Saturday || zi == DayOfWeek.Sunday)
                return BadRequest("Rezervările sunt permise doar de luni până vineri.");

            if (ora < 9 || ora >= 18)
                return BadRequest("Ora rezervării trebuie să fie între 09:00 și 18:00.");

            try
            {
                var exista = await _context.Rezervari.AnyAsync(r =>
                    r.UtilizatorId == rezervare.UtilizatorId &&
                    r.CursId == rezervare.CursId &&
                    r.DataOra > DateTime.Now);

                if (exista)
                    return BadRequest("Ai deja o rezervare viitoare pentru acest curs.");

                rezervare.Curs = null; // prevenim eroare de tracking EF Core

                _context.Rezervari.Add(rezervare);
                await _context.SaveChangesAsync();

                Console.WriteLine("✅ Rezervare salvată cu succes!");
                return Ok("Rezervarea a fost înregistrată. ✅ Vei primi un mail cu 24h înainte cu link-ul de intrat pe Zoom.");
            }
            catch (Exception ex)
            {
                Console.WriteLine("❌ Eroare la salvare rezervare: " + ex.Message);
                if (ex.InnerException != null)
                    Console.WriteLine("🔍 Inner: " + ex.InnerException.Message);

                return StatusCode(500, ex.Message + (ex.InnerException != null ? " → " + ex.InnerException.Message : ""));
            }
        }

        // ✅ GET: Rezervări pentru un utilizator
        [HttpGet("user/{id}")]
        public async Task<IActionResult> GetRezervariByUser(int id)
        {
            try
            {
                var rezervari = await _context.Rezervari
                    .Where(r => r.UtilizatorId == id)
                    .Include(r => r.Curs)
                    .ToListAsync();

                return Ok(rezervari);
            }
            catch (Exception ex)
            {
                Console.WriteLine("❌ Eroare la GET rezervari: " + ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        // ✅ DELETE: Anulează o rezervare
        [HttpDelete("{id}")]
        public async Task<IActionResult> StergeRezervare(int id)
        {
            var rezervare = await _context.Rezervari.FindAsync(id);
            if (rezervare == null)
                return NotFound("Rezervarea nu a fost găsită.");

            _context.Rezervari.Remove(rezervare);
            await _context.SaveChangesAsync();

            Console.WriteLine($"🗑️ Rezervare ID {id} anulată.");
            return Ok("Rezervarea a fost anulată.");
        }
    }
}


