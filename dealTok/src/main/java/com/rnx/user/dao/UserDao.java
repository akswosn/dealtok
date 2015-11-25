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
import com.ibatis.sqlmap.engine.impl.SqlMapClientImpl;
import com.ibatis.sqlmap.engine.mapping.sql.Sql;
import com.ibatis.sqlmap.engine.mapping.statement.MappedStatement;
import com.ibatis.sqlmap.engine.scope.StatementScope;

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

	/**
	 * @param uid
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public int checkUserId(String uid) {
		Integer result = (Integer)getSqlMapClientTemplate().queryForObject("user.selectUserCount", uid);
		return result.intValue();
	}

	@SuppressWarnings("unchecked")
	public int userJoin(Map<String, Object> map) throws Exception{
		Integer result = (Integer)getSqlMapClientTemplate().insert("user.userJoin", map);
		return result.intValue();
	}

	/**
	 * 회원 로그인 !!! (uid, password)
	 * 회원 아이디 중복 체크
	 * @param parameter
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Map<String, Object> getLoginUser(Map<String, Object> parameter) {
		// TODO Auto-generated method stub
		return (Map<String, Object>)getSqlMapClientTemplate().queryForObject("user.selectLogin", parameter);
	}

	/**
	 * 
	 * @param userSeq
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> friendList(int userSeq) {
		return getSqlMapClientTemplate().queryForList("user.selectFriend", userSeq);
	}

	public List<Map<String, Object>> friendSearch(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return getSqlMapClientTemplate().queryForList("user.friendSearch", map);
	}
	
	public int addFriend(Map<String, Integer> map) {
		Integer result = (Integer)getSqlMapClientTemplate().update("user.addFriend", map);
		return result.intValue();
	}
	
	@SuppressWarnings("unchecked")
	public Map<String, Object> selectProfile(int userSeq){
		return (Map<String, Object>)getSqlMapClientTemplate().queryForObject("user.selectProfile", userSeq);
	}

	public int profileUpdate(Map<String, Object> map) {
		Integer result = (Integer)getSqlMapClientTemplate().update("user.profileUpdate", map);
		return result.intValue();
	}
	
}
