package com.rnx.tok.model;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

import com.rnx.common.AbstractModel;

public class TokGroup extends AbstractModel{
	
	/**
	 * @uml.property  name="tokGroupId"
	 */
	private String tokGroupId;
	/**
	 * @uml.property  name="createUserSeq"
	 */
	private String createUserSeq;
	/**
	 * @uml.property  name="dealId"
	 */
	private String dealId;
	/**
	 * @uml.property  name="summary"
	 */
	private String summary;
	/**
	 * @uml.property  name="createTime"
	 */
	private String createTime;
	/**
	 * @uml.property  name="profileImg"
	 */
	private String profileImg;
	/**
	 * @uml.property  name="nickName"
	 */
	private String nickName;
	/**
	 * @uml.property  name="modifiedTime"
	 */
	private String modifiedTime;
	/**
	 * @uml.property  name="dealImg"
	 */
	private String dealImg;
	/**
	 * @uml.property  name="dealSummary"
	 */
	private String dealSummary;
	
	/*Ãß°¡*/
	private String title;
	private int price_now;
	private int price_original;
	private int sale_percent;
	private String addr;
	
	/**
	 * @return
	 * @uml.property  name="tokGroupId"
	 */
	public String getTokGroupId() {
		return tokGroupId;
	}
	/**
	 * @param tokGroupId
	 * @uml.property  name="tokGroupId"
	 */
	public void setTokGroupId(String tokGroupId) {
		this.tokGroupId = tokGroupId;
	}
	/**
	 * @return
	 * @uml.property  name="createUserSeq"
	 */
	public String getCreateUserSeq() {
		return createUserSeq;
	}
	/**
	 * @param createUserSeq
	 * @uml.property  name="createUserSeq"
	 */
	public void setCreateUserSeq(String createUserSeq) {
		this.createUserSeq = createUserSeq;
	}
	/**
	 * @return
	 * @uml.property  name="dealId"
	 */
	public String getDealId() {
		return dealId;
	}
	/**
	 * @param dealId
	 * @uml.property  name="dealId"
	 */
	public void setDealId(String dealId) {
		this.dealId = dealId;
	}
	/**
	 * @return
	 * @uml.property  name="summary"
	 */
	public String getSummary() {
		return summary;
	}
	/**
	 * @param summary
	 * @uml.property  name="summary"
	 */
	public void setSummary(String summary) {
		this.summary = summary;
	}
	/**
	 * @return
	 * @uml.property  name="createTime"
	 */
	public String getCreateTime() {
		return createTime;
	}
	/**
	 * @param createTime
	 * @uml.property  name="createTime"
	 */
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	/**
	 * @return
	 * @uml.property  name="profileImg"
	 */
	public String getProfileImg() {
		return profileImg;
	}
	/**
	 * @param profileImg
	 * @uml.property  name="profileImg"
	 */
	public void setProfileImg(String profileImg) {
		this.profileImg = profileImg;
	}
	/**
	 * @return
	 * @uml.property  name="nickName"
	 */
	public String getNickName() {
		return nickName;
	}
	/**
	 * @param nickName
	 * @uml.property  name="nickName"
	 */
	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
	/**
	 * @return
	 * @uml.property  name="modifiedTime"
	 */
	public String getModifiedTime() {
		return modifiedTime;
	}
	/**
	 * @param modifiedTime
	 * @uml.property  name="modifiedTime"
	 */
	public void setModifiedTime(String modifiedTime) {
		this.modifiedTime = modifiedTime;
	}
	/**
	 * @return
	 * @uml.property  name="dealImg"
	 */
	public String getDealImg() {
		return dealImg;
	}
	/**
	 * @param dealImg
	 * @uml.property  name="dealImg"
	 */
	public void setDealImg(String dealImg) {
		this.dealImg = dealImg;
	}
	/**
	 * @return
	 * @uml.property  name="dealSummary"
	 */
	public String getDealSummary() {
		return dealSummary;
	}
	/**
	 * @param dealSummary
	 * @uml.property  name="dealSummary"
	 */
	public void setDealSummary(String dealSummary) {
		this.dealSummary = dealSummary;
	}
	
	/**
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}
	/**
	 * @param title the title to set
	 */
	public void setTitle(String title) {
		this.title = title;
	}
	/**
	 * @return the price_now
	 */
	public int getPrice_now() {
		return price_now;
	}
	/**
	 * @param price_now the price_now to set
	 */
	public void setPrice_now(int price_now) {
		this.price_now = price_now;
	}
	/**
	 * @return the price_original
	 */
	public int getPrice_original() {
		return price_original;
	}
	/**
	 * @param price_original the price_original to set
	 */
	public void setPrice_original(int price_original) {
		this.price_original = price_original;
	}
	/**
	 * @return the sale_percent
	 */
	public int getSale_percent() {
		return sale_percent;
	}
	/**
	 * @param sale_percent the sale_percent to set
	 */
	public void setSale_percent(int sale_percent) {
		this.sale_percent = sale_percent;
	}
	/**
	 * @return the addr
	 */
	public String getAddr() {
		return addr;
	}
	/**
	 * @param addr the addr to set
	 */
	public void setAddr(String addr) {
		this.addr = addr;
	}
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
	}
}
