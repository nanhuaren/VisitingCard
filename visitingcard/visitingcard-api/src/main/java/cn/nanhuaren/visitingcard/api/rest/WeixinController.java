package cn.nanhuaren.visitingcard.api.rest;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.github.sd4324530.fastweixin.util.JsApiUtil;

import cn.nanhuaren.visitingcard.api.config.WeixinConfig;
import cn.nanhuaren.visitingcard.util.WXUtil;

/**
 * 微信公众平台交互操作基类，提供几乎所有微信公众平台交互方式 基于springmvc框架，方便使用此框架的项目集成
 *
 */
@RestController
@RequestMapping("/weixin")
public class WeixinController extends WeixinConfig {

	/**
	 * 绑定微信服务器
	 *
	 * @param request
	 *            请求
	 * @return 响应内容
	 */
	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	protected final String bind(HttpServletRequest request) {
		if (isLegal(request)) {
			// 绑定微信服务器成功
			return request.getParameter("echostr");
		} else {
			// 绑定微信服务器失败
			return "";
		}
	}

	/**
	 * 微信消息交互处理
	 *
	 * @param request
	 *            http 请求对象
	 * @param response
	 *            http 响应对象
	 * @throws ServletException
	 *             异常
	 * @throws IOException
	 *             IO异常
	 */
	@RequestMapping(method = RequestMethod.POST)
	protected final void process(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		if (isLegal(request)) {
			String result = processRequest(request);
			// 设置正确的 content-type 以防止中文乱码
			response.setContentType("text/xml;charset=UTF-8");
			PrintWriter writer = response.getWriter();
			writer.write(result);
			writer.close();
		}
	}

	/**
	 * JsApi调用微信签名
	 *
	 * @param request
	 *            请求
	 * @return 响应内容
	 */
	@RequestMapping(value = "/sign", method = RequestMethod.GET)
	@ResponseBody
	protected final Map<String, Object> sign(HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			response.addHeader("Access-Control-Allow-Origin", "*");
			String appId = getAppId();
			String jsApiTicket = getJsApiTicket();
			long timestame = WXUtil.getTimeStamp();
			String nonceStr = WXUtil.getNonceStr();
			String url = request.getParameter("url");
			String signature = JsApiUtil.sign(jsApiTicket, nonceStr, timestame, url);
			map.put("appId", appId);
			map.put("timestamp", timestame);
			map.put("nonceStr", nonceStr);
			map.put("url", url);
			map.put("signature", signature);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return map;
	}
}