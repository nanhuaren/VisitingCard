
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
import cn.nanhuaren.visitingcard.dal.dao.CatalogDao;
import cn.nanhuaren.visitingcard.dal.domain.Catalog;

@RestController
@RequestMapping("/catalog")
public class CatalogController {

	private Logger logger = LoggerFactory.getLogger(CatalogController.class);

	@Autowired
	private CatalogDao catalogDao;

	@ResponseBody
	@RequestMapping(value = "list", method = { RequestMethod.POST, RequestMethod.GET })
	public ResultBody list(Long userId, HttpServletRequest request, HttpServletResponse response) {
		ResultBody resultBody = new ResultBody();
		List<Catalog> catalogList = catalogDao.listByUserId(userId);
		if (catalogList != null) {
			resultBody.setData(catalogList);
		} else {
			resultBody.isError("获取分类列表失败");
		}
		return resultBody;
	}
	
	@ResponseBody
	@RequestMapping(value = "get", method = { RequestMethod.POST, RequestMethod.GET })
	public ResultBody get(Long userId, Long catalogId, HttpServletRequest request, HttpServletResponse response) {
		ResultBody resultBody = new ResultBody();
		Catalog catalog = catalogDao.selectById(catalogId);
		if (catalog != null) {
			resultBody.setData(catalog);
		} else {
			resultBody.isError("获取分类信息失败");
		}
		return resultBody;
	}

	@ResponseBody
	@RequestMapping(value = "/add", method = { RequestMethod.POST, RequestMethod.GET })
	public ResultBody add(Catalog catalog, HttpServletRequest request, HttpServletResponse response) {
		ResultBody resultBody = new ResultBody();
		logger.info("request catalog={}", catalog);
		Catalog queryCatalog = new Catalog();
		queryCatalog = new Catalog();
		queryCatalog.setCatalogName(catalog.getCatalogName());
		queryCatalog.setCatalogPicture(catalog.getCatalogPicture());
		queryCatalog.setCatalogDescription(catalog.getCatalogDescription());
		queryCatalog.setCatalogSortNum(catalog.getCatalogSortNum());
		queryCatalog.setUserId(catalog.getUserId());
		queryCatalog.setCreateTime(new Date());
		catalogDao.insert(queryCatalog);
		return resultBody;
	}

	@ResponseBody
	@RequestMapping(value = "/modify", method = { RequestMethod.POST, RequestMethod.GET })
	public ResultBody modify(Catalog catalog, HttpServletRequest request, HttpServletResponse response) {
		ResultBody resultBody = new ResultBody();
		logger.info("request catalog={}", catalog);
		Catalog queryCatalog = new Catalog();
		queryCatalog = catalogDao.selectById(catalog.getId());
		if (queryCatalog != null) {
			queryCatalog.setCatalogName(catalog.getCatalogName());
			queryCatalog.setCatalogPicture(catalog.getCatalogPicture());
			queryCatalog.setCatalogDescription(catalog.getCatalogDescription());
			queryCatalog.setCatalogSortNum(catalog.getCatalogSortNum());
			queryCatalog.setUpdateTime(new Date());
			catalogDao.updateById(queryCatalog);
		} else {
			resultBody.isError("修改分类失败，分类不存在");
		}
		return resultBody;
	}

	@ResponseBody
	@RequestMapping(value = "/delete", method = { RequestMethod.POST, RequestMethod.GET })
	public ResultBody delete(Catalog catalog, HttpServletRequest request, HttpServletResponse response) {
		ResultBody resultBody = new ResultBody();
		logger.info("request catalog={}", catalog);
		Catalog queryCatalog = new Catalog();
		queryCatalog = catalogDao.selectById(catalog.getId());
		if (queryCatalog != null) {
			catalogDao.deleteById(queryCatalog);
		} else {
			resultBody.isError("删除分类失败，分类不存在");
		}
		return resultBody;
	}
}
