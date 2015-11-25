package com.daemon.common;

import java.io.Reader;

import org.apache.log4j.Logger;

import com.ibatis.common.resources.Resources;
import com.ibatis.sqlmap.client.SqlMapClient;
import com.ibatis.sqlmap.client.SqlMapClientBuilder;
import com.ibatis.sqlmap.engine.impl.SqlMapClientImpl;
import com.ibatis.sqlmap.engine.mapping.sql.Sql;
import com.ibatis.sqlmap.engine.mapping.statement.MappedStatement;
import com.ibatis.sqlmap.engine.scope.RequestScope;

public abstract class SqlMapBuilder {
	
	private volatile static SqlMapClient sqlMap;
	
	private static Logger m_traceLogger = Logger.getLogger("TRACE");
	
	private final static String SQL_MAP_CONFIG_RESOURCE ="sqlmap-config.xml";
	
	public SqlMapBuilder(){}
	
	public static SqlMapClient getSqlMapClient(){
		if(sqlMap == null){
			synchronized(SqlMapBuilder.class){
				if(sqlMap == null){
					try{
						Reader reader = Resources.getResourceAsReader(SQL_MAP_CONFIG_RESOURCE);
						sqlMap = SqlMapClientBuilder.buildSqlMapClient(reader);
					}catch(Exception e){
						m_traceLogger.fatal(e.getMessage());
					}
				}
			}
		}
		return sqlMap;
	}
	
	protected String getQuery(String statemetId, Object parameter, SqlMapClient sqlMapClient){
		String	query	= null;
		Sql		sql		= null;
		
		try{
			SqlMapClientImpl	sqlMapClientImpl	=  (SqlMapClientImpl)sqlMapClient;
			MappedStatement		mappedStatement		= sqlMapClientImpl.getMappedStatement(statemetId);
	
			if(mappedStatement != null){
				RequestScope request = new RequestScope();
				mappedStatement.initRequest(request);
	
				sql = mappedStatement.getSql();
				if(sql != null){
					query = sql.getSql(request, parameter);
				}
			}
		}catch(Exception e){
			m_traceLogger.error(e.getMessage());
		}

		return query;
	}

	protected void printQuery(String statemetId, Object parameter, SqlMapClient sqlMapClient){
		String query = getQuery(statemetId, parameter, sqlMapClient);
		
		m_traceLogger.error("-----------------------------------------------------------------");
		m_traceLogger.error("Query : " + query);
		m_traceLogger.error("Parameters : " + parameter.toString());
		m_traceLogger.error("-----------------------------------------------------------------");
	}
	
	protected void printQuery(String statemetId, Object parameter){
		printQuery(statemetId, parameter, sqlMap);
	}
	
	
	protected void printQuery(String statemetId, SqlMapClient sqlMapClient){
		String query = getQuery(statemetId, null, sqlMapClient);

		m_traceLogger.error("-----------------------------------------------------------------");
		m_traceLogger.error("Query : " + query);
		m_traceLogger.error("-----------------------------------------------------------------");
	}
	
	protected void printQuery(String statemetId){
		printQuery(statemetId, sqlMap);
	}
}
