/**
 * 
 */
 
Ext.define('Rnx.view.tok.List', {
	extend : 'Ext.dataview.List',
	
	xtype : 'tokList',
	
	config : {
		
		store : Ext.create('Ext.data.Store', {
			fields : [ 'summary', 'tokGroupId', 'modifiedTime', 'profileImg', 'nickName', 'dealImg', 'dealSummary' 
			           , 'title', 'price_now', 'price_original', 'sale_percent', 'addr'],
			
			proxy:{
				type:'ajax',
				url : Rnx.app.serverBaseUrl + '/rnxApi/tok/tokGroupList',
				reader:{
					type:'json',
					rootProperty:'list'
				}
			},
			
			autoLoad : false
		}),
		
		itemTpl : '<table cellspacing="0" cellpadding="0" width="100%">' +
				'<tr><td width="100"><img height="80px" width="80px" src="resources/images/headshots/{profileImg}"/></td>' +
				'<td style="valign:top;">' +
				'	<div style="padding:5px; font-weight:bold; font-size:13px; border-bottom:solid 1px black;">{nickName}</div>' +
				'	<div style="padding:5px; font-size:12px;"><p class="tok-msg-div">{summary}</p></div>' +
				'	<div style="padding:5px; font-size:14px; border-top:solid 1px black;"><p class="cdate">{modifiedTime}</p></div>' +
				'</td>' +
				'</tr>' +
				'</table>' + 
				'<div style="padding:5px; font-size:14px; background-color:grey;">Deal : {dealSummary}</div>' 
	}
});