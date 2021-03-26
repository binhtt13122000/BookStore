drop database BookStore;
create database BookStore;
use BookStore;

create table [Role] (
	[id] int primary key identity(1, 1),
	[name] varchar(30) not null
)

create table [User] (
	[id] int primary key identity(1,1),
	[email] varchar(50) not null unique,
	[password] varchar(100) not null,
	[name] nvarchar(50) not null,
	[status] bit default 1,
	[roleId] int foreign key references [Role]([id])
)

create table [Category] (
	[id] int primary key identity(1,1),
	[name] nvarchar(50) not null,
)

create table [Book] (
	[id] int primary key identity(1,1),
	[name] nvarchar(50) not null,
	[author] nvarchar(50) not null,
	[price] float check([price] > 0),
	[quantity] int check([quantity] >= 0),
	[image] varchar(max) null,
	[status] bit default 1,
	[categoryId] int foreign key references [Category]([id]),
)

create table [Order] (
	[id] int primary key identity(1,1),
	[userId] int foreign key references [User]([id]),
	[phoneNumber] varchar(12) not null,
	[address] nvarchar(50) not null,
	[createTime] datetime,
	[total] float check([total] > 0)
)

create table [OrderDetail] (
	[id] int primary key identity(1,1),
	[orderId] int foreign key references [Order]([id]),
	[bookId] int foreign key references [Book]([id]),
	[quantity] int not null check([quantity] > 0),
	[price] float check([price] > 0),
)

create table ProductCart (
	[id] int primary key identity(1,1),
	[userId] int foreign key references [User]([id]),
	[bookId] int foreign key references [Book]([id]),
	[quantity] int not null check([quantity] > 0),
	[status] bit default 1,
)

insert into [Role]([name]) values ('USER'), ('ADMIN')

insert into [Category]([name]) values (N'Sách văn học'), (N'Sách tin học'), (N'Sách toán học')

