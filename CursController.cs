using Microsoft.AspNetCore.Mvc;
using MentorWayProject.Data;
using MentorWayProject.Models;
using Microsoft.EntityFrameworkCore;

namespace MentorWayProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CursController : ControllerBase
    {
        private readonly MentorWayContext _context;

        public CursController(MentorWayContext context)
        {
            _context = context;
        }

        // ✅ GET: api/curs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Curs>>> GetCursuri()
        {
            return await _context.Cursuri.ToListAsync();
        }

        // ✅ GET: api/curs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Curs>> GetCurs(int id)
        {
            var curs = await _context.Cursuri.FindAsync(id);
            if (curs == null)
                return NotFound();

            return curs;
        }

        // ✅ POST: api/curs
        [HttpPost]
        public async Task<ActionResult<Curs>> CreateCurs(Curs curs)
        {
            _context.Cursuri.Add(curs);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCurs), new { id = curs.ID }, curs);
        }

        // ✅ PUT: api/curs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCurs(int id, Curs curs)
        {
            if (id != curs.ID)
                return BadRequest("ID-ul din URL nu se potrivește cu ID-ul cursului.");

            _context.Entry(curs).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Cursuri.Any(c => c.ID == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // ✅ DELETE: api/curs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCurs(int id)
        {
            var curs = await _context.Cursuri.FindAsync(id);
            if (curs == null)
                return NotFound();

            _context.Cursuri.Remove(curs);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // 🔎 GET: api/curs/search?nivel=Avansat&format=Online&profesor=Ionescu
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Curs>>> CautaCursuri(
      [FromQuery] string? nivel,
      [FromQuery] string? format,
      [FromQuery] string? profesor)
        {
            var query = _context.Cursuri.AsQueryable();

            if (!string.IsNullOrEmpty(nivel))
                query = query.Where(c => c.Nivel.ToLower() == nivel.ToLower());

            if (!string.IsNullOrEmpty(format))
                query = query.Where(c => c.Format.ToLower() == format.ToLower());

            if (!string.IsNullOrEmpty(profesor))
                query = query.Where(c => c.Profesor.ToLower().Contains(profesor.ToLower()));

            return await query.ToListAsync();
        }

        // 🔄 POST: api/curs/seed (pentru testare)
        [HttpPost("seed")]
        public async Task<IActionResult> SeedCursuri()
        {
            if (_context.Cursuri.Any()) return BadRequest("Cursurile există deja.");

            var cursuri = new List<Curs>
    {
        new Curs { Titlu = "Matematică pentru clasa a VI-a", Descriere = "Fracții, procente, probleme aplicate.", Format = "Online", Nivel = "Începător" },
        new Curs { Titlu = "Engleză conversațională", Descriere = "Speaking & Listening activități.", Format = "Fizic", Nivel = "Mediu" },
        new Curs { Titlu = "Chimie organică Bac", Descriere = "Reacții, structuri, exerciții.", Format = "Online", Nivel = "Avansat" },
        new Curs { Titlu = "Fizică Electricitate", Descriere = "Curent, circuite, legi fundamentale.", Format = "Online", Nivel = "Mediu" },
        new Curs { Titlu = "Biologie celulă & genetică", Descriere = "Structura celulei, ADN, ARN, mutații.", Format = "Fizic", Nivel = "Avansat" },
        new Curs { Titlu = "Geografie România", Descriere = "Relief, climă, resurse naturale.", Format = "Online", Nivel = "Începător" },
        new Curs { Titlu = "Istorie universală", Descriere = "Marile evenimente ale secolului XX.", Format = "Online", Nivel = "Mediu" },
        new Curs { Titlu = "Limba română Bac", Descriere = "Eseuri, texte argumentativ/descriptiv.", Format = "Online", Nivel = "Avansat" },
        new Curs { Titlu = "Matematică aplicată (tehnologic)", Descriere = "Funcții, ecuații, grafice.", Format = "Online", Nivel = "Mediu" },
        new Curs { Titlu = "Informatică Java", Descriere = "OOP, colecții, aplicații simple.", Format = "Fizic", Nivel = "Avansat" },
        new Curs { Titlu = "Educație Financiară", Descriere = "Buget, economii, investiții pentru începători.", Format = "Online", Nivel = "Începător" },
        new Curs { Titlu = "Arte plastice", Descriere = "Tehnici de bază, istoria artei, compoziție.", Format = "Fizic", Nivel = "Începător" }
    };

            _context.Cursuri.AddRange(cursuri);
            await _context.SaveChangesAsync();

            return Ok("Cursuri de test adăugate cu succes!");
        }
    }
}
