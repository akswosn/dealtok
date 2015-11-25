package com.rnx.deal.model;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

import com.rnx.common.AbstractModel;

public class Deal extends AbstractModel {
	
	private int did;
	private String dealImg;
	private String title;
	private String content;
	private String regDate;
	private String link;
	private String time_start;
	private String time_end;
	private String price_original;
	private String price_now;
	private String sale_percent;
	private String sell_count;
	private String count_min;
	private String count_max;
	private String area;
	private String category;
	private String shop;
	private String tel;
	private String addr;
	private String latitude;
	private String longitude;
	private String desc_text;
	private String seller;
	
	public int getDid() {
		return did;
	}
	public void setDid(int did) {
		this.did = did;
	}
	public String getDealImg() {
		return dealImg;
	}
	public void setDealImg(String dealImg) {
		this.dealImg = dealImg;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getRegDate() {
		return regDate;
	}
	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}
	public String getLink() {
		return link;
	}
	public void setLink(String link) {
		this.link = link;
	}
	public String getTime_start() {
		return time_start;
	}
	public void setTime_start(String time_start) {
		this.time_start = time_start;
	}
	public String getTime_end() {
		return time_end;
	}
	public void setTime_end(String time_end) {
		this.time_end = time_end;
	}
	public String getPrice_original() {
		return price_original;
	}
	public void setPrice_original(int price_original) {
		this.price_original = String.format("%,d", price_original);
	}
	public String getPrice_now() {
		return price_now;
	}
	public void setPrice_now(int price_now) {
		this.price_now = String.format("%,d", price_now);
	}
	public String getSale_percent() {
		return sale_percent;
	}
	public void setSale_percent(String sale_percent) {
		this.sale_percent = sale_percent;
	}
	public String getSell_count() {
		return sell_count;
	}
	public void setSell_count(String sell_count) {
		this.sell_count = sell_count;
	}
	public String getCount_min() {
		return count_min;
	}
	public void setCount_min(String count_min) {
		this.count_min = count_min;
	}
	public String getCount_max() {
		return count_max;
	}
	public void setCount_max(String count_max) {
		this.count_max = count_max;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getShop() {
		return shop;
	}
	public void setShop(String shop) {
		this.shop = shop;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getAddr() {
		return addr;
	}
	public void setAddr(String addr) {
		this.addr = addr;
	}
	public String getLatitude() {
		return latitude;
	}
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	public String getLongitude() {
		return longitude;
	}
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}
	public String getDesc_text() {
		return desc_text;
	}
	public void setDesc_text(String desc_text) {
		this.desc_text = desc_text;
	}
	public String getSeller() {
		return seller;
	}
	public void setSeller(String seller) {
		this.seller = seller;
	}
	
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
	}
}
