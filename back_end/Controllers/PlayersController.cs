using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back_end.interfaces;
using back_end.Models;
using back_end.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayersController : ControllerBase
    {
        private readonly ITestRepo _repo;

        public PlayersController(ITestRepo repo)
        {
            _repo = repo;
        }

        [HttpGet]
        [ProducesResponseType(200)]
        public IEnumerable<Player> GetPlayers()
        {
            return _repo.GetAllPlayers();
        }

        [HttpGet("{playerId}")]
        public Player GetPlayer(string playerId)
        {
            Guid id;
            if (!Guid.TryParse(playerId, out id) || !PlayerExists(id))
            {
                throw new Exception("Not Found");
            }
           
            return _repo.GetPlayerById(id);
        }

        [HttpPost]
        public async Task<IActionResult> PostPlayer([FromBody] Player player)
        {
            await _repo.AddPlayer(player);

            return CreatedAtAction("PostPlayer", new { id = player.PlayerId }, player);
        }
        

        [HttpPut("{playerId}")]
        public async Task<IActionResult> PutPlayer([FromRoute] string playerId, [FromBody] Player player)
        {
            Guid id;
            if (!Guid.TryParse(playerId, out id) || id != player.PlayerId)
            {
                return BadRequest();
            }

            try
            {
                await _repo.EditPlayer(player);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlayerExists(id))
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

        [HttpDelete("{playerId}")]
        public async Task<IActionResult> DeletePlayer([FromRoute] string playerId)
        {
            Guid id;
            if(!Guid.TryParse(playerId, out id))
            {
                return BadRequest();
            }
            if (!PlayerExists(id)) return NotFound();
            await _repo.DeletePlayer(id);

            return Ok();
        }

        private bool PlayerExists(Guid playerId)
        {
            return _repo.PlayerExits(playerId);
        }
    }
}