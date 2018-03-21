package cn.nanhuaren.visitingcard.dal.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

import cn.nanhuaren.visitingcard.dal.domain.Catalog;

@Component
public class CatalogDao {

	private final SqlSession sqlSession;

	public CatalogDao(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	public List<Catalog> listByUserId(long userId) {
		return this.sqlSession.selectList("CatalogMapper.listByUserId", userId);
	}
	
	public Catalog selectById(long id) {
		return this.sqlSession.selectOne("CatalogMapper.selectById", id);
	}

	public int insert(Catalog data) {
		return this.sqlSession.insert("CatalogMapper.insert", data);
	}

	public int updateById(Catalog data) {
		return this.sqlSession.update("CatalogMapper.updateById", data);
	}
	
	public int deleteById(Catalog data) {
		return this.sqlSession.delete("CatalogMapper.deleteById", data);
	}

}
