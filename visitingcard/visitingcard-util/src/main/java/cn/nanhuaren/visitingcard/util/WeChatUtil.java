
package cn.nanhuaren.visitingcard.util;

public class WeChatUtil {

	public static String login(String appId, String secret, String code) {
		String grant_type = "authorization_code";

		StringBuffer sb = new StringBuffer("https://api.weixin.qq.com/sns/jscode2session?");
		sb.append("appid=").append(appId);
		sb.append("&secret=").append(secret);
		sb.append("&js_code=").append(code);
		sb.append("&grant_type=").append(grant_type);

		String okResult = OKHttpUtil.httpGet(sb.toString());
		return okResult;
	}

}
