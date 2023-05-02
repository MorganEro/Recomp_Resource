using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Recomp_Resource.Models;
using Recomp_Resource.Utils;
using System.Collections.Generic;

namespace Recomp_Resource.Repositories
{
    public class QuoteRepository : BaseRepository, IQuoteRepository
    {
        public QuoteRepository(IConfiguration configuration) : base(configuration) { }


        public Quote GetQuoteById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT Id, Content
                         FROM Quote 
                         WHERE m.Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    Quote quote = null;

                    if (reader.Read())
                    {
                        quote = NewQuoteFromReader(reader);
                    }

                    reader.Close();

                    return quote;
                }
            }
        }
        public List<Quote> GetAllQuotes()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Content    
                        FROM Quote";

                    var reader = cmd.ExecuteReader();

                    var quotes = new List<Quote>();

                    while (reader.Read())
                    {
                        quotes.Add(NewQuoteFromReader(reader));
                    }

                    reader.Close();

                    return quotes;
                }
            }
        }

        public void Add(Quote quote)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Quote (Content)
                        OUTPUT INSERTED.ID
                        VALUES (@Content)";
                    cmd.Parameters.AddWithValue("@Content", quote.Content);

                    quote.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Edit(Quote quote)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Quote
                           SET Content = @Content 
                               
                         WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", quote.Id);
                    cmd.Parameters.AddWithValue("@Content", quote.Content);


                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Quote WHERE Quote.Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }


        private Quote NewQuoteFromReader(SqlDataReader reader)
        {
            return new Quote()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Content = DbUtils.GetString(reader, "Content")
            };
        }

    }
}
