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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rnx.tok.dao.TokDAO;
import com.rnx.tok.model.Tok;
import com.rnx.tok.model.TokGroup;

@SuppressWarnings("unused")
@Service("TokService")
@Path("/tok")
public class TokService {

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
		try {
			tokDao.getTokCount();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return "";
	}

	@GET
	@Produces("text/plain")
	@Path("/tokGroupList/{type}/{userSeq}")
	public String getTokGroupList(@PathParam("type") String type,
			@PathParam("userSeq") String userSeq){

		JSONObject jsonObject = new JSONObject();

		try {
			Tok tokParam = new Tok();
			tokParam.setType(type);
			tokParam.setUserSeq(userSeq);

			jsonObject.put("list", tokDao.selectTokGroupList(tokParam));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return jsonObject.toString();
	}

	@GET
	@Produces("text/plain")
	@Path("/tokList/{tgId}")
	public String getTokList(@PathParam("tgId") String tgId){

		JSONObject jsonObject = new JSONObject();

		try {
			jsonObject.put("list", tokDao.selectTokList(tgId));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return jsonObject.toString();
	}

	@GET
	@Produces("text/plain")
	@Path("/tokUserList/{tgId}")
	public String getTokUserList(@PathParam("tgId") String tgId){

		JSONObject jsonObject = new JSONObject();

		try {
			jsonObject.put("users", tokDao.selectTokUserList(tgId));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

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

		Tok tok = new Tok();

		try {
			tok.setUserSeq(userSeq);
			tok.setTokGroupId(tokGroupId);
			tok.setMessage(message);
			tok.setCreateTime(createTime);

			tokDao.insertTok(tok);
			tokDao.updateTokGroup(tok);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		System.out.println("tok insert success : " + tok.toString());

		return "";
	}
}
