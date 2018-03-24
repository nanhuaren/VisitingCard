package cn.nanhuaren.visitingcard.dal.domain;

public class UserMerchantInfo extends UserInfo {

	private static final long serialVersionUID = 1L;

	private Long merchantId;

	private String merchantName;

	private String merchantLogo;

	private String merchantPosition;

	private String merchantType;

	private String merchantDescription;

	private String merchantPicture;

	private String merchantCase;

	public Long getMerchantId() {
		return merchantId;
	}

	public String getMerchantName() {
		return merchantName;
	}

	public String getMerchantLogo() {
		return merchantLogo;
	}

	public String getMerchantPosition() {
		return merchantPosition;
	}

	public String getMerchantType() {
		return merchantType;
	}

	public String getMerchantDescription() {
		return merchantDescription;
	}

	public String getMerchantPicture() {
		return merchantPicture;
	}

	public String getMerchantCase() {
		return merchantCase;
	}

}
