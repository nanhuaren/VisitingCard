
package cn.nanhuaren.visitingcard.api.rest;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import cn.nanhuaren.visitingcard.api.bean.ResultBody;
import cn.nanhuaren.visitingcard.dal.dao.CollectUserDao;
import cn.nanhuaren.visitingcard.dal.domain.CollectUser;

@RestController
@RequestMapping("/collect")
public class CollectUserController {

	private Logger logger = LoggerFactory.getLogger(CollectUserController.class);

	@Autowired
	private CollectUserDao collectUserDao;

	@ResponseBody
	@RequestMapping(value = "get", method = { RequestMethod.POST, RequestMethod.GET })
	public ResultBody get(Long id, HttpServletRequest request, HttpServletResponse response) {
		ResultBody resultBody = new ResultBody();
		CollectUser collectUser = collectUserDao.selectById(id);
		if (collectUser != null) {
			resultBody.setData(collectUser);
		} else {
			resultBody.isError("获取搜集信息失败");
		}
		return resultBody;
	}

	@ResponseBody
	@RequestMapping(value = "list", method = { RequestMethod.POST, RequestMethod.GET })
	public ResultBody list(HttpServletRequest request, HttpServletResponse response) {
		ResultBody resultBody = new ResultBody();
		List<CollectUser> collectUserList = collectUserDao.listAll();
		resultBody.setData(collectUserList);
		return resultBody;
	}

	@ResponseBody
	@RequestMapping(value = "/add", method = { RequestMethod.POST, RequestMethod.GET })
	public ResultBody add(CollectUser collectUser, HttpServletRequest request, HttpServletResponse response) {
		ResultBody resultBody = new ResultBody();
		logger.info("request collectUser={}", collectUser);
		CollectUser queryCollectUser = new CollectUser();
		queryCollectUser = new CollectUser();
		queryCollectUser.setName(collectUser.getName());
		queryCollectUser.setMobile(collectUser.getMobile());
		queryCollectUser.setAddress(collectUser.getAddress());
		queryCollectUser.setCount(collectUser.getCount());
		queryCollectUser.setDescription(collectUser.getDescription());
		queryCollectUser.setPictures(collectUser.getPictures());
		queryCollectUser.setStatus(collectUser.getStatus());
		queryCollectUser.setCreateTime(new Date());
		collectUserDao.insert(queryCollectUser);
		return resultBody;
	}

	@ResponseBody
	@RequestMapping(value = "/modify", method = { RequestMethod.POST, RequestMethod.GET })
	public ResultBody modify(CollectUser collectUser, HttpServletRequest request, HttpServletResponse response) {
		ResultBody resultBody = new ResultBody();
		logger.info("request collectUser={}", collectUser);
		CollectUser queryCollectUser = new CollectUser();
		queryCollectUser = collectUserDao.selectById(collectUser.getId());
		if (queryCollectUser != null) {
			queryCollectUser.setName(collectUser.getName());
			queryCollectUser.setMobile(collectUser.getMobile());
			queryCollectUser.setAddress(collectUser.getAddress());
			queryCollectUser.setCount(collectUser.getCount());
			queryCollectUser.setDescription(collectUser.getDescription());
			queryCollectUser.setPictures(collectUser.getPictures());
			queryCollectUser.setStatus(collectUser.getStatus());
			queryCollectUser.setUpdateTime(new Date());
			collectUserDao.updateById(queryCollectUser);
		} else {
			resultBody.isError("修改搜集失败，搜集不存在");
		}
		return resultBody;
	}
}
