package cn.nanhuaren.visitingcard.dal.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

import cn.nanhuaren.visitingcard.dal.domain.UserInfo;

@Component
public class UserInfoDao {

	private final SqlSession sqlSession;

	public UserInfoDao(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	public UserInfo selectByOpenId(String openId) {
		return this.sqlSession.selectOne("UserInfoMapper.selectByOpenId", openId);
	}

	public int insert(UserInfo data) {
		return this.sqlSession.insert("UserInfoMapper.insert", data);
	}

	public int updateById(UserInfo data) {
		return this.sqlSession.update("UserInfoMapper.updateById", data);
	}

}
