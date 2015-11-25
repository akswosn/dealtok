/*
 * com.damon.util.GoogleAddr2Coord
 *
 * Created on 2012. 10. 11.
 * 
 * Copyright (c) 2010 RionNex Co., Ltd. All Rights Reserved.
 */
package com.daemon.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.protocol.HTTP;
import org.apache.log4j.Logger;
import org.json.JSONException;
import org.json.JSONObject;

import com.daemon.common.Constant;
import com.daemon.common.PropertyReader;
/**
 * 
 * 클래스에 대한 설명을 여기에 쓴다.
 * 
 * Create Date 2012. 10. 11.
 * @version	1.00 2012. 10. 11.
 * @since   1.00
 * @see
 * @author	Keun-su Lim(akswosn@rionnex.com)
 * Revision History
 * who			when        	what
 * Keun-su		2012. 10. 11.			최초.
 */

public class GoogleAddr2Coord
{
	private static final String TAG = "GoogleAddr2Coord";
	private static Logger m_traceLogger = Logger.getLogger("TRACE");
	
	
	public double[] translate(String address) {		
		if (address == null)
			return new double[] {0,0};

		String jsonData = request(address);
		JSONObject locationObject = getLocationObject(jsonData);
		double[] location = getLocation(locationObject);
		return location;
	}

	private String request(String address)   {
		StringBuilder builder = new StringBuilder();
		HttpClient client = new DefaultHttpClient();
		HttpPost httpPost = null;
		try {
			String url = createPostUrl(address);
			httpPost = new HttpPost(url);
			HttpResponse response = client.execute(httpPost);
			StatusLine statusLine = response.getStatusLine();
			int statusCode = statusLine.getStatusCode();
			if (statusCode == 200) {
				HttpEntity entity = response.getEntity();
				InputStream content = entity.getContent();
				BufferedReader reader = new BufferedReader(new InputStreamReader(content));

				String line;
				while ((line = reader.readLine()) != null) {
					builder.append(line);
				}				
			} else {
				m_traceLogger.error("request() 조회 실패!!");
			}
		} catch (ClientProtocolException e) {
			m_traceLogger.error("ClientProtocolException : " + e);
		} catch (IOException e) {
			m_traceLogger.error("IOException : " + e);
		}	
		return builder.toString();
	}

	private String createPostUrl(String address) throws UnsupportedEncodingException {
		String addTxt = "";
		if(address.indexOf('(') > -1 || address.indexOf(')')> -1){
			addTxt = address.replace(address.substring(address.lastIndexOf('('), address.lastIndexOf(')')+1), "");
		}
		else {
			addTxt = address;
		}
		return String.format("%s?address=%s&sensor=true&language=%s",
				Constant.GOOGLE_ADDR2COORD_URL, 
				URLEncoder.encode(addTxt, HTTP.UTF_8),
				"ko");
	}

	private JSONObject getLocationObject(String jsonData) {
		System.out.println(jsonData);
		JSONObject locationObject = null;
		try {
			JSONObject object = new JSONObject(jsonData);
			if (object.getString("status").equals("OK")) {
				 locationObject = object.getJSONArray("results")
						.getJSONObject(0).getJSONObject("geometry").getJSONObject("location");
			} 
		} catch (JSONException e) {
			m_traceLogger.error("JSONException : " + e);
		}
		return locationObject;
	}

	private double[] getLocation(JSONObject object) {
		double[] location = new double[] {0,0};
		try {
			if (object != null) {
				location[0] = object.getDouble("lat");
				location[1] = object.getDouble("lng");
			}
		} catch (NumberFormatException e) {
			m_traceLogger.error("NumberFormatException : " + e);
		} catch (JSONException e) {
			m_traceLogger.error("JSONException : " + e);
		}
		return location;
	}
	
}
