package com.rnx.deal.service;

import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rnx.deal.dao.DealDAO;
import com.rnx.deal.model.Area;
import com.rnx.deal.model.Category;
import com.rnx.deal.model.Msg;
import com.rnx.deal.model.Shop;

import net.sf.json.JSONObject;

@Service("DealService")
@Path("/deal")
public class DealService {
	
	/**
	 * @uml.property  name="dealDao"
	 * @uml.associationEnd  readOnly="true"
	 */
	@Autowired
	private DealDAO dealDao;
	
	//Deal 목록을 가져온다.
	@GET
	@Produces("text/plain")	
	@Path("/dealList/{startNum}/{endNum}")
	public String getDealList(@PathParam("startNum") String startNum, @PathParam("endNum") String endNum){
		JSONObject jsonObject = new JSONObject();
		Map<String, Integer> map = new HashMap<String, Integer>();
		try{
			map.put("startNum", new Integer(startNum));
			map.put("endNum", new Integer(endNum));
			
			jsonObject.put("list", dealDao.selectDealList(map));
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return jsonObject.toString();
		
	}
	
	//친구 목록을 가져온다
	@GET
	@Produces("text/plain")	
	@Path("/friendList/{user_seq}")
	public String getfriendList(@PathParam("user_seq") String user_seq){
		
		JSONObject jsonObject = new JSONObject();
		
		try{
			jsonObject.put("list", dealDao.selectFriendList(Integer.parseInt(user_seq)));
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return jsonObject.toString();
		
	}
	
	//메세지 작성
	@GET
	@Produces("text/plain")
	@Path("/sendMsg/{user_seq}/{friend_seq}/{did}/{msg}")
	public String sendMsg(@PathParam("user_seq") String user_seq, 
			@PathParam("friend_seq") String friend_seq, @PathParam("did") String did,
			@PathParam("msg") String message){
		Msg msg = new Msg();
		msg.setUser_seq(Integer.parseInt(user_seq));
		msg.setDid(Integer.parseInt(did));
		msg.setMessage(message);
		
		try{
			dealDao.insertTolkGroup(msg);
			msg.setTgid(dealDao.getTGID(Integer.parseInt(user_seq)));
			insertTolkUser(Integer.parseInt(user_seq), friend_seq, msg.getTgid());
			//dealDao.insertTolkUser(msg);
			dealDao.insertTolkContent(msg);
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return "";
		
	}
	
	//Tolk 참여 유저 Insert
	private void insertTolkUser(int m_user_seq, String m_friend_seq, int m_tgid){
		Msg msg = new Msg();
		msg.setFriend_seq(m_user_seq);
		msg.setTgid(m_tgid);
		String friends_seq[] = m_friend_seq.split(",");
		
		try{
			//메세지 작성자 Insert
			dealDao.insertTolkUser(msg);
			
			//메세지 받은 친구들 Insert
			for(int i=0; i<friends_seq.length; i++){
				msg.setFriend_seq(Integer.parseInt(friends_seq[i]));
				dealDao.insertTolkUser(msg);
			}
		}catch (Exception e) {
			e.printStackTrace();
		}	
	}
	
	//상품 검색 리스트 Category
	@GET
	@Produces("text/plain")
	@Path("/searchDealList/{health}/{culture}/{education}/{food}/{online}/{life}/{travel}/{event}/{party}/{startNum}/{endNum}")
	public String searchDealList(@PathParam("health") String health,
			@PathParam("culture") String culture, @PathParam("education") String education,
			@PathParam("food") String food, @PathParam("online") String online,
			@PathParam("life") String life, @PathParam("travel") String travel,
			@PathParam("event") String event, @PathParam("party") String party,
			@PathParam("startNum") String startNum, @PathParam("endNum") String endNum){
		JSONObject jsonObject = new JSONObject();
		Category cat = new Category();
		try{
			cat.setHealth(health);
			cat.setCulture(culture);
			cat.setEducation(education);
			cat.setFood(food);
			cat.setOnline(online);
			cat.setLife(life);
			cat.setTravel(travel);
			cat.setEvent(event);
			cat.setParty(party);
			cat.setStartNum(Integer.parseInt(startNum));
			cat.setEndNum(Integer.parseInt(endNum));
			
			jsonObject.put("list", dealDao.selectSearchDealList(cat));
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return jsonObject.toString();
	}
	
	//상품 검색 리스트  Area
	@GET
	@Produces("text/plain")
	@Path("/searchDealList/{gangwon}/{gyeonggi}/{gyeongnam}/{gyeongbuk}/{gwangju}/{daegu}/{daejeon}/{busan}/{seoul}/{ulsan}/{incheon}/{jeonnam}/{jeonbuk}/{jeju}/{chungnam}/{chungbuk}/{startNum}/{endNum}")
	public String searchDealList(
			@PathParam("gangwon") String gangwon, @PathParam("gyeonggi") String gyeonggi,
			@PathParam("gyeongnam") String gyeongnam, @PathParam("gyeongbuk") String gyeongbuk,
			@PathParam("gwangju") String gwangju, @PathParam("daegu") String daegu,
			@PathParam("daejeon") String daejeon, @PathParam("busan") String busan,
			@PathParam("seoul") String seoul, @PathParam("ulsan") String ulsan,
			@PathParam("incheon") String incheon, @PathParam("jeonnam") String jeonnam,
			@PathParam("jeonbuk") String jeonbuk, @PathParam("jeju") String jeju,
			@PathParam("chungnam") String chungnam, @PathParam("chungbuk") String chungbuk,
			@PathParam("startNum") String startNum, @PathParam("endNum") String endNum){
		JSONObject jsonObject = new JSONObject();
		Area area = new Area();
		try{
			area.setGangwon(gangwon);
			area.setGyeonggi(gyeonggi);
			area.setGyeongnam(gyeongnam);
			area.setGyeongbuk(gyeongbuk);
			area.setGwangju(gwangju);
			area.setDaegu(daegu);
			area.setDaejeon(daejeon);
			area.setBusan(busan);
			area.setSeoul(seoul);
			area.setUlsan(ulsan);
			area.setIncheon(incheon);
			area.setJeonnam(jeonnam);
			area.setJeonbuk(jeonbuk);
			area.setJeju(jeju);
			area.setChungnam(chungnam);
			area.setChungbuk(chungbuk);
			area.setStartNum(Integer.parseInt(startNum));
			area.setEndNum(Integer.parseInt(endNum));
			
			jsonObject.put("list", dealDao.selectSearchDealList(area));
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return jsonObject.toString();
	}
	
	//상품 검색 리스트  Shop
	@GET
	@Produces("text/plain")
	@Path("/searchDealList/{groupon}/{wemakeprice}/{ticketmonster}/{startNum}/{endNum}")
	public String searchDealList(@PathParam("groupon") String groupon,
			@PathParam("wemakeprice") String wemakeprice, @PathParam("ticketmonster") String ticketmonster,
			@PathParam("startNum") String startNum, @PathParam("endNum") String endNum){
		JSONObject jsonObject = new JSONObject();
		Shop shop = new Shop();
		try{
			shop.setGroupon(groupon);
			shop.setWemakeprice(wemakeprice);
			shop.setTicketmonster(ticketmonster);
			shop.setStartNum(Integer.parseInt(startNum));
			shop.setEndNum(Integer.parseInt(endNum));
			
			jsonObject.put("list", dealDao.selectSearchDealList(shop));
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return jsonObject.toString();
	}
}

