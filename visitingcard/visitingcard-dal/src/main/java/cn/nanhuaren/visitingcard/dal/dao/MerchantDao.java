package cn.nanhuaren.visitingcard.dal.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

import cn.nanhuaren.visitingcard.dal.domain.Merchant;

@Component
public class MerchantDao {

	private final SqlSession sqlSession;

	public MerchantDao(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	public Merchant selectByUserId(long userId) {
		return this.sqlSession.selectOne("MerchantMapper.selectByOpenId", userId);
	}

	public int insert(Merchant data) {
		return this.sqlSession.insert("MerchantMapper.insert", data);
	}

	public int updateById(Merchant data) {
		return this.sqlSession.update("MerchantMapper.updateById", data);
	}

}
