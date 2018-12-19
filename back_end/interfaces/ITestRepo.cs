using back_end.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.interfaces
{
    public interface ITestRepo
    {
        IEnumerable<Player> GetAllPlayers();
        Player GetPlayerById(Guid playerId);
        Task<int> AddPlayer(Player player);
        Task<int> EditPlayer(Player player);
        Task<int> DeletePlayer(Guid playerId);
        bool PlayerExits(Guid playerId);
    }
}
