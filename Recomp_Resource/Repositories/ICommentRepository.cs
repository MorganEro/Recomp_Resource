using Recomp_Resource.Models;
using System.Collections.Generic;

namespace Recomp_Resource.Repositories
{
    public interface ICommentRepository
    {
        void Add(Comment comment);

        void Delete (int id);
        List<Comment> GetAllCommentsOfResource(int resourceId);
    }
}