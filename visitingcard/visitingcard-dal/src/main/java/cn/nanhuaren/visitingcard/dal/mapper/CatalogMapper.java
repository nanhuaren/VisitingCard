package cn.nanhuaren.visitingcard.dal.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import cn.nanhuaren.visitingcard.dal.domain.Catalog;

@Mapper
public interface CatalogMapper {

	List<Catalog> listByUserId(Long userId);

	int insert(Catalog data);

	int updateById(Catalog data);
	
	int deleteById(Catalog data);

}
