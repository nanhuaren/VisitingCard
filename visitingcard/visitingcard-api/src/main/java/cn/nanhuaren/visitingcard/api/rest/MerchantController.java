
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
import cn.nanhuaren.visitingcard.dal.dao.MerchantDao;
import cn.nanhuaren.visitingcard.dal.domain.Merchant;

@RestController
@RequestMapping("/merchant")
public class MerchantController {

	private Logger logger = LoggerFactory.getLogger(MerchantController.class);

	@Autowired
	private MerchantDao merchantDao;

	@ResponseBody
	@RequestMapping(value = "/{userId}", method = { RequestMethod.POST, RequestMethod.GET })
	public ResultBody get(@PathVariable Long userId, HttpServletRequest request, HttpServletResponse response) {
		ResultBody resultBody = new ResultBody();
		Merchant merchant = merchantDao.selectByUserId(userId);
		if (merchant != null) {
			resultBody.setData(merchant);
		} else {
			resultBody.isError("获取商户信息失败");
		}
		return resultBody;
	}

	@ResponseBody
	@RequestMapping(value = "/add", method = { RequestMethod.POST, RequestMethod.GET })
	public ResultBody add(Merchant merchant, HttpServletRequest request, HttpServletResponse response) {
		ResultBody resultBody = new ResultBody();
		logger.info("request merchant={}", merchant);
		Merchant queryMerchant = new Merchant();
		queryMerchant = merchantDao.selectByUserId(merchant.getUserId());
		if (queryMerchant == null) {
			queryMerchant = new Merchant();
			queryMerchant.setName(merchant.getName());
			queryMerchant.setType(merchant.getType());
			queryMerchant.setLogo(merchant.getLogo());
			queryMerchant.setDescription(merchant.getDescription());
			queryMerchant.setDetail(merchant.getDetail());
			queryMerchant.setProvince(merchant.getProvince());
			queryMerchant.setCity(merchant.getCity());
			queryMerchant.setArea(merchant.getArea());
			queryMerchant.setAddress(merchant.getAddress());
			queryMerchant.setUserId(merchant.getUserId());
			queryMerchant.setCreateTime(new Date());
			merchantDao.insert(queryMerchant);
		} else {
			queryMerchant.setName(merchant.getName());
			queryMerchant.setType(merchant.getType());
			queryMerchant.setLogo(merchant.getLogo());
			queryMerchant.setDescription(merchant.getDescription());
			queryMerchant.setDetail(merchant.getDetail());
			queryMerchant.setProvince(merchant.getProvince());
			queryMerchant.setCity(merchant.getCity());
			queryMerchant.setArea(merchant.getArea());
			queryMerchant.setAddress(merchant.getAddress());
			queryMerchant.setUserId(merchant.getUserId());
			queryMerchant.setUpdateTime(new Date());
			merchantDao.updateById(queryMerchant);
		}
		return resultBody;
	}
}
