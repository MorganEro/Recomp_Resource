using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Recomp_Resource.Models;
using Recomp_Resource.Utils;
using System.Collections.Generic;

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

                               c.Goal
                          
                        FROM Resource r
                        LEFT JOIN Category c on r.CategoryId = c.Id
                        ORDER BY r.DateAdded";

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

        public List<Resource> GetAllResourcesByCategory(int categoryId)
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
                        WHERE r.CategoryId = @categoryId
                        ORDER BY r.DateAdded DESC";

                    cmd.Parameters.AddWithValue("@categoryId", categoryId);
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

        public Resource GetResourceById(int id)
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
                            LEFT JOIN Category c on r.CategoryId = c.Id"";
                            WHERE r.Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    Resource resource = null;

                    if (reader.Read())
                    {
                        resource = NewResourceFromReader(reader);
                    }

                    reader.Close();

                    return resource;
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
                    cmd.Parameters.AddWithValue("@Title", resource.Title);
                    cmd.Parameters.AddWithValue("@CategoryId", resource.CategoryId);
                    cmd.Parameters.AddWithValue("@Topic", resource.Topic);
                    cmd.Parameters.AddWithValue("@DateAdded", resource.DateAdded);
                    cmd.Parameters.AddWithValue("@Content", resource.Content);

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
                               Content = @Content, 
                              
                         WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", resource.Id);
                    cmd.Parameters.AddWithValue("@Title", resource.Title);
                    cmd.Parameters.AddWithValue("@CategoryId", resource.CategoryId);
                    cmd.Parameters.AddWithValue("@Topic", resource.Topic);
                    cmd.Parameters.AddWithValue("@DateAdded", resource.DateAdded);
                    cmd.Parameters.AddWithValue("@Content", resource.Content);

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
                    cmd.Parameters.AddWithValue("@id", id);
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
                        VALUES (@UserId, @ResourceId, @SaveDate, @DateAdded, @Content)";
                    cmd.Parameters.AddWithValue("@UserId", savedResource.UserId);
                    cmd.Parameters.AddWithValue("@ResourceId", savedResource.ResourceId);
                    cmd.Parameters.AddWithValue("@SaveDate", savedResource.SaveDate);

                    savedResource.Id = (int)cmd.ExecuteScalar();
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
        
                                 u.DisplayName, u.FirstName, u.LastName, u.CategoryId, u.Birthday, u.Weight, u.Height, u.BFPercentage, u.BMR, u.CurrentFocus, u.Bio, u.Email, u.JoinDate, u.ImageAddress, u.Deactivated, u.UserTypeId,.DisplayName,
 
                                cat.Goal,

                                ut.Type,

                                r.Title, r.CategoryId, r.Topic, r.DateAdded, r.Content,

                                c.Goal
                          
                            FROM SavedResource sr
                            LEFT JOIN User u ON sr.UserId = u.Id
                            LEFT JOIN Category cat ON u.CategoryId = cat.Id
                            LEFT JOIN UserType ut ON u.UserTypeId = ut.Id
                            LEFT JOIN r ON sr.ResourceId = r.Id
                            LEFT JOIN Category c ON r.CategoryId = c.Id"";
                            WHERE sr.Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    SavedResource savedResource = null;

                    if (reader.Read())
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
                            Resource = NewResourceFromReader(reader),
                            SaveDate = DbUtils.GetDateTime(reader, "SaveDate")

                        };
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
                              SELECT sr.Id, sr.UserId, sr.ResourceId, sr.SaveDate,
        
                                 u.DisplayName, u.FirstName, u.LastName, u.CategoryId AS UCategoryId, u.Birthday, u.Weight, u.Height, u.BFPercentage, u.BMR, u.CurrentFocus, u.Bio, u.Email, u.JoinDate, u.ImageAddress, u.Deactivated, u.UserTypeId,.DisplayName,
 
                                cat.Goal AS CGoal,

                                ut.Type,

                                r.Title, r.CategoryId, r.Topic, r.DateAdded, r.Content,

                                c.Goal
                          
                            FROM SavedResource sr
                            LEFT JOIN User u ON sr.UserId = u.Id
                            LEFT JOIN Category cat ON u.CategoryId = cat.Id
                            LEFT JOIN UserType ut ON u.UserTypeId = ut.Id
                            LEFT JOIN r ON sr.ResourceId = r.Id
                            LEFT JOIN Category c ON r.CategoryId = c.Id"";
                            WHERE sr.UserId = @userId";

                    cmd.Parameters.AddWithValue("@userId", userId);
                    var reader = cmd.ExecuteReader();
                    var savedResources = new List<SavedResource>();
                    SavedResource savedResource = null;

                    while (reader.Read())
                    {
                        if (savedResource == null)
                        {
                            savedResource = new SavedResource()
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
                                    Weight = DbUtils.GetDecimal(reader, "Weight"),
                                    Height = DbUtils.GetString(reader, "Height"),
                                    BFPercentage = DbUtils.GetDecimal(reader, "BFPercentage"),
                                    BMR = DbUtils.GetInt(reader, "BMR"),
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

                        savedResources.Add(savedResource);
                    }

                    reader.Close();

                    return savedResources;
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
                Content = DbUtils.GetString(reader, "Content")
            };
        }
    }
}
