/**
 * Hot Talk List Model 
 */

Ext.define('Rnx.model.hottalk.HotTalkListModel',{
	extend : 'Ext.data.Model',
	
	config : {
		fields : [
		      {name : 'hTalkId', type : 'int'},			//pk
		      {name : 'userSeq', type : 'int'},			//userId
		      {name : 'userImg', type : 'string'},		//userIMG 경로
		      {name : 'userName', type : 'string'},		//user명
		      {name : 'content', type : 'string'},		//Hot Talk 내용
		      {name : 'regDate', type : 'string'},		//등록일
		      {name : 'dealContent', type : 'string'},	//Deal 내용
		]
	}
});