/**
 * 
 */

Ext.define('Rnx.view.Intro', {
	
	extend : 'Ext.Panel',
	xtype : 'intro',
	config : {
		fullscreen : true,
		layout : {
			type:'hbox',
			pack : 'center',
			animation: 'slide'
		},
		padding : '10px',
		items : [
		{
			xtype : 'panel',
			items : [{
				html : '<img src=\'resources/images/intro01.png\'/>'
					+'<br/><br/>'
					+'소셜커머스를<br/>'
					+'소셜하게 즐기는 방법<br/>'
					+'Deal로 만나는 Talk 광장<br/>'
					+'반값쿠폰에서 평생 인연까지<br/>'
					+'이젠 외롭지 않아... Deal Tok<br/>'
			},
			{
				xtype:'button',
				margin : '3px',
				ui : 'confirm',
				text : 'Login',
				id:'btn_login'
			},
			{
				xtype:'button',
				margin : '3px',
				ui : 'decline',
				text : 'Join',
				id:'btn_join'
			}]
		}]
	}
});