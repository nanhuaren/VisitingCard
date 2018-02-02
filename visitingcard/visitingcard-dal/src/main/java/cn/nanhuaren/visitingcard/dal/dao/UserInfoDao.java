package cn.nanhuaren.visitingcard.dal.dao;

import java.util.List;

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

	public UserInfo selectById(Long id) {
		return this.sqlSession.selectOne("UserInfoMapper.selectById", id);
	}

	public UserInfo selectByMobile(String mobile) {
		return this.sqlSession.selectOne("UserInfoMapper.selectByMobile", mobile);
	}

	public List<UserInfo> listByOwnerId(long ownerId) {
		return this.sqlSession.selectList("UserInfoMapper.listByOwnerId", ownerId);
	}
	
	public Integer countByOwnerId(long ownerId) {
		return this.sqlSession.selectOne("UserInfoMapper.countByOwnerId", ownerId);
	}

	public int insert(UserInfo data) {
		return this.sqlSession.insert("UserInfoMapper.insert", data);
	}

	public int updateById(UserInfo data) {
		return this.sqlSession.update("UserInfoMapper.updateById", data);
	}

}
