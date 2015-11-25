/*
 * test.rnx.dao.TestDao
 *
 * Created on 2012. 3. 23.
 * 
 * Copyright (c) 2010 RionNex Co., Ltd. All Rights Reserved.
 */
package com.rnx.dao.test;

import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 * 
 * �대��ㅼ� ��� �ㅻ����ш린���대�.
 * 
 * Create Date 2012. 3. 23.
 * @version	1.00 2012. 3. 23.
 * @since   1.00
 * @see
 * @author	keun su(akswosn@gmail.com)
 * Revision History
 * who			when        	what
 * akswosn		2012. 3. 23.			理��.
 */

@Repository("TestDao")
public class TestDao
{
	/**
	 * @uml.property  name="jdbcTemplate"
	 * @uml.associationEnd  
	 */
	private JdbcTemplate jdbcTemplate;

	@Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }
	
	
	//test
	public List<Map<String, Object>> getUserBySeq(int num) throws Exception {
		String sql = "\n";
		sql += "select user_seq, uid, phone, age, gender, address, nickname"
				+ "\n from user_info"
				+ "\n where user_seq = " + num;
		System.out.println(sql);
		return jdbcTemplate.queryForList(sql);
	}
	public static void main(String[]args){
		float a = 255, b = 80, c = 100;
		int alpha  =(int)((int)a * (int)(b/c));
		
		System.out.println();
	}
}
