/*
 * com.rnx.user.service.UserService
 *
 * Created on 2012. 3. 28.
 *
 * Copyright (c) 2010 RionNex Co., Ltd. All Rights Reserved.
 */
package com.rnx.user.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rnx.user.dao.UserDao;

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

@Service("UserService")
@Path("/user")
public class UserService
{
	/**
	 * @uml.property  name="m_userDao"
	 * @uml.associationEnd  readOnly="true"
	 */
	@Autowired
	private UserDao m_userDao;


	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.TEXT_PLAIN)
	@Path("/login/{userSeq}")
	public String getHotTalkList(@PathParam("userSeq")int userSeq) throws Exception{
		JSONObject jsonData = new JSONObject();

		try{
			Map<String, Object> map = new HashMap<String, Object>();
			map = m_userDao.getLoginUser(userSeq);
			if(map.isEmpty()){
				jsonData.put("err","데이터가 없습니다.");
				return jsonData.toString();
			}
			jsonData.put("user",map);

		}catch(Exception ex){
			ex.printStackTrace();
			System.out.println(ex.getMessage());
			jsonData.put("err", "시스템오류.");
		}
		//System.out.println("result : " + jsonData.toString());
		return jsonData.toString();
	}

	 @GET
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.TEXT_PLAIN)
		@Path("/userList")
		public String getHotTalkList() throws Exception{
			JSONObject jsonData = new JSONObject();
			JSONArray jsonArray = new JSONArray();

			try{
				List<Map<String, Object>> lst = new ArrayList<Map<String, Object>>();
				lst = m_userDao.getUserList();
				if(lst.isEmpty()){
					jsonData.put("err", "데이터가 없습니다.");
					return jsonData.toString();
				}
				Iterator<Map<String, Object>> itr = lst.iterator();
				int i = 0;
				while(itr.hasNext()){
					itr.next();
					jsonArray.put(lst.get(i++));
				}
				jsonData.put("userList",jsonArray);
				jsonData.put("err", "");
			}catch(Exception ex){
				ex.printStackTrace();
				System.out.println(ex.getMessage());
				jsonData.put("err", "시스템오류.");
			}
			//System.out.println("result : " + jsonData.toString());
			return jsonData.toString();
		}
}
