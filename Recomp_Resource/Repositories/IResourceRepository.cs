using Recomp_Resource.Models;
using System.Collections.Generic;

namespace Recomp_Resource.Repositories
{
    public interface IResourceRepository
    {
        void Add(Resource resource);
        void Delete(int id);
        void Edit(Resource resource);
        List<Resource> GetAllResources();
        List<Resource> GetAllResourcesByCategory(int categoryId);
        List<SavedResource> GetAllSavedResourceByUser(int userId);
        Resource GetResourceById(int id);
        SavedResource GetSavedResourceById(int id);
        void SaveResource(SavedResource savedResource);
        List<Resource> SearchResources(string criterion);
    }
}