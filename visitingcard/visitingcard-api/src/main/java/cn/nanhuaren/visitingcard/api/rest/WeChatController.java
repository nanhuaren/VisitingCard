
package cn.nanhuaren.visitingcard.api.rest;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import cn.nanhuaren.visitingcard.api.bean.ResultBody;
import cn.nanhuaren.visitingcard.dal.dao.WeChatInfoDao;
import cn.nanhuaren.visitingcard.dal.domain.WeChatInfo;
import cn.nanhuaren.visitingcard.util.WeChatUtil;

@RestController
@RequestMapping("/wechat")
public class WeChatController {

	private Logger logger = LoggerFactory.getLogger(WeChatController.class);

	@Value("${wechat.appid:}")
	private String appId;

	@Value("${wechat.secret:}")
	private String secret;

	@Autowired
	private WeChatInfoDao weChatInfoDao;

	@ResponseBody
	@RequestMapping(value = "/login", method = { RequestMethod.POST, RequestMethod.GET })
	public ResultBody login(String code, HttpServletRequest request, HttpServletResponse response) {
		ResultBody resultBody = new ResultBody();
		logger.info("request code={}", code);
		String okResult = WeChatUtil.login(appId, secret, code);
		logger.info("response result={}", okResult);

		JSONObject result = JSON.parseObject(okResult);
		Integer errcode = result.getInteger("errcode");
		if (errcode == null) {
			String openid = result.getString("openid");
			String unionid = result.getString("unionid");
			WeChatInfo weChatInfo = new WeChatInfo();
			weChatInfo.setOpenId(openid);
			weChatInfo = weChatInfoDao.selectByOpenId(openid);
			if (weChatInfo == null) {
				weChatInfo = new WeChatInfo();
				weChatInfo.setOpenId(openid);
				weChatInfo.setUnionId(unionid);
				weChatInfo.setCreateTime(new Date());
				weChatInfoDao.insert(weChatInfo);
			}
			resultBody.setData(weChatInfo);
		} else {
			resultBody.isError("获取openid失败");
		}
		return resultBody;
	}

	@ResponseBody
	@RequestMapping(value = "/update", method = { RequestMethod.POST, RequestMethod.GET })
	public ResultBody update(WeChatInfo weChatInfo, HttpServletRequest request, HttpServletResponse response) {
		ResultBody resultBody = new ResultBody();
		logger.info("request weChatInfo={}", weChatInfo);

		WeChatInfo queryWeChatInfo = new WeChatInfo();
		queryWeChatInfo = weChatInfoDao.selectByOpenId(weChatInfo.getOpenId());
		if (queryWeChatInfo != null) {
			queryWeChatInfo.setNickName(weChatInfo.getNickName());
			queryWeChatInfo.setAvatarUrl(weChatInfo.getAvatarUrl());
			queryWeChatInfo.setGender(weChatInfo.getGender());
			queryWeChatInfo.setCity(weChatInfo.getCity());
			queryWeChatInfo.setProvince(weChatInfo.getProvince());
			queryWeChatInfo.setCountry(weChatInfo.getCountry());
			queryWeChatInfo.setLanguage(weChatInfo.getLanguage());
			queryWeChatInfo.setUpdateTime(new Date());
			weChatInfoDao.updateById(queryWeChatInfo);
		} else {
			resultBody.isError("同步微信用户信息失败");
		}
		return resultBody;
	}
}
