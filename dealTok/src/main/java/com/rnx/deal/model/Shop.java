package com.rnx.deal.model;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

public class Shop {
	String wemakeprice;
	String coupang;
	String ticketmonster;
	String stylecoupons;
	String groupon;
	String ilgongil;
	String daylect;
	String nowshop;
	String chanuri;
	String tboom;
	int sort;
	int startNum;
	int endNum;
	
	public String getWemakeprice() {
		return wemakeprice;
	}
	public void setWemakeprice(String wemakeprice) {
		this.wemakeprice = wemakeprice;
	}
	public String getCoupang() {
		return coupang;
	}
	public void setCoupang(String coupang) {
		this.coupang = coupang;
	}
	public String getTicketmonster() {
		return ticketmonster;
	}
	public void setTicketmonster(String ticketmonster) {
		this.ticketmonster = ticketmonster;
	}
	public String getStylecoupons() {
		return stylecoupons;
	}
	public void setStylecoupons(String stylecoupons) {
		this.stylecoupons = stylecoupons;
	}
	public String getGroupon() {
		return groupon;
	}
	public void setGroupon(String groupon) {
		this.groupon = groupon;
	}
	public String getIlgongil() {
		return ilgongil;
	}
	public void setIlgongil(String ilgongil) {
		this.ilgongil = ilgongil;
	}
	public String getDaylect() {
		return daylect;
	}
	public void setDaylect(String daylect) {
		this.daylect = daylect;
	}
	public String getNowshop() {
		return nowshop;
	}
	public void setNowshop(String nowshop) {
		this.nowshop = nowshop;
	}
	public String getChanuri() {
		return chanuri;
	}
	public void setChanuri(String chanuri) {
		this.chanuri = chanuri;
	}
	public String getTboom() {
		return tboom;
	}
	public void setTboom(String tboom) {
		this.tboom = tboom;
	}
	public int getSort() {
		return sort;
	}
	public void setSort(int sort) {
		this.sort = sort;
	}
	public int getStartNum() {
		return startNum;
	}
	public void setStartNum(int startNum) {
		this.startNum = startNum;
	}
	public int getEndNum() {
		return endNum;
	}
	public void setEndNum(int endNum) {
		this.endNum = endNum;
	}
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
	}
}
