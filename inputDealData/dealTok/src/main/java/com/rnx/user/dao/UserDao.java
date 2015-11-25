/*
 * com.rnx.user.dao.UserDao
 *
 * Created on 2012. 3. 28.
 *
 * Copyright (c) 2010 RionNex Co., Ltd. All Rights Reserved.
 */
package com.rnx.user.dao;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;
import org.springframework.stereotype.Repository;

import com.ibatis.sqlmap.client.SqlMapClient;

/**
 *
 * 클래스에 대한 설명을 여기에 쓴다.
 *
 * Create Date 2012. 3. 28.
 * @version	1.00 2012. 3. 28.
 * @since   1.00
 * @see
 * @author	Keun-su Lim(akswosn@rionnex.com)
 * Revision History
 * who			when        	what
 * Keun-su		2012. 3. 28.			최초.
 */
@Repository
public class UserDao extends SqlMapClientDaoSupport
{
	@Autowired
	public UserDao(SqlMapClient sqlMapClient){
		setSqlMapClient(sqlMapClient);
	}

	/**
	 *
	 * user 정보 검색 DAO
	 * @param value
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public Map<String, Object> getLoginUser(int value) throws Exception {
		return (Map<String, Object>)getSqlMapClientTemplate().queryForObject("user.selectLoginUser", value);
	}

	/**
	 * user 목록 조회 DAO
	 * @param value
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getUserList() throws Exception {
		return getSqlMapClientTemplate().queryForList("user.selectUserList");
	}

}
