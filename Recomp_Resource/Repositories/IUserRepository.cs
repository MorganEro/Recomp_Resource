using Recomp_Resource.Models;
using System.Collections.Generic;

namespace Recomp_Resource.Repositories
{
    public interface IUserRepository
    {
        void Add(User user);
        void Edit(User user);
        List<User> GetAllUsers();
        User GetByFirebaseUserId(string firebaseUserId);
        User GetUserById(int id);
        List<User> SearchUsers(string criterion);
    }
}