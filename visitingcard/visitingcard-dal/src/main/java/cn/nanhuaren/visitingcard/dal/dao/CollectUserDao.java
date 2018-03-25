package cn.nanhuaren.visitingcard.dal.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

import cn.nanhuaren.visitingcard.dal.domain.CollectUser;

@Component
public class CollectUserDao {

	private final SqlSession sqlSession;

	public CollectUserDao(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	public CollectUser selectById(Long id) {
		return this.sqlSession.selectOne("CollectUserMapper.selectById", id);
	}

	public List<CollectUser> listAll() {
		return this.sqlSession.selectList("CollectUserMapper.listAll");
	}

	public CollectUser insert(CollectUser data) {
		this.sqlSession.insert("CollectUserMapper.insert", data);
		return data;
	}

	public int updateById(CollectUser data) {
		return this.sqlSession.update("CollectUserMapper.updateById", data);
	}

}
