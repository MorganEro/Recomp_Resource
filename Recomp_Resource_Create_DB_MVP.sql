USE [master]
GO

IF db_id('Recomp_Resource') IS NULl
  CREATE DATABASE [Recomp_Resource]
GO

USE [Recomp_Resource]
GO


DROP TABLE IF EXISTS [SavedResource];
DROP TABLE IF EXISTS [Comment];
DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS [UserType];
DROP TABLE IF EXISTS [Resource];
DROP TABLE IF EXISTS [Category];
DROP TABLE IF EXISTS [Quote];
GO

CREATE TABLE [Category] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [Goal] nvarchar(28) NOT NULL
)
GO

CREATE TABLE [UserType] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [Type] nvarchar(28) NOT NULL
)
GO

CREATE TABLE [User] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [FirstName] varchar(55) NOT NULL,
  [LastName] nvarchar(55) NOT NULL,
  [DisplayName] nvarchar(255) NOT NULL,
  [Birthday] datetime NOT NULL,
  [Weight] decimal(4,1),
  [Height] nvarchar(255),
  [BFPercentage] decimal(3,1),
  [BMR] int,
  [CurrentFocus] nvarchar(28),
  [CategoryId] int NOT NULL,
  [JoinDate] datetime DEFAULT GETDATE(),
  [ImageAddress] nvarchar(255),
  [UserTypeId] int DEFAULT (2),
  [Bio] nvarchar(255),
  [Email] nvarchar(255) NOT NULL,
  [FirebaseUserId] nvarchar(28) UNIQUE NOT NULL,
  [Deactivated] bit NOT NULL DEFAULT (0)
)
GO

CREATE TABLE [Resource] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [Title] nvarchar(255) NOT NULL,
  [CategoryId] int NOT NULL,
  [Topic] nvarchar(255),
  [DateAdded] datetime DEFAULT GETDATE(),
  [Content] nvarchar(255)
)
GO

CREATE TABLE [SavedResource] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [UserId] int NOT NULL,
  [ResourceId] int NOT NULL,
  [SaveDate] datetime DEFAULT GETDATE()
)
GO

CREATE TABLE [Comment] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [UserId] int NOT NULL,
  [ResourceId] int NOT NULL,
  [Content] nvarchar(255),
  [DateSent] datetime DEFAULT GETDATE()
)
GO

CREATE TABLE [Quote] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [Content] nvarchar(255) NOT NULL
)
GO

ALTER TABLE [SavedResource] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [SavedResource] ADD FOREIGN KEY ([ResourceId]) REFERENCES [Resource] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Comment] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Comment] ADD FOREIGN KEY ([ResourceId]) REFERENCES [Resource] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [User] ADD FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id])
GO

ALTER TABLE [Resource] ADD FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id])
GO

ALTER TABLE [User] ADD FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id])
GO
