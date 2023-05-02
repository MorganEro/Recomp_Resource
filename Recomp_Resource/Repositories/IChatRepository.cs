using Recomp_Resource.Models;
using System.Collections.Generic;

namespace Recomp_Resource.Repositories
{
    public interface IChatRepository
    {
        void Add(Chat chat);
        List<Chat> GetAllChats(int categoryId);
    }
}