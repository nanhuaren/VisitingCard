drop table if exists t_wechat_info;
drop table if exists t_user_info;
drop table if exists t_merchant;

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
	createTime date,
	updateTime date
);

create table t_user_info (
	id int primary key auto_increment, 
	name varchar(100), 
	mobile varchar(100), 
	tel varchar(100), 
	qq varchar(100), 
	weixin varchar(100), 
	email varchar(100), 
	province varchar(100), 
	city varchar(100), 
	area varchar(100), 
	address varchar(100), 
	openId varchar(100),
	createTime date,
	updateTime date
);
	
create table t_merchant (
	id int primary key auto_increment, 
	name varchar(100), 
	type varchar(100), 
	logo varchar(100), 
	description varchar(100), 
	detail varchar(100), 
	province varchar(100), 
	city varchar(100), 
	area varchar(100), 
	address varchar(100), 
	userId int,
	createTime date,
	updateTime date
);