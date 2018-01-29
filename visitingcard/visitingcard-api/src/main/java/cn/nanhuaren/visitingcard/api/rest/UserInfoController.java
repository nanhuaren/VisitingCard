
package cn.nanhuaren.visitingcard.api.rest;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import cn.nanhuaren.visitingcard.api.bean.ResultBody;
import cn.nanhuaren.visitingcard.dal.dao.UserInfoDao;
import cn.nanhuaren.visitingcard.dal.domain.UserInfo;

@RestController
@RequestMapping("/user")
public class UserInfoController {

	private Logger logger = LoggerFactory.getLogger(UserInfoController.class);

	@Autowired
	private UserInfoDao userInfoDao;

	@ResponseBody
	@RequestMapping(value = "/{openId}", method = { RequestMethod.POST, RequestMethod.GET })
	public ResultBody get(@PathVariable String openId, HttpServletRequest request, HttpServletResponse response) {
		ResultBody resultBody = new ResultBody();
		UserInfo userInfo = userInfoDao.selectByOpenId(openId);
		if (userInfo != null) {
			resultBody.setData(userInfo);
		} else {
			resultBody.isError("获取用户信息失败");
		}
		return resultBody;
	}

	@ResponseBody
	@RequestMapping(value = "/add", method = { RequestMethod.POST, RequestMethod.GET })
	public ResultBody add(UserInfo userInfo, HttpServletRequest request, HttpServletResponse response) {
		ResultBody resultBody = new ResultBody();
		logger.info("request userInfo={}", userInfo);
		UserInfo queryUserInfo = new UserInfo();
		queryUserInfo = userInfoDao.selectByOpenId(userInfo.getOpenId());
		if (queryUserInfo == null) {
			queryUserInfo = new UserInfo();
			queryUserInfo.setName(userInfo.getName());
			queryUserInfo.setMobile(userInfo.getMobile());
			queryUserInfo.setTel(userInfo.getTel());
			queryUserInfo.setQq(userInfo.getQq());
			queryUserInfo.setWeixin(userInfo.getWeixin());
			queryUserInfo.setEmail(userInfo.getEmail());
			queryUserInfo.setProvince(userInfo.getProvince());
			queryUserInfo.setCity(userInfo.getCity());
			queryUserInfo.setArea(userInfo.getArea());
			queryUserInfo.setAddress(userInfo.getAddress());
			queryUserInfo.setOpenId(userInfo.getOpenId());
			queryUserInfo.setCreateTime(new Date());
			userInfoDao.insert(queryUserInfo);
		} else {
			queryUserInfo.setName(userInfo.getName());
			queryUserInfo.setMobile(userInfo.getMobile());
			queryUserInfo.setTel(userInfo.getTel());
			queryUserInfo.setQq(userInfo.getQq());
			queryUserInfo.setWeixin(userInfo.getWeixin());
			queryUserInfo.setEmail(userInfo.getEmail());
			queryUserInfo.setProvince(userInfo.getProvince());
			queryUserInfo.setCity(userInfo.getCity());
			queryUserInfo.setArea(userInfo.getArea());
			queryUserInfo.setAddress(userInfo.getAddress());
			queryUserInfo.setOpenId(userInfo.getOpenId());
			queryUserInfo.setUpdateTime(new Date());
			userInfoDao.updateById(queryUserInfo);
		}
		return resultBody;
	}
}
