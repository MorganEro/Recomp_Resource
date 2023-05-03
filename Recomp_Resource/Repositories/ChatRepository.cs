using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Recomp_Resource.Models;
using Recomp_Resource.Utils;
using System.Collections.Generic;

namespace Recomp_Resource.Repositories
{
    public class ChatRepository : BaseRepository, IChatRepository
    {
        public ChatRepository(IConfiguration configuration) : base(configuration) { }

        public List<Chat> GetAllChats(int categoryId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.Id, c.Content, c.DateCreated, c.CategoryId,c.UserId,

                               u.DisplayName, u.FirstName, u.LastName, u.CategoryId, u.Birthday, u.Weight, u.Height, u.BFPercentage, u.BMR, u.CurrentFocus, u.Bio, u.Email, u.JoinDate, u.ImageAddress, u.Deactivated, u.UserTypeId,.DisplayName, 

                               cat.Goal,

                               ut.Type        
                          
                        FROM Chat c
                        LEFT JOIN User u ON c.UserId = u.Id
                        LEFT JOIN Category cat ON u.CategoryId = cat.Id
                        LEFT JOIN UserType ut ON u.UserTypeId = u.Id
                        ORDER BY c.DateCreated";

                    DbUtils.AddParameter(cmd, "@categoryId", categoryId);
                    var reader = cmd.ExecuteReader();

                    var comments = new List<Chat>();

                    while (reader.Read())
                    {
                        comments.Add(NewChatFromReader(reader));
                    }

                    reader.Close();

                    return comments;
                }
            }
        }

        public void Add(Chat chat)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Chat (Content, DateCreated, CategoryId, UserId)
                        OUTPUT INSERTED.ID
                        VALUES (@Content, @DateCreated, @Category, @UserId)";
                    DbUtils.AddParameter(cmd, "@Content", chat.Content);
                    DbUtils.AddParameter(cmd, "@DateCreated", chat.DateCreated);
                    DbUtils.AddParameter(cmd, "@Category", chat.Category);
                    DbUtils.AddParameter(cmd, "@UserId", chat.UserId);

                    chat.Id = (int)cmd.ExecuteScalar();
                }
            }
        }


        private Chat NewChatFromReader(SqlDataReader reader)
        {
            return new Chat()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Content = DbUtils.GetString(reader, "Content"),
                DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                Category = new Category()
                {
                    Id = DbUtils.GetInt(reader, "CategoryId"),
                    Goal = DbUtils.GetString(reader, "Goal")
                },
                UserId = DbUtils.GetInt(reader, "UserId"),
                User = new User()
                {
                    Id = DbUtils.GetInt(reader, "UserId"),
                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                    FirstName = DbUtils.GetString(reader, "FirstName"),
                    LastName = DbUtils.GetString(reader, "LastName"),
                    Birthday = DbUtils.GetDateTime(reader, "Birthday"),
                    Weight = DbUtils.GetDecimal(reader, "Weight"),
                    Height = DbUtils.GetString(reader, "Height"),
                    BFPercentage = DbUtils.GetDecimal(reader, "BFPercentage"),
                    BMR = DbUtils.GetInt(reader, "BMR"),
                    CurrentFocus = DbUtils.GetString(reader, "CurrentFocus"),
                    Deactivated = reader.GetBoolean(reader.GetOrdinal("Deactivated")),
                    CategoryId = DbUtils.GetInt(reader, "UCategoryId"),
                    Category = new Category()
                    {
                        Id = DbUtils.GetInt(reader, "UCategoryId"),
                        Goal = DbUtils.GetString(reader, "UCGoal")
                    },
                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                    UserType = new UserType()
                    {
                        Id = DbUtils.GetInt(reader, "UserTypeId"),
                        Type = DbUtils.GetString(reader, "Type")
                    },
                    JoinDate = DbUtils.GetDateTime(reader, "JoinDate"),
                    ImageAddress = DbUtils.GetString(reader, "ImageAddress"),
                    Bio = DbUtils.GetString(reader, "Bio"),
                    Email = DbUtils.GetString(reader, "Email")
                }
            };
        }

    }
}
