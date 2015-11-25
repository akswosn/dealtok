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
import com.rnx.deal.model.PushDeal;
import com.rnx.deal.model.Shop;


@SuppressWarnings("unused")
@Repository
public class DealDAO extends SqlMapClientDaoSupport {
	@Autowired
	public DealDAO(SqlMapClient sqlMapClient){
		setSqlMapClient(sqlMapClient);
	}

	@SuppressWarnings("unchecked")
	public List<Deal> selectHotDealList(Map<String, Integer> map) throws Exception{
		return (List<Deal>)getSqlMapClient().queryForList("deal.selectHotDealList", map);
	}
	
	@SuppressWarnings("unchecked")
	public List<Deal> selectPushDealList(Map<String, Integer> map) throws Exception{
		return (List<Deal>)getSqlMapClient().queryForList("deal.selectPushDealList", map);
	}
	
	@SuppressWarnings("unchecked")
	public int selectCategoryCount(int user_seq) throws Exception{
		return (Integer)getSqlMapClient().queryForObject("deal.selectCategoryCount", user_seq);
	}
	
	@SuppressWarnings("unchecked")
	public int selectAreaCount(int user_seq) throws Exception{
		return (Integer)getSqlMapClient().queryForObject("deal.selectAreaCount", user_seq);
	}
	
	@SuppressWarnings("unchecked")
	public int selectSellerCount(int user_seq) throws Exception{
		return (Integer)getSqlMapClient().queryForObject("deal.selectSellerCount", user_seq);
	}
	
	@SuppressWarnings("unchecked")
	public void insertPushDeal(PushDeal push) throws Exception{
		getSqlMapClient().insert("deal.insertPushDeal", push);
	}
	
	@SuppressWarnings("unchecked")
	public void deletePushDeal(PushDeal push) throws Exception{
		getSqlMapClient().delete("deal.deletePushDeal", push);
	}
	
	@SuppressWarnings("unchecked")
	public List<PushDeal> selectPushDealInfo(PushDeal push) throws Exception{
		return (List<PushDeal>)getSqlMapClient().queryForList("deal.selectPushDealInfo", push);
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

	public void insertTalkGroup(Msg msg) throws Exception{
		getSqlMapClient().insert("deal.insertTalkGroup", msg);
	}

	public int getTGID(int user_seq) throws Exception{
		return (Integer)getSqlMapClient().queryForObject("deal.getTGID", user_seq);
	}

	public void insertTalkUser(Msg msg) throws Exception{
		getSqlMapClient().insert("deal.insertTalkUser", msg);
	}

	public void insertTalkContent(Msg msg) throws Exception{
		getSqlMapClient().insert("deal.insertTalkContent", msg);
	}

}
