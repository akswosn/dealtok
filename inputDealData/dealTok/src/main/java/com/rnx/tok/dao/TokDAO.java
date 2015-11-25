package com.rnx.tok.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;
import org.springframework.stereotype.Repository;
import com.ibatis.sqlmap.client.SqlMapClient;
import com.rnx.tok.model.Tok;
import com.rnx.tok.model.TokGroup;

@Repository
public class TokDAO extends SqlMapClientDaoSupport{

	@Autowired
	public TokDAO(SqlMapClient sqlMapClient){
		setSqlMapClient(sqlMapClient);
	}

	public int getTokCount()throws Exception{

		int count = 0;

		SqlMapClient sqlMapClient = getSqlMapClient();

		count = (Integer)sqlMapClient.queryForObject("tok.selectTokCount");

		System.out.println("count : " + count);

		return count;
	}

	@SuppressWarnings("unchecked")
	public List<TokGroup> selectTokGroupList(Tok tok)throws Exception{
		return (List<TokGroup>)getSqlMapClient().queryForList("tok.selectTokGroupList", tok);
	}

	public void insertTok(Tok tok)throws Exception{
		getSqlMapClient().insert("tok.insertTok", tok);
	}

	public int updateTokGroup(Tok tok)throws Exception{
		return (Integer)getSqlMapClient().update("tok.updateTokGroup", tok);
	}

	@SuppressWarnings("unchecked")
	public List<Tok> selectTokList(String tgId)throws Exception{
		return (List<Tok>)getSqlMapClient().queryForList("tok.selectTokList", tgId);
	}
	@SuppressWarnings("unchecked")
	public List<Tok> selectTokUserList(String tgId)throws Exception{
		return (List<Tok>)getSqlMapClient().queryForList("tok.selectTokUserList", tgId);
	}
}
