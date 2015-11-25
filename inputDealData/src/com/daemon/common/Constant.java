package com.daemon.common;

public class Constant {
	public static PropertyReader	pror			= PropertyReader.getInstance();	
	public static final String SAFETY_INFOMATION_PROPERTY_PATH	= "damon.properties";
	public static final String GOOGLE_GEOCODE_URL = "GOOGLE_GEOCODE_URL";
	public static final String GOOGLE_ADDR2COORD_URL = pror.getPropertyValue(GOOGLE_GEOCODE_URL);
}
