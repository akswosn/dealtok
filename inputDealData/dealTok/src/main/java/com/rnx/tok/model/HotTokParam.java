/*
 * com.rnx.tok.vo.HotTokVo
 *
 * Created on 2012. 3. 27.
 *
 * Copyright (c) 2010 RionNex Co., Ltd. All Rights Reserved.
 */
package com.rnx.tok.model;

import org.springframework.core.style.ToStringCreator;

import com.rnx.common.AbstractModel;

/**
 *
 * 클래스에 대한 설명을 여기에 쓴다.
 *
 * Create Date 2012. 3. 27.
 * @version	1.00 2012. 3. 27.
 * @since   1.00
 * @see
 * @author	Keun-su Lim(akswosn@rionnex.com)
 * Revision History
 * who			when        	what
 * Keun-su		2012. 3. 27.			최초.
 */

@SuppressWarnings("unused")
public class HotTokParam extends AbstractModel
{
	//insert
	/**
	 * @uml.property  name="m_userSeq"
	 */
	private int m_userSeq;
	/**
	 * @uml.property  name="m_dealId"
	 */
	private int m_dealId;
	/**
	 * @uml.property  name="m_content"
	 */
	private String m_content;
	/**
	 * @return the m_userSeq
	 */
	public int getUserSeq() {
		return m_userSeq;
	}
	public void setUserSeq(int userSeq) {
		this.m_userSeq = userSeq;
	}
	public int getDealId() {
		return m_dealId;
	}
	public void setDealId(int dealId) {
		this.m_dealId = dealId;
	}
	public String getContent() {
		return m_content;
	}
	public void setContent(String content) {
		this.m_content = content;
	}
}
