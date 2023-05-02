using Recomp_Resource.Models;
using System.Collections.Generic;

namespace Recomp_Resource.Repositories
{
    public interface IMessageRepository
    {
        void Add(Message message);
        void Delete(int id);
        List<Message> GetAllMessages();
        Message GetMessageById(int id);
    }
}