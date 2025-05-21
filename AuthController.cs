using Microsoft.AspNetCore.Mvc;
using MentorWayProject.Data;
using MentorWayProject.Models;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace MentorWayProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly MentorWayContext _context;

        public AuthController(MentorWayContext context)
        {
            _context = context;
        }

        // ✅ Înregistrare utilizator nou
        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] Utilizator utilizator)
        {
            if (_context.Utilizatori.Any(u => u.Email == utilizator.Email))
                return BadRequest("Emailul este deja folosit.");

            utilizator.Parola = HashPassword(utilizator.Parola);
            utilizator.Rol = "Cursant"; // default

            _context.Utilizatori.Add(utilizator);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                id = utilizator.ID,
                username = utilizator.Username,
                email = utilizator.Email,
                rol = utilizator.Rol
            });
        }
        //LOGIN
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest loginData)
        {
            string parolaHash = HashPassword(loginData.Parola);

            var user = _context.Utilizatori.FirstOrDefault(u =>
                u.Email == loginData.Email && u.Parola == parolaHash);

            if (user == null)
                return Unauthorized("Email sau parolă incorectă.");

            return Ok(new
            {
                user.ID,
                user.Username,
                user.Email,
                user.Rol
            });
        }


        // 🔐 Funcție pentru hash parolănn
        private string HashPassword(string parola)
        {
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(parola));
            return BitConverter.ToString(bytes).Replace("-", "").ToLower();
        }
    }
}
