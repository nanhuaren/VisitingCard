--
--    Copyright 2015-2016 the original author or authors.
--
--    Licensed under the Apache License, Version 2.0 (the "License");
--    you may not use this file except in compliance with the License.
--    You may obtain a copy of the License at
--
--       http://www.apache.org/licenses/LICENSE-2.0
--
--    Unless required by applicable law or agreed to in writing, software
--    distributed under the License is distributed on an "AS IS" BASIS,
--    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
--    See the License for the specific language governing permissions and
--    limitations under the License.
--

drop table if exists t_wechat_info;
drop table if exists t_user_info;
drop table if exists t_merchant;

create table t_wechat_info (id int primary key auto_increment, openId varchar, unionId varchar, nickName varchar, avatarUrl varchar, gender varchar, city varchar, province varchar, country varchar, language varchar);
create table t_user_info (id int primary key auto_increment, name varchar, mobile varchar, tel varchar, qq varchar, weixin varchar, email varchar, province varchar, city varchar, area varchar, address varchar, openId varchar);
create table t_merchant (id int primary key auto_increment, name varchar, type varchar, logo varchar, description varchar, detail varchar, province varchar, city varchar, area varchar, address varchar, userId int);

