using Recomp_Resource.Models;
using System.Collections.Generic;

namespace Recomp_Resource.Repositories
{
    public interface IQuoteRepository
    {
        void Add(Quote quote);
        void Delete(int id);
        void Edit(Quote quote);
        List<Quote> GetAllQuotes(int Id);
        Quote GetQuoteById(int id);
    }
}