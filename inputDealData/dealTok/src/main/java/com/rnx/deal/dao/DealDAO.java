package com.rnx.deal.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;
import org.springframework.stereotype.Repository;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.rnx.deal.model.Area;
import com.rnx.deal.model.Category;
import com.rnx.deal.model.Deal;
import com.rnx.deal.model.Friend;
import com.rnx.deal.model.Msg;
import com.rnx.deal.model.Shop;


@SuppressWarnings("unused")
@Repository
public class DealDAO extends SqlMapClientDaoSupport {
	@Autowired
	public DealDAO(SqlMapClient sqlMapClient){
		setSqlMapClient(sqlMapClient);
	}


	@SuppressWarnings("unchecked")
	public List<Deal> selectDealList(Map<String, Integer> map) throws Exception{
		return (List<Deal>)getSqlMapClient().queryForList("deal.selectDealList", map);
	}

	@SuppressWarnings("unchecked")
	public List<Deal> selectSearchDealList(Category cat) throws Exception{
		return (List<Deal>)getSqlMapClient().queryForList("deal.selectSearchDealList_category", cat);
	}

	@SuppressWarnings("unchecked")
	public List<Deal> selectSearchDealList(Area area) throws Exception{
		return (List<Deal>)getSqlMapClient().queryForList("deal.selectSearchDealList_area", area);
	}

	@SuppressWarnings("unchecked")
	public List<Deal> selectSearchDealList(Shop shop) throws Exception{
		return (List<Deal>)getSqlMapClient().queryForList("deal.selectSearchDealList_shop", shop);
	}

	@SuppressWarnings("unchecked")
	public List<Friend> selectFriendList(int user_seq) throws Exception{
		return (List<Friend>)getSqlMapClient().queryForList("deal.selectFriendList", user_seq);
	}

	public void insertTolkGroup(Msg msg) throws Exception{
		getSqlMapClient().insert("deal.insertTolkGroup", msg);
	}

	public int getTGID(int user_seq) throws Exception{
		return (Integer)getSqlMapClient().queryForObject("deal.getTGID", user_seq);
	}

	public void insertTolkUser(Msg msg) throws Exception{
		getSqlMapClient().insert("deal.insertTolkUser", msg);
	}

	public void insertTolkContent(Msg msg) throws Exception{
		getSqlMapClient().insert("deal.insertTolkContent", msg);
	}

}
