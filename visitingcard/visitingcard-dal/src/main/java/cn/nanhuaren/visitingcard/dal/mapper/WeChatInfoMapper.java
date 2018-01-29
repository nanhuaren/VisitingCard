package cn.nanhuaren.visitingcard.dal.mapper;

import org.apache.ibatis.annotations.Mapper;

import cn.nanhuaren.visitingcard.dal.domain.WeChatInfo;

@Mapper
public interface WeChatInfoMapper {

	WeChatInfo selectByOpenId(String openId);

	int insert(WeChatInfo data);

	int updateById(WeChatInfo data);

}
