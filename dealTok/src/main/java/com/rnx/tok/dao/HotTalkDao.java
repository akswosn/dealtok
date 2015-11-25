/*
 * com.rnx.dao.hottok.HotTalkDao
 *
 * Created on 2012. 3. 23.
 *
 * Copyright (c) 2010 RionNex Co., Ltd. All Rights Reserved.
 */
package com.rnx.tok.dao;

import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.rnx.tok.model.HotTokParam;
/**
 *
 * 클래스에 대한 설명을 여기에 쓴다.
 *
 * Create Date 2012. 3. 23.
 * @version	1.00 2012. 3. 23.
 * @since   1.00
 * @see
 * @author	keun su(akswosn@gmail.com)
 * Revision History
 * who			when        	what
 * akswosn		2012. 3. 23.			최초.
 */
@SuppressWarnings("unused")
@Repository
public class HotTalkDao extends SqlMapClientDaoSupport
{
	/*
	private JdbcTemplate jdbcTemplate;

	@Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }
	 * */
	@Autowired
	public HotTalkDao(SqlMapClient sqlMapClient){
		setSqlMapClient(sqlMapClient);
	}

	/**
	 * Hot Talk List 조회 DAO
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getHotTalkList() throws Exception {
		return getSqlMapClientTemplate().queryForList("hotTok.selectHotTokList");
	}


	/**
	 * Deal List 조회 DAO
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getDealList() throws Exception {
		return getSqlMapClientTemplate().queryForList("hotTok.selectDealList");
	}

	/**
	 * Hot Talk 등록 DAO
	 * @return
	 * @throws Exception
	 */
	public int insertHotTalk(HotTokParam param) throws Exception {
		return getSqlMapClientTemplate().update("hotTok.insertHotTok", param);
	}
}
