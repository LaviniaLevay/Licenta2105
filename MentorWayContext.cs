using Microsoft.EntityFrameworkCore;
using MentorWayProject.Models;

namespace MentorWayProject.Data
{
    public class MentorWayContext : DbContext
    {
        public MentorWayContext(DbContextOptions<MentorWayContext> options) : base(options) { }

        public DbSet<Utilizator> Utilizatori { get; set; }
        public DbSet<Curs> Cursuri { get; set; }
        public DbSet<Rezervare> Rezervari { get; set; }
        public DbSet<Material> Materiale { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
    }
}
