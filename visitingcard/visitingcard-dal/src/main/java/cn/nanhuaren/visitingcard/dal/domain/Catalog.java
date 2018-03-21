package cn.nanhuaren.visitingcard.dal.domain;

import java.io.Serializable;
import java.util.Date;

public class Catalog implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;

	private String catalogName;

	private String catalogPicture;

	private String catalogDescription;

	private Long catalogSortNum;

	private Long userId;

	private Date createTime;

	private Date updateTime;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCatalogName() {
		return catalogName;
	}

	public void setCatalogName(String catalogName) {
		this.catalogName = catalogName;
	}

	public String getCatalogPicture() {
		return catalogPicture;
	}

	public void setCatalogPicture(String catalogPicture) {
		this.catalogPicture = catalogPicture;
	}

	public String getCatalogDescription() {
		return catalogDescription;
	}

	public void setCatalogDescription(String catalogDescription) {
		this.catalogDescription = catalogDescription;
	}

	public Long getCatalogSortNum() {
		return catalogSortNum;
	}

	public void setCatalogSortNum(Long catalogSortNum) {
		this.catalogSortNum = catalogSortNum;
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
