using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Recomp_Resource.Models;
using Recomp_Resource.Utils;
using System.Collections.Generic;

namespace Recomp_Resource.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration configuration) : base(configuration) { }


        public List<Comment> GetAllCommentsOfResource(int resourceId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.Id, c.UserId, c.ResourceId, c.Content,c.DateSent,

                               u.DisplayName, u.FirstName, u.LastName, u.CategoryId, u.Birthday, u.Weight, u.Height, u.BFPercentage, u.BMR, u.CurrentFocus, u.Bio, u.Email, u.JoinDate, u.ImageAddress, u.Deactivated, u.UserTypeId, 

                               cat.Goal,

                               ut.Type,
    
                               r.Title, r.CategoryId AS RCategoryId, r.Topic, r.DateAdded, r.content AS RContent,

                               rc.Goal AS RCGoal         
                          
                        FROM Comment c
                            LEFT JOIN [User] u ON c.UserId = u.Id
                            LEFT JOIN Category cat ON u.CategoryId = cat.Id
                            LEFT JOIN UserType ut ON u.UserTypeId = u.Id
                            LEFT JOIN Resource r ON c.ResourceId = r.Id
                            LEFT JOIN Category rc ON rc.Id = r.CategoryId
                            WHERE c.ResourceId = @resourceId
                            ORDER BY c.DateSent";

                    DbUtils.AddParameter(cmd, "@resourceId", resourceId);
                    var reader = cmd.ExecuteReader();

                    var comments = new List<Comment>();

                    while (reader.Read())
                    {
                        comments.Add(NewCommentFromReader(reader));
                    }

                    reader.Close();

                    return comments;
                }
            }
        }

        public void Add(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Comment (UserId, ResourceId, Content, DateSent)
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @ResourceId, @Content, @DateSent)";
                    DbUtils.AddParameter(cmd, "@UserId", comment.UserId);
                    DbUtils.AddParameter(cmd, "@ResourceId", comment.ResourceId);
                    DbUtils.AddParameter(cmd, "@Content", comment.Content);
                    DbUtils.AddParameter(cmd, "@DateSent", comment.DateSent);

                    comment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        private Comment NewCommentFromReader(SqlDataReader reader)
        {
            return new Comment()
            {
                Id = DbUtils.GetInt(reader, "Id"),
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
                    CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                    Category = new Category()
                    {
                        Id = DbUtils.GetInt(reader, "CategoryId"),
                        Goal = DbUtils.GetString(reader, "Goal")
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
                    Email = DbUtils.GetString(reader, "Email"),

                },
                ResourceId = DbUtils.GetInt(reader, "ResourceId"),
                Resource = new Resource()
                {
                    Id = DbUtils.GetInt(reader, "ResourceId"),
                    Title = DbUtils.GetString(reader, "Title"),
                    CategoryId = DbUtils.GetInt(reader, "RCategoryId"),
                    Category = new Category()
                    {
                        Id = DbUtils.GetInt(reader, "RCategoryId"),
                        Goal = DbUtils.GetString(reader, "RCGoal")
                    },
                    Topic = DbUtils.GetString(reader, "Topic"),
                    DateAdded = DbUtils.GetDateTime(reader, "DateAdded"),
                    Content = DbUtils.GetString(reader, "RContent")
                },
                Content = DbUtils.GetString(reader, "Content"),
                DateSent = DbUtils.GetDateTime(reader, "DateSent"),
            };
        }

    }
}   
