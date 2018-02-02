
package cn.nanhuaren.visitingcard.api.rest;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import cn.nanhuaren.visitingcard.api.bean.ResultBody;
import cn.nanhuaren.visitingcard.dal.dao.MerchantDao;
import cn.nanhuaren.visitingcard.dal.dao.UserInfoDao;
import cn.nanhuaren.visitingcard.dal.dao.WeChatInfoDao;
import cn.nanhuaren.visitingcard.dal.domain.Merchant;
import cn.nanhuaren.visitingcard.dal.domain.UserInfo;
import cn.nanhuaren.visitingcard.dal.domain.UserMerchantInfo;
import cn.nanhuaren.visitingcard.dal.domain.WeChatInfo;

@RestController
@RequestMapping("/user")
public class UserInfoController {

	private Logger logger = LoggerFactory.getLogger(UserInfoController.class);

	@Autowired
	private WeChatInfoDao weChatInfoDao;

	@Autowired
	private UserInfoDao userInfoDao;

	@Autowired
	private MerchantDao merchantDao;

	@ResponseBody
	@RequestMapping(value = "/get", method = { RequestMethod.POST, RequestMethod.GET })
	public ResultBody get(String openId, HttpServletRequest request, HttpServletResponse response) {
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
	@RequestMapping(value = "/detail", method = { RequestMethod.POST, RequestMethod.GET })
	public ResultBody detail(Long userId, HttpServletRequest request, HttpServletResponse response) {
		ResultBody resultBody = new ResultBody();
		UserInfo userInfo = userInfoDao.selectById(userId);
		if (userInfo != null) {
			resultBody.setData(userInfo);
		} else {
			resultBody.isError("获取用户信息失败");
		}
		return resultBody;
	}

	@ResponseBody
	@RequestMapping(value = "/count", method = { RequestMethod.POST, RequestMethod.GET })
	public ResultBody count(Long ownerId, HttpServletRequest request, HttpServletResponse response) {
		ResultBody resultBody = new ResultBody();
		Integer count = userInfoDao.countByOwnerId(ownerId);
		if (count != null) {
			resultBody.setData(count);
		} else {
			resultBody.setData(0);
		}
		return resultBody;
	}

	@ResponseBody
	@RequestMapping(value = "/list", method = { RequestMethod.POST, RequestMethod.GET })
	public ResultBody list(Long ownerId, HttpServletRequest request, HttpServletResponse response) {
		ResultBody resultBody = new ResultBody();
		List<UserInfo> userInfoList = userInfoDao.listByOwnerId(ownerId);
		if (userInfoList != null) {
			resultBody.setData(userInfoList);
		} else {
			resultBody.isError("获取用户列表失败");
		}
		return resultBody;
	}
	
	@ResponseBody
	@RequestMapping(value = "/merchantDetail", method = { RequestMethod.POST, RequestMethod.GET })
	public ResultBody merchantDetail(Long userId, HttpServletRequest request, HttpServletResponse response) {
		ResultBody resultBody = new ResultBody();
		UserMerchantInfo userMerchantInfo = userInfoDao.selectMerchantById(userId);
		if (userMerchantInfo != null) {
			resultBody.setData(userMerchantInfo);
		} else {
			resultBody.isError("获取用户信息失败");
		}
		return resultBody;
	}

	@ResponseBody
	@RequestMapping(value = "/merchantCount", method = { RequestMethod.POST, RequestMethod.GET })
	public ResultBody merchantCount(Long ownerId, HttpServletRequest request, HttpServletResponse response) {
		ResultBody resultBody = new ResultBody();
		Integer count = userInfoDao.countMerchantByOwnerId(ownerId);
		if (count != null) {
			resultBody.setData(count);
		} else {
			resultBody.setData(0);
		}
		return resultBody;
	}

	@ResponseBody
	@RequestMapping(value = "/merchantList", method = { RequestMethod.POST, RequestMethod.GET })
	public ResultBody merchantList(Long ownerId, HttpServletRequest request, HttpServletResponse response) {
		ResultBody resultBody = new ResultBody();
		List<UserMerchantInfo> userMerchantInfoList = userInfoDao.listMerchantByOwnerId(ownerId);
		if (userMerchantInfoList != null) {
			resultBody.setData(userMerchantInfoList);
		} else {
			resultBody.isError("获取用户列表失败");
		}
		return resultBody;
	}

	@ResponseBody
	@RequestMapping(value = "/add", method = { RequestMethod.POST, RequestMethod.GET })
	public ResultBody add(UserInfo userInfo, Merchant merchant,HttpServletRequest request, HttpServletResponse response) {
		ResultBody resultBody = new ResultBody();
		logger.info("request userInfo={}", userInfo);
		UserInfo queryUserInfo = new UserInfo();
		queryUserInfo = userInfoDao.selectByMobile(userInfo.getMobile());
		if (queryUserInfo == null) {
			queryUserInfo = new UserInfo();
			queryUserInfo.setName(userInfo.getName());
			queryUserInfo.setHeaderImg(userInfo.getHeaderImg());
			queryUserInfo.setMobile(userInfo.getMobile());
			queryUserInfo.setTel(userInfo.getTel());
			queryUserInfo.setFax(userInfo.getFax());
			queryUserInfo.setQq(userInfo.getQq());
			queryUserInfo.setWeixin(userInfo.getWeixin());
			queryUserInfo.setEmail(userInfo.getEmail());
			queryUserInfo.setProvince(userInfo.getProvince());
			queryUserInfo.setCity(userInfo.getCity());
			queryUserInfo.setArea(userInfo.getArea());
			queryUserInfo.setAddress(userInfo.getAddress());
			queryUserInfo.setDescription(userInfo.getDescription());
			queryUserInfo.setUserType("01");
			queryUserInfo.setOwnerId(userInfo.getOwnerId());
			queryUserInfo.setCreateTime(new Date());
			queryUserInfo = userInfoDao.insert(queryUserInfo);
			Merchant queryMerchant = merchantDao.selectByUserId(queryUserInfo.getId());
			if (queryMerchant == null) {
				queryMerchant = new Merchant();
				queryMerchant.setMerchantName(merchant.getMerchantName());
				queryMerchant.setMerchantLogo(merchant.getMerchantLogo());
				queryMerchant.setMerchantPosition(merchant.getMerchantPosition());
				queryMerchant.setMerchantType(merchant.getMerchantType());
				queryMerchant.setMerchantDescription(merchant.getMerchantDescription());
				queryMerchant.setMerchantPicture(merchant.getMerchantPicture());
				queryMerchant.setUserId(queryUserInfo.getId());
				queryMerchant.setCreateTime(new Date());
				merchantDao.insert(queryMerchant);
			} else {
				queryMerchant.setMerchantName(merchant.getMerchantName());
				queryMerchant.setMerchantLogo(merchant.getMerchantLogo());
				queryMerchant.setMerchantPosition(merchant.getMerchantPosition());
				queryMerchant.setMerchantType(merchant.getMerchantType());
				queryMerchant.setMerchantDescription(merchant.getMerchantDescription());
				queryMerchant.setMerchantPicture(merchant.getMerchantPicture());
				queryMerchant.setUpdateTime(new Date());
				merchantDao.updateById(queryMerchant);
			}
		} else {
			resultBody.isError("新增用户失败，手机号码已存在");
		}
		return resultBody;
	}

	@ResponseBody
	@RequestMapping(value = "/modify", method = { RequestMethod.POST, RequestMethod.GET })
	public ResultBody modify(UserInfo userInfo, Merchant merchant, HttpServletRequest request,
			HttpServletResponse response) {
		ResultBody resultBody = new ResultBody();
		logger.info("request userInfo={}", userInfo);
		UserInfo queryUserInfo = new UserInfo();
		queryUserInfo = userInfoDao.selectById(userInfo.getId());
		if (queryUserInfo != null) {
			queryUserInfo.setName(userInfo.getName());
			queryUserInfo.setHeaderImg(userInfo.getHeaderImg());
			queryUserInfo.setMobile(userInfo.getMobile());
			queryUserInfo.setTel(userInfo.getTel());
			queryUserInfo.setFax(userInfo.getFax());
			queryUserInfo.setQq(userInfo.getQq());
			queryUserInfo.setWeixin(userInfo.getWeixin());
			queryUserInfo.setEmail(userInfo.getEmail());
			queryUserInfo.setProvince(userInfo.getProvince());
			queryUserInfo.setCity(userInfo.getCity());
			queryUserInfo.setArea(userInfo.getArea());
			queryUserInfo.setAddress(userInfo.getAddress());
			queryUserInfo.setDescription(userInfo.getDescription());
			queryUserInfo.setUpdateTime(new Date());
			userInfoDao.updateById(queryUserInfo);
			Merchant queryMerchant = merchantDao.selectByUserId(userInfo.getId());
			if (queryMerchant == null) {
				queryMerchant = new Merchant();
				queryMerchant.setMerchantName(merchant.getMerchantName());
				queryMerchant.setMerchantLogo(merchant.getMerchantLogo());
				queryMerchant.setMerchantPosition(merchant.getMerchantPosition());
				queryMerchant.setMerchantType(merchant.getMerchantType());
				queryMerchant.setMerchantDescription(merchant.getMerchantDescription());
				queryMerchant.setMerchantPicture(merchant.getMerchantPicture());
				queryMerchant.setUserId(queryUserInfo.getId());
				queryMerchant.setCreateTime(new Date());
				merchantDao.insert(queryMerchant);
			} else {
				queryMerchant.setMerchantName(merchant.getMerchantName());
				queryMerchant.setMerchantLogo(merchant.getMerchantLogo());
				queryMerchant.setMerchantPosition(merchant.getMerchantPosition());
				queryMerchant.setMerchantType(merchant.getMerchantType());
				queryMerchant.setMerchantDescription(merchant.getMerchantDescription());
				queryMerchant.setMerchantPicture(merchant.getMerchantPicture());
				queryMerchant.setUpdateTime(new Date());
				merchantDao.updateById(queryMerchant);
			}

		} else {
			resultBody.isError("修改用户失败，用户不存在");
		}
		return resultBody;
	}

	@ResponseBody
	@RequestMapping(value = "/bind", method = { RequestMethod.POST, RequestMethod.GET })
	public ResultBody bind(UserInfo userInfo, HttpServletRequest request, HttpServletResponse response) {
		ResultBody resultBody = new ResultBody();
		logger.info("request userInfo={}", userInfo);
		WeChatInfo weChatInfo = weChatInfoDao.selectByOpenId(userInfo.getOpenId());
		UserInfo queryUserInfo = userInfoDao.selectById(userInfo.getId());
		if (queryUserInfo != null && weChatInfo != null) {
			if (StringUtils.isEmpty(queryUserInfo.getOpenId())) {
				queryUserInfo.setOpenId(userInfo.getOpenId());
				queryUserInfo.setUpdateTime(new Date());
				queryUserInfo.setUserType("01");
				userInfoDao.updateById(queryUserInfo);
			} else {
				resultBody.isError("绑定用户失败，不能重复绑定");
			}
		} else {
			resultBody.isError("绑定用户失败，信息不完整");
		}
		return resultBody;
	}

	@ResponseBody
	@RequestMapping(value = "/unBind", method = { RequestMethod.POST, RequestMethod.GET })
	public ResultBody unBind(UserInfo userInfo, HttpServletRequest request, HttpServletResponse response) {
		ResultBody resultBody = new ResultBody();
		logger.info("request userInfo={}", userInfo);
		WeChatInfo weChatInfo = weChatInfoDao.selectByOpenId(userInfo.getOpenId());
		UserInfo queryUserInfo = userInfoDao.selectById(userInfo.getId());
		if (queryUserInfo != null && weChatInfo != null) {
			if (!StringUtils.isEmpty(queryUserInfo.getOpenId())) {
				queryUserInfo.setOpenId("");
				queryUserInfo.setUpdateTime(new Date());
				userInfoDao.updateById(queryUserInfo);
			} else {
				resultBody.isError("解绑用户失败，未绑定过");
			}
		} else {
			resultBody.isError("解绑用户失败，信息不完整");
		}
		return resultBody;
	}
}
