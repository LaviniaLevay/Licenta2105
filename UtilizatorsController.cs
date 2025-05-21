using MentorWayProject.Data;
using MentorWayProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MentorWayProject.Models;
using MentorWayProject.Data;

namespace MentorWayProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UtilizatorsController : ControllerBase
    {
        private readonly MentorWayContext _context;

        public UtilizatorsController(MentorWayContext context)
        {
            _context = context;
        }

        // GET: api/Utilizators
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Utilizator>>> GetUtilizatori()
        {
            return await _context.Utilizatori.ToListAsync();
        }

        // GET: api/Utilizators/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Utilizator>> GetUtilizator(int id)
        {
            var utilizator = await _context.Utilizatori.FindAsync(id);

            if (utilizator == null)
            {
                return NotFound();
            }

            return utilizator;
        }

        // PUT: api/Utilizators/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUtilizator(int id, Utilizator utilizator)
        {
            if (id != utilizator.ID)
            {
                return BadRequest();
            }

            _context.Entry(utilizator).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UtilizatorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Utilizators
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Utilizator>> PostUtilizator(Utilizator utilizator)
        {
            _context.Utilizatori.Add(utilizator);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUtilizator", new { id = utilizator.ID }, utilizator);
        }

        // DELETE: api/Utilizators/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUtilizator(int id)
        {
            var utilizator = await _context.Utilizatori.FindAsync(id);
            if (utilizator == null)
            {
                return NotFound();
            }

            _context.Utilizatori.Remove(utilizator);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UtilizatorExists(int id)
        {
            return _context.Utilizatori.Any(e => e.ID == id);
        }
    }
}