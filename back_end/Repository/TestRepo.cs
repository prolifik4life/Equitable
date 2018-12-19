using back_end.interfaces;
using back_end.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace back_end.Repository
{
    public class TestRepo : ITestRepo
    {
        private readonly TestDbContext _context;

        public TestRepo(TestDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Player> GetAllPlayers()
        {
            return _context.Players;
        }

        public Player GetPlayerById(Guid playerId)
        {
           return _context.Players.SingleOrDefault(p=>p.PlayerId==playerId);
        }

        public Task<int> AddPlayer(Player player)
        {
            _context.Players.Add(player);
            return  _context.SaveChangesAsync();
        }

        public Task<int> EditPlayer(Player player)
        {
            var model = _context.Players.SingleOrDefault(p => p.PlayerId == player.PlayerId);
            if (model != null)
            {
                _context.Entry(player).State = EntityState.Modified;
                return _context.SaveChangesAsync();
            }
            throw new Exception("Server error. Player not found");
        }

        public Task<int> DeletePlayer(Guid playerId)
        {
            var model = _context.Players.SingleOrDefault(p => p.PlayerId == playerId);
            if (model != null)
            {
                _context.Players.Remove(model);
                return _context.SaveChangesAsync();
            }
            throw new Exception("Server error. Player not found");
        }

        public bool PlayerExits(Guid playerId)
        {
            return _context.Players.Any(p=>p.PlayerId == playerId);
        }
    }
}
