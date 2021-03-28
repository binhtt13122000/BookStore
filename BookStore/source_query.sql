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

insert into [Book]([name], [author], price, quantity, [image], [status], categoryId) 
values (N'Lập trình OOP', N'Hoàng Đức Nam', 23000, 10, 'https://tintuc.viettelstore.vn/wp-content/uploads/2020/02/ghep-anh-chan-troi-hinh-vuong-1.jpg', 1, 2),
(N'100 bài văn hay', N'Xuân Diệu', 40000, 10, 'https://firebasestorage.googleapis.com/v0/b/bookshop-9bea7.appspot.com/o/books%2FScrum%20vs%20Waterfall.jpg?alt=media&token=e0544423-b28e-4d98-bf79-ba92c32012b2', 1, 1),
(N'Toán học đại cương', N'Đỗ Duy', 36000, 10, 'https://firebasestorage.googleapis.com/v0/b/bookshop-9bea7.appspot.com/o/books%2Fmindmap.jpg?alt=media&token=85343aa0-f5be-459d-b8da-89d3d9527ac3', 1, 3)



