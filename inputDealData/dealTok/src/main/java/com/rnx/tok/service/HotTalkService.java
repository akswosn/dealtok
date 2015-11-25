/*
 * com.rnx.service.hottok.HotTalkService
 *
 * Created on 2012. 3. 23.
 *
 * Copyright (c) 2010 RionNex Co., Ltd. All Rights Reserved.
 */
package com.rnx.tok.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rnx.tok.dao.HotTalkDao;
import com.rnx.tok.model.HotTokParam;



/**
 *
 * hotTalk Service
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
@Service("HotTalkService")
@Path("/hottok")
public class HotTalkService
{
	/**
	 * @uml.property  name="m_hottokDao"
	 * @uml.associationEnd  readOnly="true"
	 */
	@Autowired
	private HotTalkDao m_hottokDao;

    /**
     * Hot Talk 리스트 조회 Service
     * @return
     * @throws Exception
     */
    @GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.TEXT_PLAIN)
	@Path("/hotTalkList")
	public String getHotTalkList() throws Exception{
		JSONObject jsonData = new JSONObject();
		JSONObject jsonTable = new JSONObject();
		JSONArray jsonArray = new JSONArray();

		try{
			List<Map<String, Object>> lst = new ArrayList<Map<String, Object>>();
			lst = m_hottokDao.getHotTalkList();
			if(lst.isEmpty()){
				jsonTable.put("htList","");
				jsonTable.put("err", "데이터가 없습니다.");
				jsonData.put("data",jsonTable);
				return jsonData.toString();
			}
			Iterator<Map<String, Object>> itr = lst.iterator();
			int i = 0;
			while(itr.hasNext()){
				itr.next();
				jsonArray.put(lst.get(i++));
			}
			jsonTable.put("htList",jsonArray);
			jsonTable.put("err", "");
		}catch(Exception ex){
			ex.printStackTrace();
			System.out.println(ex.getMessage());
			jsonTable.put("htList","");
			jsonTable.put("err", "시스템오류.");
		}
		jsonData.put("data",jsonTable);
		//System.out.println("result : " + jsonData.toString());
		return jsonData.toString();
	}

    /**
     * Deal List 조회 Service
     * @return
     * @throws Exception
     */
    @GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.TEXT_PLAIN)
	@Path("/dealList")
	public String getDealList() throws Exception{
		JSONObject jsonData = new JSONObject();
		JSONObject jsonTable = new JSONObject();
		JSONArray jsonArray = new JSONArray();

		try{
			List<Map<String, Object>> lst = new ArrayList<Map<String, Object>>();
			lst = m_hottokDao.getDealList();
			if(lst.isEmpty()){
				jsonTable.put("dealList","");
				jsonTable.put("err", "데이터가 없습니다.");
				jsonData.put("data",jsonTable);
				return jsonData.toString();
			}
			Iterator<Map<String, Object>> itr = lst.iterator();
			int i = 0;
			while(itr.hasNext()){
				itr.next();
				jsonArray.put(lst.get(i++));
			}
			jsonTable.put("dealList",jsonArray);
			jsonTable.put("err", "");
		}catch(Exception ex){
			ex.printStackTrace();
			System.out.println(ex.getMessage());
			jsonTable.put("dealList","");
			jsonTable.put("err", "시스템오류.");
		}
		jsonData.put("data",jsonTable);
		//System.out.println("result : " + jsonData.toString());
		return jsonData.toString();
	}

    /**
     *
     * HotTalk 등록 Service
     * @param userSeq
     * @param dealId
     * @param dealContent
     * @return
     * @throws Exception
     */
    @POST
    @Path("/insertHotTalk")
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String insertHotTalk(@FormParam("userSeq") int userSeq
			, @FormParam("dealId") int dealId
			, @FormParam("content") String content
			, @Context HttpServletResponse servletResponse)	throws Exception{
		//System.out.println("### Parameter ###");
    	//System.out.println("userSeq : " + userSeq);
		//System.out.println("dealId : " + dealId);
		//System.out.println("content : " + content);

		HotTokParam param = new HotTokParam();
		param.setDealId(dealId);
		param.setUserSeq(userSeq);
		param.setContent(content);

    	JSONObject jsonData = new JSONObject();
		int result = 0;
		Map<String, Object> tableMp = new HashMap<String, Object> ();
		try{
			result = m_hottokDao.insertHotTalk(param);
			if(result > 0){
				tableMp.put("err", "");
				jsonData.put("success","true");
			}
			else {
				tableMp.put("err", "Hot Talk 등록 실패!");
				jsonData.put("success","false");
			}

		}catch(Exception ex){
			System.out.println(ex);
			tableMp.put("err", "시스템 오류입니다.");
			jsonData.put("success","false");
		}

		jsonData.put("data",tableMp);
		//System.out.println("result : " + jsonData.toString());
        return jsonData.toString();
	}

}
