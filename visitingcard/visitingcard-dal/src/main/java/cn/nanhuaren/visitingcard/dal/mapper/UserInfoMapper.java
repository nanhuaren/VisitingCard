package cn.nanhuaren.visitingcard.dal.mapper;

import org.apache.ibatis.annotations.Mapper;

import cn.nanhuaren.visitingcard.dal.domain.UserInfo;

@Mapper
public interface UserInfoMapper {

	UserInfo selectByOpenId(String openId);

	int insert(UserInfo data);

	int updateById(UserInfo data);

}
