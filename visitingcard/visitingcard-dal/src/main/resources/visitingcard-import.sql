drop table if exists t_wechat_info;
drop table if exists t_user_info;
drop table if exists t_merchant;
drop table if exists t_catalog;

create table t_wechat_info (
	id int(10) primary key auto_increment, 
	openId varchar(100), 
	unionId varchar(100), 
	nickName varchar(100), 
	avatarUrl varchar(200), 
	gender varchar(100), 
	city varchar(100), 
	province varchar(100), 
	country varchar(100), 
	language varchar(100),
	createTime timestamp,
	updateTime timestamp default current_timestamp
);

create table t_user_info (
	id int primary key auto_increment, 
	name varchar(100), 
	headerImg varchar(200), 
	mobile varchar(100), 
	tel varchar(100), 
	fax varchar(100), 
	qq varchar(100), 
	weixin varchar(100), 
	weixinQrcode varchar(100), 
	email varchar(100), 
	province varchar(100), 
	city varchar(100), 
	area varchar(100), 
	address varchar(100), 
	description varchar(1000), 
	openId varchar(100),
	userType varchar(100),
	ownerId int,
	createTime timestamp,
	updateTime timestamp default current_timestamp
);
	
create table t_merchant (
	id int primary key auto_increment, 
	merchantName varchar(100), 
	merchantLogo varchar(2000), 
	merchantPosition varchar(100), 
	merchantType varchar(100), 
	merchantDescription varchar(1000), 
	merchantPicture varchar(2000),
	merchantCase varchar(2000),  
	userId int,
	createTime timestamp,
	updateTime timestamp default current_timestamp
);


create table t_catalog (
	id int primary key auto_increment, 
	catalogName varchar(100), 
	catalogPicture varchar(1000),  
	catalogDescription varchar(1000), 
	catalogSortNum int, 
	userId int,
	createTime timestamp,
	updateTime timestamp default current_timestamp
);

create table t_collectUser (
	id int primary key auto_increment, 
	name varchar(100), 
	mobile varchar(2000), 
	address varchar(100), 
	count varchar(100), 
	description varchar(1000), 
	pictures varchar(2000),
	status varchar(2000),  
	createTime timestamp,
	updateTime timestamp default current_timestamp
);