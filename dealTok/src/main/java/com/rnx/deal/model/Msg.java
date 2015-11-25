package com.rnx.deal.model;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

public class Msg {
	/**
	 * @uml.property  name="user_seq"
	 */
	private int user_seq;
	/**
	 * @uml.property  name="friend_seq"
	 */
	private int friend_seq;
	/**
	 * @uml.property  name="did"
	 */
	private int did;
	/**
	 * @uml.property  name="tgid"
	 */
	private int tgid;
	/**
	 * @uml.property  name="message"
	 */
	private String message;
	
	/**
	 * @return
	 * @uml.property  name="tgid"
	 */
	public int getTgid() {
		return tgid;
	}
	/**
	 * @param tgid
	 * @uml.property  name="tgid"
	 */
	public void setTgid(int tgid) {
		this.tgid = tgid;
	}
	/**
	 * @return
	 * @uml.property  name="user_seq"
	 */
	public int getUser_seq() {
		return user_seq;
	}
	/**
	 * @param user_seq
	 * @uml.property  name="user_seq"
	 */
	public void setUser_seq(int user_seq) {
		this.user_seq = user_seq;
	}
	/**
	 * @return
	 * @uml.property  name="friend_seq"
	 */
	public int getFriend_seq() {
		return friend_seq;
	}
	/**
	 * @param friend_seq
	 * @uml.property  name="friend_seq"
	 */
	public void setFriend_seq(int friend_seq) {
		this.friend_seq = friend_seq;
	}
	/**
	 * @return
	 * @uml.property  name="did"
	 */
	public int getDid() {
		return did;
	}
	/**
	 * @param did
	 * @uml.property  name="did"
	 */
	public void setDid(int did) {
		this.did = did;
	}
	/**
	 * @return
	 * @uml.property  name="message"
	 */
	public String getMessage() {
		return message;
	}
	/**
	 * @param message
	 * @uml.property  name="message"
	 */
	public void setMessage(String message) {
		this.message = message;
	}
	
	
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
	}
}
