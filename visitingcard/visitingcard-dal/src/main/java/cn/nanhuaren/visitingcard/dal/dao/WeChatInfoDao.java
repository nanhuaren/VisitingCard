package cn.nanhuaren.visitingcard.dal.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

import cn.nanhuaren.visitingcard.dal.domain.UserMerchantInfo;
import cn.nanhuaren.visitingcard.dal.domain.WeChatInfo;

@Component
public class WeChatInfoDao {

	private final SqlSession sqlSession;

	public WeChatInfoDao(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	public WeChatInfo selectByOpenId(String openId) {
		return this.sqlSession.selectOne("WeChatInfoMapper.selectByOpenId", openId);
	}
	
	public List<WeChatInfo> lisUnBindWechat() {
		return this.sqlSession.selectList("WeChatInfoMapper.lisUnBind");
	}

	public int insert(WeChatInfo data) {
		return this.sqlSession.insert("WeChatInfoMapper.insert", data);
	}

	public int updateById(WeChatInfo data) {
		return this.sqlSession.update("WeChatInfoMapper.updateById", data);
	}

}
