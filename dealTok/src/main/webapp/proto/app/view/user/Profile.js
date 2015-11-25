/**
 * 
 */
 
Ext.define('Rnx.view.user.Profile', {
	extend : 'Ext.DataView',
	
	xtype:'profile',
	scrollable : false,
	fullscreen : true,
	config : {
		id : 'profile',
		layout : 'vbox',
		showAnimation : 'fade',
		store : 'profileStore',
		itemTpl : 
			 '<div style="margin : 10px;">'
			+	'<table width="100%" height="120px">'
			+		'<tr><td rowspan="3" width="30%" style="margin:5px;padding:6px;text-align:center;"><img width="80%" height="120px" src="'+Rnx.app.serverBaseUrl+'/proto/resources/images/headshots/{profile_img}"/></td>'
			+		'<td width="70%" style="padding:5px;background-color: #bbb;">닉네임 &nbsp; {nickname}</td></tr>'
			+		'<tr><td style="padding:5px;background-color: #bbb;">성별 &nbsp; {gender} </td></tr>'
			+		'<tr><td style="padding:5px;background-color: #bbb;">나이 &nbsp; {age}</td></tr>'
			+	'</table>'
			+ '</div>'
			+ '<div style="margin : 10px;">인사말 : {greeting}</div>'
			+ '<div style="width:100%;text-align:center;background-color:#000080;color:#fff">관심 DEAL</div>'
			+ '<div>'
			+	'<table width="100%" height="140px">'
			+		'<tr><td style="padding:5px;">지역</td><td style="padding:5px;">{area}</td></tr>'
			+		'<tr><td style="padding:5px;">판매처</td><td style="padding:5px;">{seller}</td></tr>'
			+		'<tr><td style="padding:5px;">카테고리</td><td style="padding:5px;">{category}</td></tr>'
			+	'</table>'
			+ '</div>'
		,	
		items : [{
			xtype : 'toolbar',
			docked: 'bottom',
			layout : {
				 type: 'hbox',
				 pack : 'middle'
			},
			items : [{
				text : '확인',
				id : 'btn_profile_ok',
				ui : 'confirm'
			}]
		}]
	}
});