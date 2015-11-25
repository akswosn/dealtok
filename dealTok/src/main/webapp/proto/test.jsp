<%@ page language="java" contentType="text/html; charset=EUC-KR" pageEncoding="EUC-KR"%>
<%@ page import="java.sql.DriverManager"%>
<%@ page import="java.sql.Connection"%>
<%@ page import="java.sql.PreparedStatement"%>
<%@ page import="java.sql.SQLException"%>
<%@ page import="org.jdom.Document" %>
<%@ page import="org.jdom.Element" %>
<%@ page import="org.jdom.input.SAXBuilder" %>
<%@ page import="org.xml.sax.InputSource" %>
<%@ page import="java.util.List" %>
<%@ page import="java.net.URL" %>


<%

List list = null;

String title = "";
Connection con = null;
PreparedStatement stmt = null;

try{
	Class.forName("com.mysql.jdbc.Driver");
	con = DriverManager.getConnection("jdbc:mysql://112.220.201.202:3306/dealtolk?useUnicode=true&amp;characterEncoding=utf-8&amp;autoReconnect=true","dealtolk","rionnex");
	String query = " INSERT INTO DEAL_ITEM(DNAME, DEAL_IMG, CONTENT, REG_DATE, LINK, TIME_START, TIME_END, PRICE_ORIGINAL, PRICE_NOW, SALE_PERCENT,"
				+ " SELL_COUNT, COUNT_MIN, COUNT_MAX, AREA, CATEGORY, SHOP, TEL, ADDR, LATITUDE, LONGITUDE, DESC_TEXT, SELLER) "
				+ " VALUES(?,?,?,SYSDATE(),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,'±¸·çÆù') ";
	
	SAXBuilder parser = new SAXBuilder();
	parser.setValidation(false);
	parser.setIgnoringElementContentWhitespace(true);
	URL url = new URL("http://rss.socialportal.co.kr/socialxml.php?mid=groupon&id=sarang");
	InputSource is = new InputSource(url.openStream());
	Document doc = parser.build(is);
	
	Element root = doc.getRootElement();
	Element content = null;
	list = root.getChildren("item");
	int count = list.size();

	for(int i=0; i<count; i++){
		content = (Element)list.get(i);
		title = "count = "+count;
		String test = content.getChildTextTrim("price_original");
		stmt = con.prepareStatement(query);
		stmt.setString(1, content.getChildTextTrim("title"));	//DNAME
		stmt.setString(2, content.getChildTextTrim("photo1"));	//DEAL_IMG
		stmt.setString(3, content.getChildTextTrim("desc_text"));	//CONTENT
		stmt.setString(4, content.getChildTextTrim("link"));	//LINK
		stmt.setString(5, content.getChildTextTrim("time_start"));	//TIME_START
		stmt.setString(6, content.getChildTextTrim("time_end"));	//TIME_END
		stmt.setInt(7, Integer.parseInt(content.getChildTextTrim("price_original") != null ? content.getChildTextTrim("price_original") : "0"));	//PRICE_ORIGINAL
		stmt.setInt(8, Integer.parseInt(content.getChildTextTrim("price_now") != null ? content.getChildTextTrim("price_now") : "0"));	//PRICE_NOW
		stmt.setInt(9, Integer.parseInt(content.getChildTextTrim("sale_percent") != null ? content.getChildTextTrim("sale_percent") : "0"));	//SALE_PERCENT
		stmt.setInt(10, Integer.parseInt(content.getChildTextTrim("sell_count") != null ? content.getChildTextTrim("sell_count") : "0"));	//SELL_COUNT
		stmt.setInt(11, Integer.parseInt(content.getChildTextTrim("count_min") != null ? content.getChildTextTrim("count_min") : "0"));	//COUNT_MIN
		stmt.setInt(12, Integer.parseInt(content.getChildTextTrim("count_max") != null ? content.getChildTextTrim("count_max") : "0"));	//COUNT_MAX
		stmt.setString(13, content.getChildTextTrim("area"));	//AREA
		stmt.setString(14, content.getChildTextTrim("category"));	//CATEGORY
		stmt.setString(15, content.getChildTextTrim("shop"));	//SHOP
		stmt.setString(16, content.getChildTextTrim("tel"));	//TEL
		stmt.setString(17, content.getChildTextTrim("addr"));	//ADDR
		stmt.setString(18, content.getChildTextTrim("latitude"));	//LATITUDE
		stmt.setString(19, content.getChildTextTrim("longitude"));	//LONGITUDE
		stmt.setString(20, content.getChildTextTrim("desc_text"));	//DESC_TEXT
		stmt.executeUpdate();
	}
	
}catch(SQLException e){
	out.println(e.getMessage());	
}catch(Exception e){
    e.printStackTrace();
}finally{
	stmt.close();
	con.close();
}


%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>TEST</title>
</head>
<body>
<%=title %>
</body>
</html>