package com.rnx.tok.service;


import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rnx.tok.dao.TokDAO;
import com.rnx.tok.model.Tok;
import com.rnx.tok.model.TokGroup;

@SuppressWarnings("unused")
@Service("TokService")
@Path("/tok")
public class TokService {
	private Logger logger = Logger.getLogger("TRACE");
	/**
	 * @uml.property  name="tokDao"
	 * @uml.associationEnd  readOnly="true"
	 */
	@Autowired
	private TokDAO tokDao;

	//Data Base 조회
	@GET
	@Produces("text/plain")
	@Path("/tokListCount")
	public String getTokListCount(){
		logger.info("Start getTokListCount() !!!");
		try {
			tokDao.getTokCount();
		} catch (Exception e) {
			logger.error("Error msg : " + e.getMessage());
			logger.error("Error : " + e);
		}
		logger.info("End getTokListCount() !!!");
		return "";
	}

	@GET
	@Produces("text/plain")
	@Path("/tokGroupList/{userSeq}")
	public String getTokGroupList(@PathParam("type") String type,
			@PathParam("userSeq") String userSeq){
		logger.info("Start getTokGroupList() !!!");
		JSONObject jsonObject = new JSONObject();

		try {
			Tok tokParam = new Tok();
			tokParam.setType(type);
			tokParam.setUserSeq(userSeq);
			
			if(logger.isDebugEnabled()){
				logger.debug("param : " + tokParam);
			}

			jsonObject.put("list", tokDao.selectTokGroupList(tokParam));
		} catch (Exception e) {
			logger.error("Error msg : " + e.getMessage());
			logger.error("Error : " + e);
		}
		if(logger.isDebugEnabled()){
			logger.debug("result : " + jsonObject.toString());
		}
		logger.info("End getTokGroupList() !!!");
		return jsonObject.toString();
	}

	@GET
	@Produces("text/plain")
	@Path("/tokList/{tgId}")
	public String getTokList(@PathParam("tgId") String tgId){
		logger.info("Start getTokList() !!!");
		
		if(logger.isDebugEnabled()){
			logger.debug("param tgId : " + tgId);
		}

		JSONObject jsonObject = new JSONObject();

		try {
			jsonObject.put("list", tokDao.selectTokList(tgId));
		} catch (Exception e) {
			logger.error("Error msg : " + e.getMessage());
			logger.error("Error : " + e);
		}
		if(logger.isDebugEnabled()){
			logger.debug("result : " + jsonObject.toString());
		}
		logger.info("End getTokList() !!!");
		return jsonObject.toString();
	}

	@GET
	@Produces("text/plain")
	@Path("/tokUserList/{tgId}")
	public String getTokUserList(@PathParam("tgId") String tgId){
		logger.info("End getTokUserList() !!!");
		
		if(logger.isDebugEnabled()){
			logger.debug("param tgId : " + tgId);
		}
		JSONObject jsonObject = new JSONObject();

		try {
			jsonObject.put("users", tokDao.selectTokUserList(tgId));
		} catch (Exception e) {
			logger.error("Error msg : " + e.getMessage());
			logger.error("Error : " + e);
		}
		if(logger.isDebugEnabled()){
			logger.debug("result : " + jsonObject.toString());
		}
		logger.info("End getTokUserList() !!!");
		return jsonObject.toString();
	}

	//POST 요청
	@POST
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces("text/plain")
	@Path("/tokAdd")
	public String tokAdd(@FormParam("userSeq") String userSeq
			,@FormParam("tokGroupId") String tokGroupId
			,@FormParam("message") String message
			,@FormParam("createTime") String createTime
			) {
		logger.info("Start tokAdd() !!!");
		Tok tok = new Tok();

		try {
			tok.setUserSeq(userSeq);
			tok.setTokGroupId(tokGroupId);
			tok.setMessage(message);
			tok.setCreateTime(createTime);
			
			if(logger.isDebugEnabled()){
				logger.debug("param : " + tok);
			}
			
			tokDao.insertTok(tok);
			tokDao.updateTokGroup(tok);
		} catch (Exception e) {
			logger.error("Error msg : " + e.getMessage());
			logger.error("Error : " + e);
		}

		logger.info("tok insert success : " + tok.toString());
		logger.info("End tokAdd() !!!");
		return "";
	}
}
