package cn.nanhuaren.visitingcard.dal.domain;

import java.io.Serializable;
import java.util.Date;

public class Merchant implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;

	private String merchantName;

	private String merchantLogo;

	private String merchantPosition;

	private String merchantType;

	private String merchantDescription;

	private String merchantPicture;

	private Long userId;

	private Date createTime;

	private Date updateTime;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMerchantName() {
		return merchantName;
	}

	public void setMerchantName(String merchantName) {
		this.merchantName = merchantName;
	}

	public String getMerchantLogo() {
		return merchantLogo;
	}

	public void setMerchantLogo(String merchantLogo) {
		this.merchantLogo = merchantLogo;
	}

	public String getMerchantPosition() {
		return merchantPosition;
	}

	public void setMerchantPosition(String merchantPosition) {
		this.merchantPosition = merchantPosition;
	}

	public String getMerchantType() {
		return merchantType;
	}

	public void setMerchantType(String merchantType) {
		this.merchantType = merchantType;
	}

	public String getMerchantDescription() {
		return merchantDescription;
	}

	public void setMerchantDescription(String merchantDescription) {
		this.merchantDescription = merchantDescription;
	}

	public String getMerchantPicture() {
		return merchantPicture;
	}

	public void setMerchantPicture(String merchantPicture) {
		this.merchantPicture = merchantPicture;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

}
