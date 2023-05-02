using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Recomp_Resource.Models;
using Recomp_Resource.Utils;
using System.Collections.Generic;
using System.Reflection.PortableExecutable;

namespace Recomp_Resource.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }


        public User GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT u.Id, u.FirebaseUserId, u.FirstName, u.LastName, u.DisplayName, u.CategoryId, u.Birthday, u.Weight, u.Height, u.BFPercentage, u.BMR, u.CurrentFocus, u.Bio, u.Email, u.JoinDate, u.ImageAddress, u.Deactivated,  u.UserTypeId,

                            c.Goal,

                            ut.Type

                        FROM User u
                        LEFT JOIN UserType ut on u.UserTypeId = ut.Id
                        LEFT JOIN Category c on u.CategoryId = c.Id
                        WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    User user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = NewUserFromReader(reader);
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public User GetUserById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT u.Id, u.FirebaseUserId, u.FirstName, u.LastName, u.DisplayName,          u.CategoryId, u.Birthday, u.Weight, u.Height, u.BFPercentage, u.BMR,        u.CurrentFocus, u.Bio, u.Email, u.JoinDate, u.ImageAddress, u.Deactivated,  u.UserTypeId,

                            c.Goal,

                            ut.Type

                          FROM User u
                          LEFT JOIN UserType ut on u.UserTypeId = ut.Id
                          LEFT JOIN Category c on u.CategoryId = c.Id
                          WHERE u.Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    User user = null;

                    if (reader.Read())
                    {
                        user = NewUserFromReader(reader);
                    }

                    reader.Close();

                    return user;
                }
            }
        }

        public List<User> GetAllUsers()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT u.Id, u.FirebaseUserId, u.FirstName, u.LastName, u.DisplayName, u.CategoryId, u.Birthday, u.Weight, u.Height, u.BFPercentage,u.BMR, u.CurrentFocus, u.Bio, u.Email, u.JoinDate, u.ImageAddress, u.Deactivated, u.UserTypeId,

                               c.Goal,

                               ut.Type

                        FROM User u
                        LEFT JOIN UserType ut on u.UserTypeId = ut.Id
                        LEFT JOIN Category c on u.CategoryId = c.Id
                        ORDER BY u.DisplayName";


                    var reader = cmd.ExecuteReader();

                    var users = new List<User>();

                    while (reader.Read())
                    {
                        users.Add(NewUserFromReader(reader));
                    }

                    reader.Close();

                    return users;
                }
            }
        }



        public void Add(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO User (DisplayName, FirstName, LastName, Birthday, Weight, Height, BFPercentage, BMR, CurrentFocus, CategoryId, Email, ImageAddress, JoinDate, Deactivated, Bio, UserTypeId, FirebaseUserId)
                        OUTPUT INSERTED.ID
                        VALUES (@displayName, @firstName, @lastName, @birthday, @weight, @height @bFPercentage, @bMR, @currentFocus, @categoryId, @email, @imageAddress, @joinDate, @deactivated, @bio, @userTypeId, @firebaseUserId)";
                    cmd.Parameters.AddWithValue("@displayName", user.DisplayName);
                    cmd.Parameters.AddWithValue("@firstName", user.FirstName);
                    cmd.Parameters.AddWithValue("@lastName", user.LastName);
                    cmd.Parameters.AddWithValue("@birthday", user.Birthday);
                    cmd.Parameters.AddWithValue("@weight", user.Weight);
                    cmd.Parameters.AddWithValue("@height", user.Height);
                    cmd.Parameters.AddWithValue("@bFPercentage", user.BFPercentage);
                    cmd.Parameters.AddWithValue("@bMR", user.BMR);
                    cmd.Parameters.AddWithValue("@currentFocus", user.CurrentFocus);
                    cmd.Parameters.AddWithValue("@categoryId", user.CategoryId);
                    cmd.Parameters.AddWithValue("@email", user.Email);
                    cmd.Parameters.AddWithValue("@imageAddress", user.ImageAddress);
                    cmd.Parameters.AddWithValue("@joinDate", user.JoinDate);
                    cmd.Parameters.AddWithValue("@deactivated", user.Deactivated);
                    cmd.Parameters.AddWithValue("@bio", user.Bio);
                    cmd.Parameters.AddWithValue("@userTypeId", user.UserTypeId);
                    cmd.Parameters.AddWithValue("@firebaseUserId", user.FirebaseUserId);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }


        public void Edit(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE User
                           SET DisplayName = @displayName, 
                               FirstName = @FirstName, 
                               LastName = @LastName,
                               Birthday = @Birthday, 
                               Weight = @Weight, 
                               Height = @Height,
                               BFPercentage = @BFPercentage, 
                               BMR = @BMR 
                               CurrentFocus = @CurrentFocus
                               CategoryId = @CategoryId, 
                               Email = @Email, 
                               ImageAddress = @ImageAddress,
                               JoinDate = @JoinDate, 
                               Deactivated = @Deactivated, 
                               Bio = @Bio,
                               UserTypeId = @UserTypeId,
                               FirebaseUserId = @FirebaseUserId,
                         WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", user.Id);
                    cmd.Parameters.AddWithValue("@displayName", user.DisplayName);
                    cmd.Parameters.AddWithValue("@firstName", user.FirstName);
                    cmd.Parameters.AddWithValue("@lastName", user.LastName);
                    cmd.Parameters.AddWithValue("@birthday", user.Birthday);
                    cmd.Parameters.AddWithValue("@weight", user.Weight);
                    cmd.Parameters.AddWithValue("@height", user.Height);
                    cmd.Parameters.AddWithValue("@bFPercentage", user.BFPercentage);
                    cmd.Parameters.AddWithValue("@bMR", user.BMR);
                    cmd.Parameters.AddWithValue("@currentFocus", user.CurrentFocus);
                    cmd.Parameters.AddWithValue("@categoryId", user.CategoryId);
                    cmd.Parameters.AddWithValue("@email", user.Email);
                    cmd.Parameters.AddWithValue("@imageAddress", user.ImageAddress);
                    cmd.Parameters.AddWithValue("@joinDate", user.JoinDate);
                    cmd.Parameters.AddWithValue("@deactivated", user.Deactivated);
                    cmd.Parameters.AddWithValue("@bio", user.Bio);
                    cmd.Parameters.AddWithValue("@userTypeId", user.UserTypeId);
                    cmd.Parameters.AddWithValue("@firebaseUserId", user.FirebaseUserId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<User> SearchUsers(string criterion)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT u.Id, u.FirebaseUserId, u.FirstName, u.LastName, u.DisplayName, u.CategoryId, u.Birthday, u.Weight, u.Height, u.BFPercentage,u.BMR, u.CurrentFocus, u.Bio, u.Email, u.JoinDate, u.ImageAddress, u.Deactivated, u.UserTypeId,

                               c.Goal,

                               ut.Type

                        FROM User u
                        LEFT JOIN UserType ut on u.UserTypeId = ut.Id
                        LEFT JOIN Category c on u.CategoryId = c.Id
                        WHERE u.DisplayName LIKE @Criterion OR u.CurrentFocus LIKE @Criterion
                        ORDER BY u.DisplayName";

                    DbUtils.AddParameter(cmd, "@Criterion", $"%{criterion}%");
                    var reader = cmd.ExecuteReader();

                    var users = new List<User>();

                    while (reader.Read())
                    {
                        users.Add(NewUserFromReader(reader));
                    }

                    reader.Close();

                    return users;
                }
            }
        }


        private User NewUserFromReader(SqlDataReader reader)
        {
            return new User()
            {
                Id = DbUtils.GetInt(reader, "Id"),
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
                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                Chats = new List<Chat>(),
                Messages = new List<Message>(),
                SavedResources = new List<SavedResource>()
            };
        }
    }
}

