package cn.nanhuaren.visitingcard.dal.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

import cn.nanhuaren.visitingcard.dal.domain.UserInfo;
import cn.nanhuaren.visitingcard.dal.domain.UserMerchantInfo;

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

	public UserInfo insert(UserInfo data) {
		this.sqlSession.insert("UserInfoMapper.insert", data);
		return data;
	}

	public int updateById(UserInfo data) {
		return this.sqlSession.update("UserInfoMapper.updateById", data);
	}

	public UserMerchantInfo selectMerchantById(Long id) {
		return this.sqlSession.selectOne("UserInfoMapper.selectMerchantById", id);
	}

	public List<UserMerchantInfo> listMerchantByOwnerId(long ownerId) {
		return this.sqlSession.selectList("UserInfoMapper.listMerchantByOwnerId", ownerId);
	}

	public Integer countMerchantByOwnerId(long ownerId) {
		return this.sqlSession.selectOne("UserInfoMapper.countMerchantByOwnerId", ownerId);
	}
	
	public List<UserMerchantInfo> listAgentByOwnerId() {
		return this.sqlSession.selectList("UserInfoMapper.listAgentByOwnerId");
	}

	public Integer countAgentByOwnerId() {
		return this.sqlSession.selectOne("UserInfoMapper.countAgentByOwnerId");
	}
	
	public List<UserMerchantInfo> listUserByOwnerId() {
		return this.sqlSession.selectList("UserInfoMapper.listUserByOwnerId");
	}

	public Integer countUserByOwnerId() {
		return this.sqlSession.selectOne("UserInfoMapper.countUserByOwnerId");
	}
	
	public List<UserMerchantInfo> listMyUserByOwnerId(long ownerId) {
		return this.sqlSession.selectList("UserInfoMapper.listMyUserByOwnerId", ownerId);
	}

	public Integer countMyUserByOwnerId(long ownerId) {
		return this.sqlSession.selectOne("UserInfoMapper.countMyUserByOwnerId", ownerId);
	}
	
	public List<UserMerchantInfo> listMyAgentByOwnerId(long ownerId) {
		return this.sqlSession.selectList("UserInfoMapper.listMyAgentByOwnerId", ownerId);
	}

	public Integer countMyAgentByOwnerId(long ownerId) {
		return this.sqlSession.selectOne("UserInfoMapper.countMyAgentByOwnerId", ownerId);
	}
	
	public List<UserMerchantInfo> listAgent() {
		return this.sqlSession.selectList("UserInfoMapper.listAgent");
	}

	public Integer countAgent() {
		return this.sqlSession.selectOne("UserInfoMapper.countAgent");
	}
	
	public List<UserMerchantInfo> listUser() {
		return this.sqlSession.selectList("UserInfoMapper.listUser");
	}

	public Integer countUser() {
		return this.sqlSession.selectOne("UserInfoMapper.countUser");
	}
	
	public List<UserMerchantInfo> listApply() {
		return this.sqlSession.selectList("UserInfoMapper.listApply");
	}

	public Integer countApply() {
		return this.sqlSession.selectOne("UserInfoMapper.countApply");
	}

}
