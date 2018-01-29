package cn.nanhuaren.visitingcard.dal.mapper;

import org.apache.ibatis.annotations.Mapper;

import cn.nanhuaren.visitingcard.dal.domain.Merchant;

@Mapper
public interface MerchantMapper {

	Merchant selectByUserId(Long userId);

	int insert(Merchant data);

	int updateById(Merchant data);

}
