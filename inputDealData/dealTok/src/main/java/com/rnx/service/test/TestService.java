/*
 * test.rnx.service.TestService
 *
 * Created on 2012. 3. 23.
 *
 * Copyright (c) 2010 RionNex Co., Ltd. All Rights Reserved.
 */
package com.rnx.service.test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.stereotype.Service;

import com.rnx.dao.test.TestDao;






/**
 *
 *
 *
 * Create Date 2012. 3. 23.
 * @version	1.00 2012. 3. 23.
 * @since   1.00
 * @see
 * @author	keun su(akswosn@gmail.com)
 * Revision History
 * who			when        	what
 * akswosn		2012. 3. 23.	최초작성
 */

//url : http://{도메인}/rnxApi/test/
@Service("TestService")
@Path("/test")
public class TestService
{
	/**
	 * @uml.property  name="m_testDao"
	 * @uml.associationEnd
	 */
	private TestDao m_testDao;

    @Resource(name="TestDao")
    public void setTwitDao(TestDao twitDao) {
		this.m_testDao = twitDao;
    }
/*
	//GET 요청
	//url : http://{도메인}/rnxApi/test/{name}
	@GET
	@Produces("text/plain")
	@Path("/{name}")
	public String getClichedMessage(@PathParam("name") String name) {
		System.out.println("Call Get");
		JSONObject jsonData = new JSONObject();
		Map<String, Object> mp = new HashMap<String, Object> ();
		try{
			mp.put("result", "Hello World !!!." + name + " ");
			jsonData.put("data",mp);
		}catch(Exception e){
			System.out.println(e);
		}
		return jsonData.toString();
	}
 * */
	//Data Base 조회
    @GET
    @Produces(value={"text/plain"})
    @Path(value="/{user_seq}")
	public String getClichedMessage(@PathParam(value="user_seq") int userSeq)
		throws Exception{
		JSONObject jsonData = new JSONObject();
		JSONObject jsonTable = new JSONObject();
		JSONArray jsonArray = new JSONArray();

		try{
			List<Map<String, Object>> lst = new ArrayList<Map<String, Object>>();
			lst = m_testDao.getUserBySeq(userSeq);
			if(lst.isEmpty()){
				jsonTable.put("snss","");
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
			//jsonArray.put("snss", lst);
			jsonTable.put("users",jsonArray);
			jsonTable.put("err", "");
		}catch(Exception ex){
			ex.printStackTrace();
			System.out.println(ex.getMessage());
			jsonTable.put("snss","");
			jsonTable.put("err", "시스템오류.");
		}
		jsonData.put("data",jsonTable);
		return jsonData.toString();

	}




	//POST 요청
	@POST
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces("text/plain")
	public String get1(@FormParam("x") String xname
			,@FormParam("y") String yname) {
		System.out.println("getClichedMessage");
		JSONObject jsonData = new JSONObject();
		Map<String, Object> mp = new HashMap<String, Object> ();
		try{
			mp.put("xname", xname);
			mp.put("yname", yname);
			jsonData.put("data",mp);
		}catch(Exception e){
			System.out.println(e);
		}
		return jsonData.toString();
	}
}
