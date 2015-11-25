/*
 * com.rnx.common.CommFilter
 *
 * Created on 2012. 3. 23.
 * 
 * Copyright (c) 2010 RionNex Co., Ltd. All Rights Reserved.
 */
package com.rnx.common;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

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

public class CommFilter implements Filter
{

	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
		// TODO Auto-generated method stub
		
		HttpServletResponse response = (HttpServletResponse)res;
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
		
		chain.doFilter(req, res);
		
	}

	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub
		
	}
	
}
