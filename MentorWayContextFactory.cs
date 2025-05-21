using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace MentorWayProject.Data
{
    public class MentorWayContextFactory : IDesignTimeDbContextFactory<MentorWayContext>
    {
        public MentorWayContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<MentorWayContext>();
            optionsBuilder.UseSqlServer("Server=localhost;Database=MentorWay2;Trusted_Connection=True;TrustServerCertificate=true");

            return new MentorWayContext(optionsBuilder.Options);
        }
    }
}
