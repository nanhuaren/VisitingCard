package cn.nanhuaren.visitingcard.api.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.github.sd4324530.fastweixin.api.config.ApiConfig;
import com.github.sd4324530.fastweixin.servlet.WeixinSupport;

@Service
public class WeixinConfig extends WeixinSupport {

	@Value("${weixin.token:}")
	private String token;

	@Value("${weixin.appid:}")
	private String appId;

	@Value("${weixin.appsecret:}")
	private String appSecret;

	@Override
	protected String getToken() {
		return token;
	}

	@Override
	protected String getAppId() {
		return appId;
	}

	public ApiConfig getApiConfig() {
		String appId = getAppId();
		String appSecret = getAppSecret();
		ApiConfig apiConfig = new ApiConfig(appId, appSecret, true);
		return apiConfig;
	}

	public String getJsApiTicket() {
		ApiConfig apiConfig = getApiConfig();
		return apiConfig.getJsApiTicket();
	}

	private String getAppSecret() {
		return appSecret;
	}

	@Override
	protected String getAESKey() {
		return null;
	}
}