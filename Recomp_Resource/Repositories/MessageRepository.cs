using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Recomp_Resource.Models;
using Recomp_Resource.Utils;
using System.Collections.Generic;

namespace Recomp_Resource.Repositories
{
    public class MessageRepository : BaseRepository, IMessageRepository
    {
        public MessageRepository(IConfiguration configuration) : base(configuration) { }



            public List<Message> GetAllMessagesOfUser(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT m.Id, m.Subject, m.DateCreated, m.Opened, m.Content, m.SenderId, m.RecipientId, m.SenderHidden, m.RecipientHidden,

                                s.Id AS SId, s.DisplayName AS SDisplayName, s.FirstName AS SFirstName, s.LastName AS SLastName, s.Birthday AS SBirthday, s.Weight AS SWeight, s.Height AS SHeight, s.BFPercentage AS SBFPercentage, s.BMR AS SBMR, s.CurrentFocus AS SCurrentFocus, s.Deactivated AS SDeactivated, s.CategoryId AS SCategoryId, s.UserTypeId As SUserTypeId, s.JoinDate AS SJoinDate, s.ImageAddress AS SImageAddress, s.Bio AS SBio, s.Email AS SEmail,
                          
                                r.Id AS RId, r.DisplayName AS RDisplayName, r.FirstName AS RFirstName, r.LastName AS RLastName, s.Birthday AS RBirthday, r.Weight AS RWeight, r.Height AS RHeight, r.BFPercentage AS RBFPercentage, r.BMR AS RBMR, r.CurrentFocus AS RCurrentFocus, r.Deactivated AS RDeactivated, r.CategoryId AS RCategoryId, r.UserTypeId As RUserTypeId, r.JoinDate AS RJoinDate, r.ImageAddress AS RImageAddress, r.Bio AS RBio, r.Email AS REmail,

                                cs.Goal AS SGoal,
                                cr.Goal AS RGoal,

                                us.Type AS SType,
                                ur.Type AS RType

                          FROM Message m
                                LEFT JOIN [User] s ON m.SenderId = s.Id
                                LEFT JOIN [User] r ON m.RecipientId = r.Id
                                LEFT JOIN Category cs ON cs.Id = s.CategoryId
                                LEFT JOIN Category cr ON cr.Id = r.CategoryId
                                LEFT JOIN UserType ur ON ur.Id = r.UserTypeId
                                LEFT JOIN UserType us ON us.Id = s.UserTypeId
                                WHERE m.SenderId = @id OR m.RecipientId = @id
                                ORDER by m.DateCreated DESC
                                ";

                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();

                    var resources = new List<Message>();

                    while (reader.Read())
                    {
                        resources.Add(NewMessageFromReader(reader));
                    }

                    reader.Close();

                    return resources;
                }
            }
        }
        public List<Message> GetAllMessagesSentByUser(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT m.Id, m.Subject, m.DateCreated, m.Opened, m.Content, m.SenderId, m.RecipientId, m.SenderHidden, m.RecipientHidden,

                                s.Id AS SId, s.DisplayName AS SDisplayName, s.FirstName AS SFirstName, s.LastName AS SLastName, s.Birthday AS SBirthday, s.Weight AS SWeight, s.Height AS SHeight, s.BFPercentage AS SBFPercentage, s.BMR AS SBMR, s.CurrentFocus AS SCurrentFocus, s.Deactivated AS SDeactivated, s.CategoryId AS SCategoryId, s.UserTypeId As SUserTypeId, s.JoinDate AS SJoinDate, s.ImageAddress AS SImageAddress, s.Bio AS SBio, s.Email AS SEmail,
                          
                                r.Id AS RId, r.DisplayName AS RDisplayName, r.FirstName AS RFirstName, r.LastName AS RLastName, s.Birthday AS RBirthday, r.Weight AS RWeight, r.Height AS RHeight, r.BFPercentage AS RBFPercentage, r.BMR AS RBMR, r.CurrentFocus AS RCurrentFocus, r.Deactivated AS RDeactivated, r.CategoryId AS RCategoryId, r.UserTypeId As RUserTypeId, r.JoinDate AS RJoinDate, r.ImageAddress AS RImageAddress, r.Bio AS RBio, r.Email AS REmail,

                                cs.Goal AS SGoal,
                                cr.Goal AS RGoal,

                                us.Type AS SType,
                                ur.Type AS RType

                          FROM Message m
                                LEFT JOIN [User] s ON m.SenderId = s.Id
                                LEFT JOIN [User] r ON m.RecipientId = r.Id
                                LEFT JOIN Category cs ON cs.Id = s.CategoryId
                                LEFT JOIN Category cr ON cr.Id = r.CategoryId
                                LEFT JOIN UserType ur ON ur.Id = r.UserTypeId
                                LEFT JOIN UserType us ON us.Id = s.UserTypeId
                                WHERE m.SenderId = @id
                                ORDER by m.DateCreated DESC
                                ";

                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();

                    var resources = new List<Message>();

                    while (reader.Read())
                    {
                        resources.Add(NewMessageFromReader(reader));
                    }

                    reader.Close();

                    return resources;
                }
            }
        }

        public List<Message> GetAllMessagesReceivedByUser(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT m.Id, m.Subject, m.DateCreated, m.Opened, m.Content, m.SenderId, m.RecipientId, m.SenderHidden, m.RecipientHidden,

                                s.Id AS SId, s.DisplayName AS SDisplayName, s.FirstName AS SFirstName, s.LastName AS SLastName, s.Birthday AS SBirthday, s.Weight AS SWeight, s.Height AS SHeight, s.BFPercentage AS SBFPercentage, s.BMR AS SBMR, s.CurrentFocus AS SCurrentFocus, s.Deactivated AS SDeactivated, s.CategoryId AS SCategoryId, s.UserTypeId As SUserTypeId, s.JoinDate AS SJoinDate, s.ImageAddress AS SImageAddress, s.Bio AS SBio, s.Email AS SEmail,
                          
                                r.Id AS RId, r.DisplayName AS RDisplayName, r.FirstName AS RFirstName, r.LastName AS RLastName, s.Birthday AS RBirthday, r.Weight AS RWeight, r.Height AS RHeight, r.BFPercentage AS RBFPercentage, r.BMR AS RBMR, r.CurrentFocus AS RCurrentFocus, r.Deactivated AS RDeactivated, r.CategoryId AS RCategoryId, r.UserTypeId As RUserTypeId, r.JoinDate AS RJoinDate, r.ImageAddress AS RImageAddress, r.Bio AS RBio, r.Email AS REmail,

                                cs.Goal AS SGoal,
                                cr.Goal AS RGoal,

                                us.Type AS SType,
                                ur.Type AS RType

                          FROM Message m
                                LEFT JOIN [User] s ON m.SenderId = s.Id
                                LEFT JOIN [User] r ON m.RecipientId = r.Id
                                LEFT JOIN Category cs ON cs.Id = s.CategoryId
                                LEFT JOIN Category cr ON cr.Id = r.CategoryId
                                LEFT JOIN UserType ur ON ur.Id = r.UserTypeId
                                LEFT JOIN UserType us ON us.Id = s.UserTypeId
                                WHERE m.RecipientId = @id
                                ORDER by m.DateCreated DESC
                                ";

                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();

                    var resources = new List<Message>();

                    while (reader.Read())
                    {
                        resources.Add(NewMessageFromReader(reader));
                    }

                    reader.Close();

                    return resources;
                }
            }
        }
        public Message GetMessageById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT m.Id, m.Subject, m.DateCreated, m.Opened, m.Content, m.SenderId, m.RecipientId, m.SenderHidden, m.RecipientHidden,
                                s.Id AS SId, s.DisplayName AS SDisplayName, s.FirstName AS SFirstName, s.LastName AS SLastName, s.Birthday AS SBirthday, s.Weight AS SWeight, s.Height AS SHeight, s.BFPercentage AS SBFPercentage, s.BMR AS SBMR, s.CurrentFocus AS SCurrentFocus, s.Deactivated AS SDeactivated, s.CategoryId AS SCategoryId, s.UserTypeId As SUserTypeId, s.JoinDate AS SJoinDate, s.ImageAddress AS SImageAddress, s.Bio AS SBio, s.Email AS SEmail,
                          
                                r.Id AS RId, r.DisplayName AS RDisplayName, r.FirstName AS RFirstName, r.LastName AS RLastName, s.Birthday AS RBirthday, r.Weight AS RWeight, r.Height AS RHeight, r.BFPercentage AS RBFPercentage, r.BMR AS RBMR, r.CurrentFocus AS RCurrentFocus, r.Deactivated AS RDeactivated, r.CategoryId AS RCategoryId, r.UserTypeId As RUserTypeId, r.JoinDate AS RJoinDate, r.ImageAddress AS RImageAddress, r.Bio AS RBio, r.Email AS REmail,

                                cs.Goal AS SGoal,
                                cr.Goal AS RGoal,

                                us.Type AS SType,
                                ur.Type AS RType

                          FROM Message m
                                LEFT JOIN [User] s ON m.SenderId = s.Id
                                LEFT JOIN [User] r ON m.RecipientId = r.Id
                                LEFT JOIN Category cs ON cs.Id = s.CategoryId
                                JOIN Category cr ON cr.Id = r.CategoryId
                                JOIN UserType ur ON ur.Id = r.UserTypeId
                                JOIN UserType us ON us.Id = s.UserTypeId

                              WHERE m.Id = @id";

                    DbUtils.AddParameter(cmd,"@id", id);
                    var reader = cmd.ExecuteReader();

                    Message message = null;

                    if (reader.Read())
                    {
                        message = NewMessageFromReader(reader);
                    }

                    reader.Close();

                    return message;
                }
            }
        }
        public void Edit(Message message)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Message
                           SET
                               Opened = @Opened    
                         WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", message.Id);
                    DbUtils.AddParameter(cmd, "@Opened", message.Opened);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Add(Message message)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Message (Subject, DateCreated, Opened, SenderId, RecipientId, Content, SenderHidden, RecipientHidden)
                        OUTPUT INSERTED.ID
                        VALUES (@Subject, @DateCreated, @Opened, @SenderId, @RecipientId, @Content, @SenderHidden, @RecipientHidden)";
                   DbUtils.AddParameter(cmd, "@Subject", message.Subject);
                   DbUtils.AddParameter(cmd, "@DateCreated", message.DateCreated);
                   DbUtils.AddParameter(cmd, "@Opened", message.Opened);
                   DbUtils.AddParameter(cmd, "@SenderId", message.SenderId);
                   DbUtils.AddParameter(cmd, "@RecipientId", message.RecipientId);
                   DbUtils.AddParameter(cmd, "@Content", message.Content);
                   DbUtils.AddParameter(cmd, "@SenderHidden", message.SenderHidden);
                    DbUtils.AddParameter(cmd, "@RecipientHidden", message.RecipientHidden);

                    message.Id = (int)cmd.ExecuteScalar();
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
                    cmd.CommandText = @"DELETE FROM Message WHERE Message.Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }



        private Message NewMessageFromReader(SqlDataReader reader)
        {
            return new Message()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Subject = DbUtils.GetString(reader, "Subject"),
                DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                Opened = reader.GetBoolean(reader.GetOrdinal("Opened")),
                Content = DbUtils.GetString(reader, "Content"),
                SenderHidden= reader.GetBoolean(reader.GetOrdinal("SenderHidden")),
                RecipientHidden= reader.GetBoolean(reader.GetOrdinal("RecipientHidden")),
                RecipientId = DbUtils.GetInt(reader, "RecipientId"),
                Sender = new User()
                {

                    Id = DbUtils.GetInt(reader, "SId"),
                    DisplayName = DbUtils.GetString(reader, "SDisplayName"),
                    FirstName = DbUtils.GetString(reader, "SFirstName"),
                    LastName = DbUtils.GetString(reader, "SLastName"),
                    Birthday = DbUtils.GetDateTime(reader, "SBirthday"),
                    Weight = DbUtils.GetString(reader, "SWeight"),
                    Height = DbUtils.GetString(reader, "SHeight"),
                    BFPercentage = DbUtils.GetString(reader, "SBFPercentage"),
                    BMR = DbUtils.GetString(reader, "SBMR"),
                    CurrentFocus = DbUtils.GetString(reader, "SCurrentFocus"),
                    Deactivated = reader.GetBoolean(reader.GetOrdinal("SDeactivated")),
                    CategoryId = DbUtils.GetInt(reader, "SCategoryId"),
                    Category = new Category()
                    {
                        Id = DbUtils.GetInt(reader, "SCategoryId"),
                        Goal = DbUtils.GetString(reader, "SGoal")
                    },
                    UserTypeId = DbUtils.GetInt(reader, "SUserTypeId"),
                    UserType = new UserType()
                    {
                        Id = DbUtils.GetInt(reader, "SUserTypeId"),
                        Type = DbUtils.GetString(reader, "SType")
                    },
                    JoinDate = DbUtils.GetDateTime(reader, "SJoinDate"),
                    ImageAddress = DbUtils.GetString(reader, "SImageAddress"),
                    Bio = DbUtils.GetString(reader, "SBio"),
                    Email = DbUtils.GetString(reader, "SEmail")
                },
                Recipient = new User()
                {

                    Id = DbUtils.GetInt(reader, "RId"),
                    DisplayName = DbUtils.GetString(reader, "RDisplayName"),
                    FirstName = DbUtils.GetString(reader, "RFirstName"),
                    LastName = DbUtils.GetString(reader, "RLastName"),
                    Birthday = DbUtils.GetDateTime(reader, "RBirthday"),
                    Weight = DbUtils.GetString(reader, "RWeight"),
                    Height = DbUtils.GetString(reader, "RHeight"),
                    BFPercentage = DbUtils.GetString(reader, "RBFPercentage"),
                    BMR = DbUtils.GetString(reader, "RBMR"),
                    CurrentFocus = DbUtils.GetString(reader, "RCurrentFocus"),
                    Deactivated = reader.GetBoolean(reader.GetOrdinal("RDeactivated")),
                    CategoryId = DbUtils.GetInt(reader, "RCategoryId"),
                    Category = new Category()
                    {
                        Id = DbUtils.GetInt(reader, "RCategoryId"),
                        Goal = DbUtils.GetString(reader, "RGoal")
                    },
                    UserTypeId = DbUtils.GetInt(reader, "RUserTypeId"),
                    UserType = new UserType()
                    {
                        Id = DbUtils.GetInt(reader, "RUserTypeId"),
                        Type = DbUtils.GetString(reader, "RType")
                    },
                    JoinDate = DbUtils.GetDateTime(reader, "RJoinDate"),
                    ImageAddress = DbUtils.GetString(reader, "RImageAddress"),
                    Bio = DbUtils.GetString(reader, "RBio"),
                    Email = DbUtils.GetString(reader, "REmail")
                }
            };
        }
    }
}
