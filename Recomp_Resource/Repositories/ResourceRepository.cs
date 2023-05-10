using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Recomp_Resource.Models;
using Recomp_Resource.Utils;
using System.Collections.Generic;
using System.Linq;

namespace Recomp_Resource.Repositories
{
    public class ResourceRepository : BaseRepository, IResourceRepository
    {
        public ResourceRepository(IConfiguration configuration) : base(configuration) { }

        public List<Resource> GetAllResources()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT r.Id, r.Title, r.CategoryId, r.Topic, r.DateAdded, r.Content, 
                        c.Goal , 
                        cm.Id AS CId, cm.Content AS CContent, cm.UserId, cm.DateSent
                          
                        FROM Resource r
                        LEFT JOIN Category c on r.CategoryId = c.Id
                        LEFT JOIN Comment cm  ON r.id = cm.ResourceId
                        ORDER BY r.DateAdded DESC";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var resources = new List<Resource>();
                        while (reader.Read())
                        {
                            var Id = DbUtils.GetInt(reader, "Id");

                            var existingResource = resources.FirstOrDefault(r => r.Id == Id);
                            if (existingResource == null)
                            {
                                existingResource = NewResourceFromReader(reader);


                                resources.Add(existingResource);
                            }

                            if (DbUtils.IsNotDbNull(reader, "CId"))
                            {
                                existingResource.Comments.Add(new Comment()
                                {
                                    Id = DbUtils.GetInt(reader, "CId"),
                                    Content = DbUtils.GetString(reader, "CContent"),
                                    UserId = DbUtils.GetInt(reader, "UserId"),
                                    ResourceId = DbUtils.GetInt(reader, "Id")
                                });
                            }
                        }

                        return resources;
                    }
                }
            }
        }

        public List<Resource> GetAllResourcesByCategory(int categoryId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT r.Id, r.Title, r.CategoryId, r.Topic, r.DateAdded, r.Content, 
                        c.Goal , 
                        cm.Id AS CId, cm.Content AS CContent, cm.UserId, cm.DateSent
                          
                        FROM Resource r
                        LEFT JOIN Category c on r.CategoryId = c.Id
                        LEFT JOIN Comment cm  ON r.id = cm.ResourceId
                        WHERE r.CategoryId = @categoryId
                        ORDER BY r.DateAdded DESC";

                    DbUtils.AddParameter(cmd, "@categoryId", categoryId);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var resources = new List<Resource>();
                        while (reader.Read())
                        {
                            var Id = DbUtils.GetInt(reader, "Id");

                            var existingResource = resources.FirstOrDefault(r => r.Id == Id);
                            if (existingResource == null)
                            {
                                existingResource = NewResourceFromReader(reader);


                                resources.Add(existingResource);
                            }

                            if (DbUtils.IsNotDbNull(reader, "CId"))
                            {
                                existingResource.Comments.Add(new Comment()
                                {
                                    Id = DbUtils.GetInt(reader, "CId"),
                                    Content = DbUtils.GetString(reader, "CContent"),
                                    UserId = DbUtils.GetInt(reader, "UserId"),
                                    ResourceId = DbUtils.GetInt(reader, "Id")
                                });
                            }
                        }

                        return resources;
                    }
                }
            }
        }


        public Resource GetResourceById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT r.Id, r.Title, r.CategoryId, r.Topic, r.DateAdded, r.Content, 
                        c.Goal , 
                        cm.Id AS CId, cm.Content AS CContent, cm.UserId, cm.DateSent
                          
                        FROM Resource r
                        LEFT JOIN Category c on r.CategoryId = c.Id
                        LEFT JOIN Comment cm  ON r.id = cm.ResourceId
                        WHERE r.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        Resource resource = null;
                        while (reader.Read())
                        {
                            if (resource == null)
                            {
                                resource = NewResourceFromReader(reader);
                            }

                            if (DbUtils.IsNotDbNull(reader, "CId"))
                            {
                                resource.Comments.Add(new Comment()
                                {
                                    Id = DbUtils.GetInt(reader, "CId"),
                                    Content = DbUtils.GetString(reader, "CContent"),
                                    UserId = DbUtils.GetInt(reader, "UserId"),
                                    ResourceId = DbUtils.GetInt(reader, "Id")
                                });
                            }
                        }

                        return resource;
                    }
                }
            }
        }

        public void Add(Resource resource)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Resource (Title, CategoryId, Topic, DateAdded, Content)
                        OUTPUT INSERTED.ID
                        VALUES (@Title, @CategoryId, @Topic, @DateAdded, @Content)";
                    DbUtils.AddParameter(cmd, "@Title", resource.Title);
                    DbUtils.AddParameter(cmd, "@CategoryId", resource.CategoryId);
                    DbUtils.AddParameter(cmd, "@Topic", resource.Topic);
                    DbUtils.AddParameter(cmd, "@DateAdded", resource.DateAdded);
                    DbUtils.AddParameter(cmd, "@Content", resource.Content);

                    resource.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Edit(Resource resource)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Resource
                           SET Title = @Title, 
                               CategoryId = @CategoryId, 
                               Topic = @Topic,
                               DateAdded = @DateAdded, 
                               Content = @Content 
                              
                         WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", resource.Id);
                    DbUtils.AddParameter(cmd, "@Title", resource.Title);
                    DbUtils.AddParameter(cmd, "@CategoryId", resource.CategoryId);
                    DbUtils.AddParameter(cmd, "@Topic", resource.Topic);
                    DbUtils.AddParameter(cmd, "@DateAdded", resource.DateAdded);
                    DbUtils.AddParameter(cmd, "@Content", resource.Content);

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
                    cmd.CommandText = @"DELETE FROM Resource WHERE Resource.Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void UnSave(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM SavedResource WHERE SavedResource.Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void SaveResource(SavedResource savedResource)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO SavedResource (UserId, ResourceId, SaveDate)
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @ResourceId, @SaveDate)";
                    DbUtils.AddParameter(cmd, "@UserId", savedResource.UserId);
                    DbUtils.AddParameter(cmd, "@ResourceId", savedResource.ResourceId);
                    DbUtils.AddParameter(cmd, "@SaveDate", savedResource.SaveDate);

                    savedResource.Id = (int)cmd.ExecuteScalar();
                }
            }

        }

        public int NumberOfSaves (int resourceId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT count(*) AS NumberOfSaves FROM SavedResource where resourceId = @resourceId";

                    cmd.Parameters.AddWithValue("@resourceId", resourceId);
                    using (var reader = cmd.ExecuteReader())
                    {
                        int numberOfSaves = 0;
                        if(reader.Read())
                        {
                            numberOfSaves = DbUtils.GetInt(reader, "NumberOfSaves");
                        }
                        return numberOfSaves;
                    }
                }
                
            }
        }


        public SavedResource GetSavedResourceById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT sr.Id, sr.UserId, sr.ResourceId, sr.SaveDate,
        
                                 u.DisplayName, u.FirstName, u.LastName, u.CategoryId AS UCategoryId, u.Birthday, u.Weight, u.Height, u.BFPercentage, u.BMR, u.CurrentFocus, u.Bio, u.Email, u.JoinDate, u.ImageAddress, u.Deactivated, u.UserTypeId, u.DisplayName,
 
                                cat.Goal,

                                ut.Type,

                                r.Title, r.CategoryId, r.Topic, r.DateAdded, r.Content,

                                c.Goal AS CGoal,

                                 cm.Id AS CId, cm.Content AS CContent, cm.UserId AS CUserId, cm.DateSent
                          
                            FROM SavedResource sr
                            LEFT JOIN [User] u ON sr.UserId = u.Id
                            LEFT JOIN Category cat ON u.CategoryId = cat.Id
                            LEFT JOIN UserType ut ON u.UserTypeId = ut.Id
                            LEFT JOIN Resource r ON sr.ResourceId = r.Id
                            LEFT JOIN Category c ON r.CategoryId = c.Id
                            LEFT JOIN Comment cm  ON sr.ResourceId = cm.ResourceId
                            WHERE sr.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();

                    SavedResource savedResource = null;

                    while (reader.Read())
                    {
                        savedResource = new SavedResource()
                        {
                            Id = id,
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Birthday = DbUtils.GetDateTime(reader, "Birthday"),
                                Weight = DbUtils.GetString(reader, "Weight"),
                                Height = DbUtils.GetString(reader, "Height"),
                                BFPercentage = DbUtils.GetString(reader, "BFPercentage"),
                                BMR = DbUtils.GetString(reader, "BMR"),
                                CurrentFocus = DbUtils.GetString(reader, "CurrentFocus"),
                                Deactivated = reader.GetBoolean(reader.GetOrdinal("Deactivated")),
                                CategoryId = DbUtils.GetInt(reader, "UCategoryId"),
                                Category = new Category()
                                {
                                    Id = DbUtils.GetInt(reader, "UCategoryId"),
                                    Goal = DbUtils.GetString(reader, "CGoal")
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
                            Resource = NewResourceFromReader(reader),
                            SaveDate = DbUtils.GetDateTime(reader, "SaveDate"),
                        };
                        if (DbUtils.IsNotDbNull(reader, "CId"))
                        {
                            savedResource.Resource.Comments.Add(new Comment()
                            {
                                Id = DbUtils.GetInt(reader, "CId"),
                                Content = DbUtils.GetString(reader, "CContent"),
                                UserId = DbUtils.GetInt(reader, "CUserId"),
                                ResourceId = DbUtils.GetInt(reader, "Id")
                            });
                        }
                    }

                    reader.Close();

                    return savedResource;
                }
            }
        }

        public List<SavedResource> GetAllSavedResourceByUser(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                             SELECT DISTINCT sr.Id, sr.UserId, sr.ResourceId, sr.SaveDate,
        
                                 u.DisplayName, u.FirstName, u.LastName, u.CategoryId AS UCategoryId, u.Birthday, u.Weight, u.Height, u.BFPercentage, u.BMR, u.CurrentFocus, u.Bio, u.Email, u.JoinDate, u.ImageAddress, u.Deactivated, u.UserTypeId, u.DisplayName,
 
                                cat.Goal,

                                ut.Type,

                                r.Title, r.CategoryId, r.Topic, r.DateAdded, r.Content,

                                c.Goal AS CGoal

                          
                            FROM SavedResource sr
                            LEFT JOIN [User] u ON sr.UserId = u.Id
                            LEFT JOIN Category cat ON u.CategoryId = cat.Id
                            LEFT JOIN UserType ut ON u.UserTypeId = ut.Id
                            LEFT JOIN Resource r ON sr.ResourceId = r.Id
                            LEFT JOIN Category c ON r.CategoryId = c.Id
                            WHERE sr.UserId = @userId";

                    DbUtils.AddParameter(cmd, "@userId", userId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var savedResources = new List<SavedResource>();
                        while (reader.Read())
                        {
                            var Id = DbUtils.GetInt(reader, "Id");

                            var existingSavedResource = savedResources.FirstOrDefault(x => x.Id == Id);
                            if (existingSavedResource == null)
                            {
                                existingSavedResource = new SavedResource()
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    UserId = userId,
                                    User = new User()
                                    {
                                        Id = DbUtils.GetInt(reader, "UserId"),
                                        DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                        FirstName = DbUtils.GetString(reader, "FirstName"),
                                        LastName = DbUtils.GetString(reader, "LastName"),
                                        Birthday = DbUtils.GetDateTime(reader, "Birthday"),
                                        Weight = DbUtils.GetString(reader, "Weight"),
                                        Height = DbUtils.GetString(reader, "Height"),
                                        BFPercentage = DbUtils.GetString(reader, "BFPercentage"),
                                        BMR = DbUtils.GetString(reader, "BMR"),
                                        CurrentFocus = DbUtils.GetString(reader, "CurrentFocus"),
                                        Deactivated = reader.GetBoolean(reader.GetOrdinal("Deactivated")),
                                        CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                        Category = new Category()
                                        {
                                            Id = DbUtils.GetInt(reader, "UCategoryId"),
                                            Goal = DbUtils.GetString(reader, "CGoal")
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
                                    Resource = NewResourceFromReader(reader),
                                    SaveDate = DbUtils.GetDateTime(reader, "SaveDate")
                                };                              
                            }
                            savedResources.Add(existingSavedResource);
                        }
                        return savedResources;
                    }
                }
            }
        }

        public List<Resource> SearchResources(string criterion)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT r.Id, r.Title, r.CategoryId, r.Topic, r.DateAdded, r.Content,

                               c.Goal
                          
                        FROM Resource r
                        LEFT JOIN Category c on r.CategoryId = c.Id
                        WHERE r.Title LIKE @Criterion OR r.Topic LIKE @Criterion
                        ORDER BY r.DateAdded";

                    DbUtils.AddParameter(cmd, "@Criterion", $"%{criterion}%");
                    var reader = cmd.ExecuteReader();

                    var resources = new List<Resource>();

                    while (reader.Read())
                    {
                        resources.Add(NewResourceFromReader(reader));
                    }

                    reader.Close();

                    return resources;
                }
            }
        }

        private Resource NewResourceFromReader(SqlDataReader reader)
        {
            return new Resource()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Title = DbUtils.GetString(reader, "Title"),
                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                Category = new Category()
                {
                    Id = DbUtils.GetInt(reader, "CategoryId"),
                    Goal = DbUtils.GetString(reader, "Goal")
                },
                Topic = DbUtils.GetString(reader, "Topic"),
                DateAdded = DbUtils.GetDateTime(reader, "DateAdded"),
                Content = DbUtils.GetString(reader, "Content"),
                Comments = new List<Comment>()
            };
        }
    }
}
