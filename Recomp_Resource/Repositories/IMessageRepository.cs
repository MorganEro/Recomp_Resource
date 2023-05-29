using Recomp_Resource.Models;
using System.Collections.Generic;

namespace Recomp_Resource.Repositories
{
    public interface IMessageRepository
    {
        void Add(Message message);
        void Delete(int id);
        List<Message> GetAllMessagesOfUser(int id);
        List<Message> GetAllMessagesSentByUser(int id);
        List<Message> GetAllMessagesReceivedByUser(int id);
        Message GetMessageById(int id);
    }
}