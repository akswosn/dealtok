package com.daemon.excute;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

import org.apache.log4j.Logger;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;
import org.xml.sax.InputSource;

import com.daemon.dao.DealDataDAO;
import com.daemon.vo.DealDataVO;

public class DealDataExcutor {
	private static Logger m_traceLogger	= Logger.getLogger("TRACE");
	
	public static void inputDealData(){
		SAXBuilder sb = new SAXBuilder();
		Element content = null;
		String name;
		String url;
		
		try {
			Document doc = sb.build("rssList.xml");
			
			Element root = doc.getRootElement();
			
			List list = root.getChildren("shop");
			int count = list.size();

			for(int i=0; i<count; i++){
				content = (Element)list.get(i);
				name = content.getChildTextTrim("name");
				url = content.getChildTextTrim("url");
				
				DealDataDAO.getInstance().deleteDealData(name);
				m_traceLogger.info("delete : " + name);
				
				insertDealData(name, url);
			}
		} catch (Exception e) {
			m_traceLogger.error("DealDataExcutor inputDealData : " + e);
		}
	}
	
	//rss파싱해서 DB에 Insert
	public static void insertDealData(String m_name, String m_url){
		try {
			SAXBuilder parser = new SAXBuilder();
			parser.setValidation(false);
			parser.setIgnoringElementContentWhitespace(true);
			URL url = new URL(m_url);
			InputSource is = new InputSource(url.openStream());
			Document doc = parser.build(is);
			
			Element root = doc.getRootElement();
			Element content = null;
			List list = root.getChildren("item");
			int count = list.size();
			
			for(int i=0; i<count; i++){
				content = (Element)list.get(i);
				DealDataVO vo = new DealDataVO();
				
				vo.setDname(content.getChildTextTrim("title"));
				vo.setDeal_img(content.getChildTextTrim("photo1"));
				vo.setContent(content.getChildTextTrim("desc_text"));
				vo.setLink(content.getChildTextTrim("link"));
				vo.setTime_start(content.getChildTextTrim("time_start"));
				vo.setTime_end(content.getChildTextTrim("time_end"));
				vo.setPrice_original(Integer.parseInt(content.getChildTextTrim("price_original") != null ? content.getChildTextTrim("price_original") : "0"));
				vo.setPrice_now(Integer.parseInt(content.getChildTextTrim("price_now") != null ? content.getChildTextTrim("price_now") : "0"));
				vo.setSale_percent(Integer.parseInt(content.getChildTextTrim("sale_percent") != null ? content.getChildTextTrim("sale_percent") : "0"));
				vo.setSell_count(Integer.parseInt(content.getChildTextTrim("sell_count") != null ? content.getChildTextTrim("sell_count") : "0"));
				vo.setCount_min(Integer.parseInt(content.getChildTextTrim("count_min") != null ? content.getChildTextTrim("count_min") : "0"));
				vo.setCount_max(Integer.parseInt(content.getChildTextTrim("count_max") != null ? content.getChildTextTrim("count_max") : "0"));
				vo.setArea(content.getChildTextTrim("area"));
				vo.setCategory(content.getChildTextTrim("category"));
				vo.setShop(content.getChildTextTrim("shop"));
				vo.setTel(content.getChildTextTrim("tel"));
				vo.setAddr(content.getChildTextTrim("addr"));
				vo.setLatitude(content.getChildTextTrim("latitude"));
				vo.setLongitude(content.getChildTextTrim("longitude"));
				vo.setDesc_text(content.getChildTextTrim("desc_text"));
				vo.setSeller(m_name);
				
				DealDataDAO.getInstance().insertDealData(vo);
				m_traceLogger.info("insert : " + vo.getSeller());
			}
		} catch (Exception e) {
			m_traceLogger.error("DealDataExcutor insertDealData : " + e);
		}
		
	}
	
	public static void main(String arg[]){
		m_traceLogger.info("start");
		inputDealData();
		m_traceLogger.info("end");
	}
}
