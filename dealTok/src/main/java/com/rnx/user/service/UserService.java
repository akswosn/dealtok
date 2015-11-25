/*
 * com.rnx.user.service.UserService
 *
 * Created on 2012. 3. 28.
 *
 * Copyright (c) 2010 RionNex Co., Ltd. All Rights Reserved.
 */
package com.rnx.user.service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rnx.common.FileUploadUtil;
import com.rnx.common.PropertyReader;
import com.rnx.user.dao.UserDao;
import com.sun.jersey.core.header.FormDataContentDisposition;
import com.sun.jersey.multipart.FormDataParam;

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
	private Logger logger = Logger.getLogger("TRACE");
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
	public String login(@PathParam("userSeq")int userSeq) throws Exception{
		logger.info("Start login() !!!");
		JSONObject jsonData = new JSONObject();
		if(logger.isDebugEnabled()){
			logger.debug("param userSeq : " + userSeq);
		}
		try{
			Map<String, Object> map = new HashMap<String, Object>();
			map = m_userDao.getLoginUser(userSeq);
			if(map == null || map.isEmpty()){
				logger.warn("사용자 데이터가 없습니다.");
				jsonData.put("err","데이터가 없습니다.");
				return jsonData.toString();
			}
			jsonData.put("user",map);

		}catch(Exception ex){
			logger.error("Error msg : " + ex.getMessage());
			logger.error("Error : " + ex);
			jsonData.put("err", "시스템오류.");
		}
		if(logger.isDebugEnabled()){
			logger.debug("result : " + jsonData.toString());
		}
		logger.info("End login() !!!");
		return jsonData.toString();
	}
	@POST
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.TEXT_PLAIN)
	@Path("/userLogin/")
	public String userLogin(
		@FormParam("uid") String uid,	
		@FormParam("passwd") String passwd) throws Exception{
		JSONObject jsonData = new JSONObject();
		logger.info("Start userLogin() !!!");
		try{
			Map<String, Object> map = new HashMap<String, Object>();
			Map<String, Object> parameter = new HashMap<String, Object>();
			parameter.put("uid", uid);
			parameter.put("passwd", passwd);
			
			map = m_userDao.getLoginUser(parameter);
			if(map == null || map.isEmpty()){
				logger.warn("데이터가 없습니다.");
				jsonData.put("err","데이터가 없습니다.");
				return jsonData.toString();
			}
			jsonData.put("user",map);
			
		}catch(Exception ex){
			logger.error("Error msg : " + ex.getMessage());
			logger.error("Error : " + ex);
			jsonData.put("err", "시스템오류.");
		}
		if(logger.isDebugEnabled()){
			logger.debug("result : " + jsonData.toString());
		}
		logger.info("Start userLogin() !!!");
		return jsonData.toString();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.TEXT_PLAIN)
	@Path("/userList")
	public String userList() throws Exception{
		logger.info("Start userList() !!!");
		JSONObject jsonData = new JSONObject();
		JSONArray jsonArray = new JSONArray();

		try{
			List<Map<String, Object>> lst = new ArrayList<Map<String, Object>>();
			lst = m_userDao.getUserList();
			if(lst.isEmpty()){
				logger.warn("데이터가 없습니다.");
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
			logger.error("Error msg : " + ex.getMessage());
			logger.error("Error : " + ex);
			jsonData.put("err", "시스템오류.");
		}
		if(logger.isDebugEnabled()){
			logger.debug("result : " + jsonData.toString());
		}
		logger.info("End userList() !!!");
		return jsonData.toString();
	}
	 
	 
	/**
	 * 아이디 중복 확인
	 * @return
	 * @throws Exception
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.TEXT_PLAIN)
	@Path("/idCheck/{uid}")
	public String checkUserId(@PathParam("uid")String uid) throws Exception {
		logger.info("Start checkUserId() !!!");
		String resultMsg = "true";
		try{
			int result = m_userDao.checkUserId(uid);
			if(result > 0){
				resultMsg = "false";
			}
		}
		catch (Exception e) {
			logger.error("Error msg : " + e.getMessage());
			logger.error("Error : " + e);
			resultMsg = "false";
		}
		if(logger.isDebugEnabled()){
			logger.debug("IdD check result : " + resultMsg);
		}
		logger.info("End checkUserId() !!!");
		return resultMsg;
	}
	
	/**
	 * 회원 가입 (+ 파일 업로드)
	 * @return
	 */
	@POST
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Path("/userJoin")
	public Response userJoin(
			@FormDataParam("uid") String uid
			, @FormDataParam("phone") String phone
			, @FormDataParam("gender") String gender
			, @FormDataParam("passwd") String passwd
			, @FormDataParam("nickName") String nickName
			, @FormDataParam("age") int age
			, @FormDataParam("address") String address
			, @FormDataParam("greeting") String greeting
			, @FormDataParam("profileImg") InputStream uploadedInputStream
			, @FormDataParam("profileImg") FormDataContentDisposition fileDetail) throws Exception {
		logger.info("Start userJoin() !!!");
		PropertyReader prop = PropertyReader.getInstance();
		String outPut = "";
		int status = 0;
		
		//파일 업로드 
		String fileName = null;
		if(fileDetail.getFileName() != null 
				&& !"".equals(fileDetail.getFileName())){
			File uploadedFileLocation = new File(prop.getPropertyValue("IMG_UPLOAD_FILEPATH"));
			if(!uploadedFileLocation.isDirectory()){
				uploadedFileLocation.mkdir();
			}
			fileName =  System.currentTimeMillis() + fileDetail.getFileName().substring(fileDetail.getFileName().lastIndexOf('.'));
			try{
				FileUploadUtil.writeToFile(uploadedInputStream, uploadedFileLocation +File.separator + fileName);
			}catch (IOException e) {
				logger.error("File Upload Error : " + e.getMessage());
				logger.error("File Upload Error : " + e);
				outPut = "Internal Server Error";
				status = 500;
				return Response.status(status).entity(outPut).build();
			}
		}
		
		//회원 DB등록  LOGIC
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("uid", uid);
		map.put("gender", gender);
		map.put("phone", phone);
		map.put("passwd", passwd);
		map.put("nickName", nickName);
		map.put("age", age);
		map.put("address", address);
		map.put("profile_img", fileName);
		map.put("greeting", greeting);
		
		if(logger.isDebugEnabled()){
			logger.debug("param : " + map);
		}
		int result = 0;
		try{
			result = m_userDao.userJoin(map);
		}catch (Exception e) {
			logger.error("Error : " + e.getMessage());
			logger.error("Error : " + e);
			return Response.status(500).entity("Internal Server Error").build();
		}
		
		if(result > 0){
			outPut = "OK";
			status = 200;
		}
		else {
			outPut = "Not Implemented";
			status = 501;
		}
		if(logger.isDebugEnabled()){
			logger.debug("result : [ status = " + status + ", outPut = " + outPut + " ]");
		}
		logger.info("End userJoin() !!!");
		return Response.status(status).entity(outPut).build();
	}
	
	/**
	 * 내친구 목록 조회
	 * @param userSeq
	 * @return
	 * @throws Exception
	 */
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Path("/friendList/{userSeq}")
	public String friendList(@PathParam("userSeq") int userSeq) throws Exception{
		logger.info("String friendList() !!!");
		JSONObject jsonData = new JSONObject();
		JSONArray jsonArray = new JSONArray();
		System.out.println("friendList start suerSeq : " + userSeq);
		try{
			List<Map<String, Object>> lst = new ArrayList<Map<String, Object>>();
			lst = m_userDao.friendList(userSeq);
			if(lst.isEmpty()){
				logger.warn("데이터가 없습니다.");
				jsonData.put("err", "데이터가 없습니다.");
				return jsonData.toString();
			}
			Iterator<Map<String, Object>> itr = lst.iterator();
			int i = 0;
			while(itr.hasNext()){
				itr.next();
				jsonArray.put(lst.get(i++));
			}
			jsonData.put("friendList",jsonArray);
			jsonData.put("err", "");
		}catch(Exception ex){
			logger.error("Error : " + ex.getMessage());
			logger.error("Error : " + ex);
			jsonData.put("err", "시스템오류.");
		}
		if(logger.isDebugEnabled()){
			logger.debug("result : " + jsonData.toString());
		}
		logger.info("End friendList() !!!");
		return jsonData.toString();
	}
	/**
	 * 친구 검색
	 * @param userSeq
	 * @return
	 * @throws Exception
	 */
	@POST
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Path("/friendSearch")
	public String friendSearch(
		@FormParam("userSeq") int userSeq,
		@FormParam("uid") String uid,
		@FormParam("nickName") String nickName,
		@FormParam("phone") int phone,
		@FormParam("gender") String gender)throws Exception{
		
		logger.info("Start friendSearch() !!!");
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userSeq", userSeq);
		map.put("gender", gender);
		if(uid != null && !"".equals(uid)){
			map.put("uid", uid);
		}
		if(phone > 0){
			map.put("phone", phone);
		}
		if(nickName != null && !"".equals(nickName)){
			map.put("nickName", nickName);
		}
		if(logger.isDebugEnabled()){
			logger.debug("param : " + map);
		}
		JSONObject jsonData = new JSONObject();
		JSONArray jsonArray = new JSONArray();
		
		try{
			List<Map<String, Object>> lst = new ArrayList<Map<String, Object>>();
			lst = m_userDao.friendSearch(map);
			if(lst.isEmpty()){
				logger.warn("검색결과가 없습니다.");
				jsonData.put("err", "검색결과가 없습니다.");
				return jsonData.toString();
			}
			Iterator<Map<String, Object>> itr = lst.iterator();
			int i = 0;
			while(itr.hasNext()){
				itr.next();
				jsonArray.put(lst.get(i++));
			}
			jsonData.put("friendSearch",jsonArray);
			jsonData.put("err", "");
		}catch(Exception ex){
			logger.error("Error : " + ex.getMessage());
			logger.error("Error : " + ex);
			jsonData.put("err", "시스템오류.");
		}
		if(logger.isDebugEnabled()){
			logger.debug("param : " + jsonData.toString());
		}
		logger.info("End friendSearch() !!!");
		return jsonData.toString();
	}
	/**
	 * 친구추가
	 * @param userSeqList
	 * @return
	 */
	@POST
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Path("/addFriend")
	public Response addFriend(
			@FormParam("myUserSeq") int myUserSeq,
			@FormParam("userSeqList") String userSeqList){
		logger.info("String addFriend() !!!");
		int[] userSeqArr = null;
		
		if(logger.isDebugEnabled()){
			logger.debug("param userSeqList : " + userSeqList);
		}
		
		if(userSeqList.lastIndexOf(',') < 0){
			userSeqArr = new int[1];
			userSeqArr[0] = Integer.parseInt(userSeqList);
		}
		else {
			String[] userSeqs = userSeqList.split(",");
			userSeqArr = new int[userSeqs.length];
			String temp = "";
			
			//Array Parse Int
			try {
				for (int i = 0 ; i < userSeqs.length; i++){
					temp = userSeqs[i];
					userSeqArr[i] = Integer.parseInt(temp);
				}
			}catch (Exception e) {
				logger.error("Error : " + e.getMessage());
				logger.error("Error : " + e);
				return Response.status(500).entity("Internal Server Error").build();
			}
		}
		
		Map<String, Integer> map = new HashMap<String, Integer>();
		
		String outPut = "";
		int status = 0;
		int result = 0;
		try{
			m_userDao.getSqlMapClient().startTransaction();
			map.put("myUserSeq", myUserSeq);
			for(int tmp : userSeqArr){
				map.put("friendUserSeq", tmp);
				
				result = m_userDao.addFriend(map);
			}
			m_userDao.getSqlMapClient().endTransaction();
			
		}catch (Exception e) {
			logger.error("Error : " + e.getMessage());
			logger.error("Error : " + e);
			return Response.status(500).entity("Internal Server Error").build();
		}finally{
			try{
				m_userDao.getSqlMapClient().commitTransaction();
			}
			catch(Exception e2){}
		}
		
		if(result > 0){
			outPut = "OK";
			status = 200;
		}
		else {
			outPut = "Not Implemented";
			status = 501;
		}
		
		if(logger.isDebugEnabled()){
			logger.debug("result : [ status = " + status + ", outPut = " + outPut + " ]");
		}
		
		logger.info("End addFriend() !!!");
		return Response.status(status).entity(outPut).build();
	}
	
	/**
	 * 사용자 프로필 조회
	 * @param userSeq
	 * @return
	 * @throws Exception
	 */
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.TEXT_PLAIN)
	@Path("/profile/{userSeq}")
	public String profile(
		@PathParam("userSeq") int userSeq) throws Exception{
		JSONObject jsonData = new JSONObject();
		logger.info("Start profile() !!!");
		try{
			Map<String, Object> map = new HashMap<String, Object>();
			
			map = m_userDao.selectProfile(userSeq);
			if(map == null || map.isEmpty()){
				logger.warn("데이터가 없습니다.");
				jsonData.put("err","데이터가 없습니다.");
				return jsonData.toString();
			}
			jsonData.put("profile",map);
			
		}catch(Exception ex){
			logger.error("Error : " + ex.getMessage());
			logger.error("Error : " + ex);
			jsonData.put("err", "시스템오류.");
		}
		if(logger.isDebugEnabled()){
			logger.debug("result : " + jsonData.toString());
		}
		logger.info("End profile() !!!");
		return jsonData.toString();
	}
	
	@POST
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Path("/profileUpdate/")
	public Response profileUpdate(
			@FormDataParam("userSeq") int userSeq,	
			@FormDataParam("age") String age,	
			@FormDataParam("nickName") String nickName,
			@FormDataParam("greeting") String greeting, 
			@FormDataParam("userImg") InputStream uploadedInputStream,
			@FormDataParam("userImg") FormDataContentDisposition fileDetail) throws Exception{
		logger.info("Start profileUpdate() !!!");
		
		int result = 0;
		String outPut = "";
		int status = 0;
		
		PropertyReader prop = PropertyReader.getInstance();
		String fileName = null;
		if(fileDetail.getFileName() != null 
				&& !"".equals(fileDetail.getFileName())){
			File uploadedFileLocation = new File(prop.getPropertyValue("IMG_UPLOAD_FILEPATH"));
			if(!uploadedFileLocation.isDirectory()){
				uploadedFileLocation.mkdir();
			}
			fileName =  System.currentTimeMillis() + fileDetail.getFileName().substring(fileDetail.getFileName().lastIndexOf('.'));
			try{
				FileUploadUtil.writeToFile(uploadedInputStream, uploadedFileLocation +File.separator + fileName);
			}catch (IOException e) {
				logger.error("File Upload Error : " + e.getMessage());
				logger.error("File Upload Error : " + e);
				outPut = "Internal Server Error";
				status = 500;
				return Response.status(status).entity(outPut).build();
			}
		}
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("age", age);
		map.put("nickName", nickName);
		map.put("greeting", greeting);
		map.put("userSeq", userSeq);
		map.put("profileImg", fileName);
		if(logger.isDebugEnabled()){
			logger.debug("param : " + map);
		}
		try{
			result = m_userDao.profileUpdate(map);
		}catch (Exception e) {
			logger.error("Error : " + e.getMessage());
			logger.error("Error : " + e);
			return Response.status(500).entity("Internal Server Error").build();
		}
		
		if(result > 0){
			outPut = "OK";
			status = 200;
		}
		else {
			outPut = "Not Implemented";
			status = 501;
		}
		if(logger.isDebugEnabled()){
			logger.debug("result : [ status = " + status + ", outPut = " + outPut + " ]");
		}
		logger.info("End profileUpdate() !!!");
		return Response.status(status).entity(outPut).build();
	}
}
