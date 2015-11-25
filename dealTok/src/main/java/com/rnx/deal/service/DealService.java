package com.rnx.deal.service;

import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rnx.deal.dao.DealDAO;
import com.rnx.deal.model.Area;
import com.rnx.deal.model.Category;
import com.rnx.deal.model.Msg;
import com.rnx.deal.model.PushDeal;
import com.rnx.deal.model.Shop;

import net.sf.json.JSONObject;

/**
*
* hotTalk Service
*
* Create Date 2012. 3. 23.
* @version	1.00 2012. 12. 26.
* @since   1.00
* @see
* @author	Song Seong Ho(svpersh2@gmail.com)
* Revision History
* who			when        	what
* akswosn		2012. 12. 26.			수정.
*/

@Service("DealService")
@Path("/deal")
public class DealService {
	private Logger logger = Logger.getLogger("TRACE");
	/**
	 * @uml.property  name="dealDao"
	 * @uml.associationEnd  readOnly="true"
	 */
	@Autowired
	private DealDAO dealDao;

	//HotDeal 목록을 가져온다.
	@GET
	@Produces("text/plain")
	@Path("/hotDeal/{sort}/{startNum}/{endNum}")
	public String getHotDealList(@PathParam("sort") String sort, @PathParam("startNum") String startNum, @PathParam("endNum") String endNum){
		logger.info("Start getHotDealList() !!!");
		JSONObject jsonObject = new JSONObject();
		Map<String, Integer> map = new HashMap<String, Integer>();
		try{
			if(sort.equals("latest")){
				//최신순
				map.put("sort", 1);
			}else{
				//인기순
				map.put("sort", 2);
			}
			map.put("startNum", new Integer(startNum));
			map.put("endNum", new Integer(endNum));

			if(logger.isDebugEnabled()){
				logger.debug("param : " + map);
			}
			jsonObject.put("list", dealDao.selectHotDealList(map));
		}catch (Exception e) {
			logger.error("Error msg : " + e.getMessage());
			logger.error("Error : " + e);
		}
		if(logger.isDebugEnabled()){
			logger.debug("result : " + jsonObject.toString());
		}
		logger.info("End getHotDealList() !!!");
		return jsonObject.toString();

	}

	//PushDeal 목록을 가져온다
	@GET
	@Produces("text/plain")
	@Path("/pushDeal/{user_seq}/{startNum}/{endNum}")
	public String getPushDealList(@PathParam("user_seq") String user_seq, @PathParam("startNum") String startNum, @PathParam("endNum") String endNum){
		logger.info("Start getPushDealList() !!!");
		JSONObject jsonObject = new JSONObject();
		Map<String, Integer> map = new HashMap<String, Integer>();
		try{
			int category = dealDao.selectCategoryCount(new Integer(user_seq));
			int area = dealDao.selectAreaCount(new Integer(user_seq));
			int seller = dealDao.selectSellerCount(new Integer(user_seq));
			map.put("user_seq", new Integer(user_seq));
			map.put("category", category);
			map.put("area", area);
			map.put("seller", seller);
			map.put("startNum", new Integer(startNum));
			map.put("endNum", new Integer(endNum));

			if(logger.isDebugEnabled()){
				logger.debug("param : " + map);
			}

			if(category == 0 && area == 0 && seller == 0){
				//push deal 미설정
				map.put("default", 1);
			}else{
				//push deal 설정
				map.put("default", 2);
			}
			jsonObject.put("list", dealDao.selectPushDealList(map));
		}catch (Exception e) {
			logger.error("Error msg : " + e.getMessage());
			logger.error("Error : " + e);
		}
		if(logger.isDebugEnabled()){
			logger.debug("result : " + jsonObject.toString());
		}
		logger.info("End getPushDealList() !!!");
		return jsonObject.toString();

	}

	//친구 목록을 가져온다
	@GET
	@Produces("text/plain")
	@Path("/friendList/{user_seq}")
	public String getfriendList(@PathParam("user_seq") String user_seq){
		logger.info("Start getfriendList() !!!");
		JSONObject jsonObject = new JSONObject();

		if(logger.isDebugEnabled()){
			logger.debug("param user_seq : " + user_seq);
		}

		try{
			jsonObject.put("list", dealDao.selectFriendList(Integer.parseInt(user_seq)));

		}catch (Exception e) {
			logger.error("Error msg : " + e.getMessage());
			logger.error("Error : " + e);
		}

		if(logger.isDebugEnabled()){
			logger.debug("result : " + jsonObject.toString());
		}

		logger.info("End getfriendList() !!!");
		return jsonObject.toString();
	}

	//메세지 작성
	@GET
	@Produces("text/plain")
	@Path("/sendMsg/{user_seq}/{friend_seq}/{did}/{msg}")
	public String sendMsg(@PathParam("user_seq") String user_seq,
			@PathParam("friend_seq") String friend_seq, @PathParam("did") String did,
			@PathParam("msg") String message){
		logger.info("Start sendMsg() !!!");
		Msg msg = new Msg();
		msg.setUser_seq(Integer.parseInt(user_seq));
		msg.setDid(Integer.parseInt(did));
		msg.setMessage(message);

		if(logger.isDebugEnabled()){
			logger.debug("param : " + msg);
		}

		try{
			dealDao.insertTalkGroup(msg);
			msg.setTgid(dealDao.getTGID(Integer.parseInt(user_seq)));
			insertTalkUser(Integer.parseInt(user_seq), friend_seq, msg.getTgid());
			dealDao.insertTalkContent(msg);
		}catch (Exception e) {
			logger.error("Error msg : " + e.getMessage());
			logger.error("Error : " + e);
		}
		logger.info("End sendMsg() !!!");
		return "";

	}

	//Tok 참여 유저 Insert
	private void insertTalkUser(int m_user_seq, String m_friend_seq, int m_tgid){
		logger.info("Start insertTalkUser() !!!");
		Msg msg = new Msg();
		msg.setFriend_seq(m_user_seq);
		msg.setTgid(m_tgid);
		String friends_seq[] = m_friend_seq.split(",");

		if(logger.isDebugEnabled()){
			logger.debug("param : " + msg);
		}

		try{
			//메세지 작성자 Insert
			dealDao.insertTalkUser(msg);

			//메세지 받은 친구들 Insert
			for(int i=0; i<friends_seq.length; i++){
				msg.setFriend_seq(Integer.parseInt(friends_seq[i]));
				dealDao.insertTalkUser(msg);
			}
		}catch (Exception e) {
			logger.error("Error msg : " + e.getMessage());
			logger.error("Error : " + e);
		}
		logger.info("End insertTalkUser() !!!");
	}

	//상품 검색 리스트 Category
	@GET
	@Produces("text/plain")
	@Path("/searchDealList/{health}/{culture}/{education}/{food}/{online}/{life}/{travel}/{event}/{party}/{sort}/{startNum}/{endNum}")
	public String searchDealList(@PathParam("health") String health,
			@PathParam("culture") String culture, @PathParam("education") String education,
			@PathParam("food") String food, @PathParam("online") String online,
			@PathParam("life") String life, @PathParam("travel") String travel,
			@PathParam("event") String event, @PathParam("party") String party, @PathParam("sort") String sort,
			@PathParam("startNum") String startNum, @PathParam("endNum") String endNum){
		logger.info("Start searchDealList() !!!");
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

			if(logger.isDebugEnabled()){
				logger.debug("param : " + cat);
			}

			if(sort.equals("latest")){
				//최신순
				cat.setSort(1);
			}else{
				//인기순
				cat.setSort(2);
			}
			cat.setStartNum(Integer.parseInt(startNum));
			cat.setEndNum(Integer.parseInt(endNum));

			jsonObject.put("list", dealDao.selectSearchDealList(cat));

		}catch (Exception e) {
			logger.error("Error msg : " + e.getMessage());
			logger.error("Error : " + e);
		}
		if(logger.isDebugEnabled()){
			logger.debug("result : " + jsonObject.toString());
		}

		logger.info("End searchDealList() !!!");
		return jsonObject.toString();
	}

	//상품 검색 리스트  Area
	@GET
	@Produces("text/plain")
	@Path("/searchDealList/{gangwon}/{gyeonggi}/{gyeongnam}/{gyeongbuk}/{gwangju}/{daegu}/{daejeon}/{busan}/{seoul}/{ulsan}/{incheon}/{jeonnam}/{jeonbuk}/{jeju}/{chungnam}/{chungbuk}/{sort}/{startNum}/{endNum}")
	public String searchDealList(
			@PathParam("gangwon") String gangwon, @PathParam("gyeonggi") String gyeonggi,
			@PathParam("gyeongnam") String gyeongnam, @PathParam("gyeongbuk") String gyeongbuk,
			@PathParam("gwangju") String gwangju, @PathParam("daegu") String daegu,
			@PathParam("daejeon") String daejeon, @PathParam("busan") String busan,
			@PathParam("seoul") String seoul, @PathParam("ulsan") String ulsan,
			@PathParam("incheon") String incheon, @PathParam("jeonnam") String jeonnam,
			@PathParam("jeonbuk") String jeonbuk, @PathParam("jeju") String jeju,
			@PathParam("chungnam") String chungnam, @PathParam("chungbuk") String chungbuk, @PathParam("sort") String sort,
			@PathParam("startNum") String startNum, @PathParam("endNum") String endNum){
		logger.info("Start searchDealList() !!!");
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

			if(sort.equals("latest")){
				//최신순
				area.setSort(1);
			}else{
				//인기순
				area.setSort(2);
			}
			area.setStartNum(Integer.parseInt(startNum));
			area.setEndNum(Integer.parseInt(endNum));

			if(logger.isDebugEnabled()){
				logger.debug("param : " + area);
			}

			jsonObject.put("list", dealDao.selectSearchDealList(area));

		}catch (Exception e) {
			logger.error("Error msg : " + e.getMessage());
			logger.error("Error : " + e);
		}
		if(logger.isDebugEnabled()){
			logger.debug("result : " + jsonObject.toString());
		}
		logger.info("End searchDealList() !!!");
		return jsonObject.toString();
	}

	//상품 검색 리스트  Shop
	@GET
	@Produces("text/plain")
	@Path("/searchDealList/{wemakeprice}/{coupang}/{ticketmonster}/{stylecoupons}/{groupon}/{ilgongil}/{daylect}/{nowshop}/{chanuri}/{tboom}/{sort}/{startNum}/{endNum}")
	public String searchDealList(
			@PathParam("wemakeprice") String wemakeprice,
			@PathParam("coupang") String coupang,
			@PathParam("ticketmonster") String ticketmonster,
			@PathParam("stylecoupons") String stylecoupons,
			@PathParam("groupon") String groupon,
			@PathParam("ilgongil") String ilgongil,
			@PathParam("daylect") String daylect,
			@PathParam("nowshop") String nowshop,
			@PathParam("chanuri") String chanuri,
			@PathParam("tboom") String tboom,
			@PathParam("sort") String sort,
			@PathParam("startNum") String startNum, @PathParam("endNum") String endNum){
		logger.info("Start searchDealList() !!!");
		JSONObject jsonObject = new JSONObject();
		Shop shop = new Shop();
		try{
			shop.setWemakeprice(wemakeprice);
			shop.setCoupang(coupang);
			shop.setTicketmonster(ticketmonster);
			shop.setStylecoupons(stylecoupons);
			shop.setGroupon(groupon);
			shop.setIlgongil(ilgongil);
			shop.setDaylect(daylect);
			shop.setNowshop(nowshop);
			shop.setChanuri(chanuri);
			shop.setTboom(tboom);
			if(sort.equals("latest")){
				//최신순
				shop.setSort(1);
			}else{
				//인기순
				shop.setSort(2);
			}
			shop.setStartNum(Integer.parseInt(startNum));
			shop.setEndNum(Integer.parseInt(endNum));
			if(logger.isDebugEnabled()){
				logger.debug("param : " + shop);
			}
			jsonObject.put("list", dealDao.selectSearchDealList(shop));

		}catch (Exception e) {
			logger.error("Error msg : " + e.getMessage());
			logger.error("Error : " + e);
		}
		if(logger.isDebugEnabled()){
			logger.debug("result : " + jsonObject.toString());
		}
		logger.info("End searchDealList() !!!");
		return jsonObject.toString();
	}

	//PushDeal 설정 Category
	@GET
	@Produces("text/plain")
	@Path("/pushDeal/category/{health}/{culture}/{education}/{food}/{online}/{life}/{travel}/{event}/{party}/{user_seq}")
	public String insertPushDeal(@PathParam("health") String health,
			@PathParam("culture") String culture, @PathParam("education") String education,
			@PathParam("food") String food, @PathParam("online") String online,
			@PathParam("life") String life, @PathParam("travel") String travel,
			@PathParam("event") String event, @PathParam("party") String party, @PathParam("user_seq") String user_seq){
		logger.info("Start insertPushDeal() !!!");
		PushDeal push = new PushDeal();
		try{
			push.setUser_seq(Integer.parseInt(user_seq));
			push.setFirst_kind("category");
			dealDao.deletePushDeal(push);
			if(health.equals("true")){
				push.setSecond_kind("건강/레저");
				dealDao.insertPushDeal(push);
			}
			if(culture.equals("true")){
				push.setSecond_kind("공연/전시/문화");
				dealDao.insertPushDeal(push);
			}
			if(education.equals("true")){
				push.setSecond_kind("교육/취미");
				dealDao.insertPushDeal(push);
			}
			if(food.equals("true")){
				push.setSecond_kind("맛집/카페");
				dealDao.insertPushDeal(push);
			}
			if(online.equals("true")){
				push.setSecond_kind("모바일/온라인");
				dealDao.insertPushDeal(push);
			}
			if(life.equals("true")){
				push.setSecond_kind("뷰티/생활");
				dealDao.insertPushDeal(push);
			}
			if(travel.equals("true")){
				push.setSecond_kind("여행/숙박");
				dealDao.insertPushDeal(push);
			}
			if(event.equals("true")){
				push.setSecond_kind("이벤트/기타");
				dealDao.insertPushDeal(push);
			}
			if(party.equals("true")){
				push.setSecond_kind("주점/파티");
				dealDao.insertPushDeal(push);
			}

		}catch (Exception e) {
			logger.error("Error msg : " + e.getMessage());
			logger.error("Error : " + e);
		}
		logger.info("End insertPushDeal() !!!");
		return "";
	}

	//PushDeal 설정 Area
	@GET
	@Produces("text/plain")
	@Path("/pushDeal/area/{gangwon}/{gyeonggi}/{gyeongnam}/{gyeongbuk}/{gwangju}/{daegu}/{daejeon}/{busan}/{seoul}/{ulsan}/{incheon}/{jeonnam}/{jeonbuk}/{jeju}/{chungnam}/{chungbuk}/{user_seq}")
	public String insertPushDeal(
			@PathParam("gangwon") String gangwon, @PathParam("gyeonggi") String gyeonggi,
			@PathParam("gyeongnam") String gyeongnam, @PathParam("gyeongbuk") String gyeongbuk,
			@PathParam("gwangju") String gwangju, @PathParam("daegu") String daegu,
			@PathParam("daejeon") String daejeon, @PathParam("busan") String busan,
			@PathParam("seoul") String seoul, @PathParam("ulsan") String ulsan,
			@PathParam("incheon") String incheon, @PathParam("jeonnam") String jeonnam,
			@PathParam("jeonbuk") String jeonbuk, @PathParam("jeju") String jeju,
			@PathParam("chungnam") String chungnam, @PathParam("chungbuk") String chungbuk,
			@PathParam("user_seq") String user_seq){
		logger.info("Start insertPushDeal() !!!");
		PushDeal push = new PushDeal();
		try{
			push.setUser_seq(Integer.parseInt(user_seq));
			push.setFirst_kind("area");
			dealDao.deletePushDeal(push);
			if(gangwon.equals("true")){
				push.setSecond_kind("강원");
				dealDao.insertPushDeal(push);
			}
			if(gyeonggi.equals("true")){
				push.setSecond_kind("경기");
				dealDao.insertPushDeal(push);
			}
			if(gyeongnam.equals("true")){
				push.setSecond_kind("경남");
				dealDao.insertPushDeal(push);
			}
			if(gyeongbuk.equals("true")){
				push.setSecond_kind("경북");
				dealDao.insertPushDeal(push);
			}
			if(gwangju.equals("true")){
				push.setSecond_kind("광주");
				dealDao.insertPushDeal(push);
			}
			if(daegu.equals("true")){
				push.setSecond_kind("대구");
				dealDao.insertPushDeal(push);
			}
			if(daejeon.equals("true")){
				push.setSecond_kind("대전");
				dealDao.insertPushDeal(push);
			}
			if(seoul.equals("true")){
				push.setSecond_kind("부산");
				dealDao.insertPushDeal(push);
			}
			if(busan.equals("true")){
				push.setSecond_kind("서울");
				dealDao.insertPushDeal(push);
			}
			if(ulsan.equals("true")){
				push.setSecond_kind("울산");
				dealDao.insertPushDeal(push);
			}
			if(incheon.equals("true")){
				push.setSecond_kind("인천");
				dealDao.insertPushDeal(push);
			}
			if(jeonnam.equals("true")){
				push.setSecond_kind("전남");
				dealDao.insertPushDeal(push);
			}
			if(jeonbuk.equals("true")){
				push.setSecond_kind("전북");
				dealDao.insertPushDeal(push);
			}
			if(jeju.equals("true")){
				push.setSecond_kind("제주");
				dealDao.insertPushDeal(push);
			}
			if(chungnam.equals("true")){
				push.setSecond_kind("충남");
				dealDao.insertPushDeal(push);
			}
			if(chungbuk.equals("true")){
				push.setSecond_kind("충북");
				dealDao.insertPushDeal(push);
			}
		}catch (Exception e) {
			logger.error("Error msg : " + e.getMessage());
			logger.error("Error : " + e);
		}
		logger.info("End insertPushDeal() !!!");
		return "";
	}
	//PushDeal 설정 shop
	@GET
	@Produces("text/plain")
	@Path("/pushDeal/seller/{wemakeprice}/{coupang}/{ticketmonster}/{stylecoupons}/{groupon}/{ilgongil}/{daylect}/{nowshop}/{chanuri}/{tboom}/{user_seq}")
	public String insertPushDeal(
			@PathParam("wemakeprice") String wemakeprice,
			@PathParam("coupang") String coupang,
			@PathParam("ticketmonster") String ticketmonster,
			@PathParam("stylecoupons") String stylecoupons,
			@PathParam("groupon") String groupon,
			@PathParam("ilgongil") String ilgongil,
			@PathParam("daylect") String daylect,
			@PathParam("nowshop") String nowshop,
			@PathParam("chanuri") String chanuri,
			@PathParam("tboom") String tboom,
			@PathParam("user_seq") String user_seq){
		logger.info("Start insertPushDeal() !!!");
		PushDeal push = new PushDeal();
		try{
			push.setUser_seq(Integer.parseInt(user_seq));
			push.setFirst_kind("seller");
			dealDao.deletePushDeal(push);
			if(wemakeprice.equals("true")){
				push.setSecond_kind("위메프");
				dealDao.insertPushDeal(push);
			}
			if(coupang.equals("true")){
				push.setSecond_kind("쿠팡");
				dealDao.insertPushDeal(push);
			}
			if(ticketmonster.equals("true")){
				push.setSecond_kind("티켓몬스터");
				dealDao.insertPushDeal(push);
			}
			if(stylecoupons.equals("true")){
				push.setSecond_kind("스타일쿠폰");
				dealDao.insertPushDeal(push);
			}
			if(groupon.equals("true")){
				push.setSecond_kind("그루폰");
				dealDao.insertPushDeal(push);
			}
			if(ilgongil.equals("true")){
				push.setSecond_kind("일공일");
				dealDao.insertPushDeal(push);
			}
			if(daylect.equals("true")){
				push.setSecond_kind("데이렉트닷컴");
				dealDao.insertPushDeal(push);
			}
			if(nowshop.equals("true")){
				push.setSecond_kind("지금샵");
				dealDao.insertPushDeal(push);
			}
			if(chanuri.equals("true")){
				push.setSecond_kind("차누리");
				dealDao.insertPushDeal(push);
			}
			if(tboom.equals("true")){
				push.setSecond_kind("티붐");
				dealDao.insertPushDeal(push);
			}
		}catch (Exception e) {
			logger.error("Error msg : " + e.getMessage());
			logger.error("Error : " + e);
		}
		logger.info("End insertPushDeal() !!!");
		return "";
	}
	//PushDeal 설정화면 정보를 가져온다
	@GET
	@Produces("text/plain")
	@Path("/pushDealInfo/{user_seq}/{kind}")
	public String getPushDealList(@PathParam("user_seq") String user_seq, @PathParam("kind") String kind){
		logger.info("Start getPushDealList() !!!");
		JSONObject jsonObject = new JSONObject();
		PushDeal push = new PushDeal();
		try{
			push.setUser_seq(Integer.parseInt(user_seq));
			push.setFirst_kind(kind);
			if(logger.isDebugEnabled()){
				logger.debug("param : " + push);
			}
			jsonObject.put("info", dealDao.selectPushDealInfo(push));
		}catch (Exception e) {
			logger.error("Error msg : " + e.getMessage());
			logger.error("Error : " + e);
		}
		if(logger.isDebugEnabled()){
			logger.debug("result : " + jsonObject.toString());
		}
		logger.info("End getPushDealList() !!!");
		return jsonObject.toString();
	}
}

