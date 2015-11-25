package com.rnx.deal.model;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

public class PushDeal {
	int user_seq;
	String first_kind;
	String second_kind;
	
	public int getUser_seq() {
		return user_seq;
	}
	public void setUser_seq(int user_seq) {
		this.user_seq = user_seq;
	}
	public String getFirst_kind() {
		return first_kind;
	}
	public void setFirst_kind(String first_kind) {
		this.first_kind = first_kind;
	}
	public String getSecond_kind() {
		return second_kind;
	}
	public void setSecond_kind(String second_kind) {
		this.second_kind = second_kind;
	}	
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
	}
}