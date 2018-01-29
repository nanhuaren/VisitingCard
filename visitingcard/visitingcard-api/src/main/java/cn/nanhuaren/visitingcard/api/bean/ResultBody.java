package cn.nanhuaren.visitingcard.api.bean;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

public class ResultBody {

	private Integer code;

	@JsonInclude(Include.NON_NULL)
	private String message;

	@JsonInclude(Include.NON_NULL)
	private Object data;

	@JsonInclude(Include.NON_NULL)
	private Integer current;

	@JsonInclude(Include.NON_NULL)
	private Integer pageSize;

	@JsonInclude(Include.NON_NULL)
	private Long totalPage;

	@JsonInclude(Include.NON_NULL)
	private Long totalRecord;

	public ResultBody() {
		super();
		this.code = 1;
		this.message = "成功";
	}

	public ResultBody(Integer code, String message) {
		super();
		this.code = code;
		this.message = message;
	}

	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public Integer getCurrent() {
		return current;
	}

	public void setCurrent(Integer current) {
		this.current = current;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Long getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(Long totalPage) {
		this.totalPage = totalPage;
	}

	public Long getTotalRecord() {
		return totalRecord;
	}

	public void setTotalRecord(Long totalRecord) {
		this.totalRecord = totalRecord;
	}

	public void isError(String message) {
		this.code = 0;
		this.message = message;
	}
}
