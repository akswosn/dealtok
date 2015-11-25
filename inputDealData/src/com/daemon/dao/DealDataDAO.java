package com.daemon.dao;

import java.sql.SQLException;

import org.apache.log4j.Logger;

import com.daemon.common.SqlMapBuilder;
import com.daemon.vo.DealDataVO;

public class DealDataDAO extends SqlMapBuilder {
	private static volatile DealDataDAO	m_theInstance;
	private static Logger m_traceLogger	= Logger.getLogger("TRACE");

	/**
	 * SingleTon Patten
	 * @return
	 */
	public static DealDataDAO getInstance() {
		if(m_theInstance == null){
			synchronized(DealDataDAO.class){
				if(m_theInstance == null){
					m_theInstance = new DealDataDAO();
				}
			}
		}
		
		return m_theInstance;
	}//END OF CONSTRUCTOR
	
	public void insertDealData(DealDataVO vo){
		try{
			getSqlMapClient().insert("Daemon.insertDealData", vo);
		}
		catch(SQLException e){
			m_traceLogger.error("DealDataDAO insertDealData : " + e);
		}
	}
	
	public void deleteDealData(String seller){
		try{
			getSqlMapClient().insert("Daemon.deleteDealData", seller);
		}
		catch(SQLException e){
			m_traceLogger.error("DealDataDAO deleteDealData : " + e);
		}
	}
}
