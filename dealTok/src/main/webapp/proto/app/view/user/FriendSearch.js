/**
 * 
 */
Ext.define('Rnx.view.user.FriendSearch', {
	extend : 'Ext.Panel',
	
	xtype:'friendSearch',
	fullscreen : true,
	config : {
		showAnimation: {
			type:'slide'
		},
		layout : {
			 type: 'fit'
		},
		items : [{
			xtype : 'toolbar',
			docked: 'top',
			html : '<div style="font-weight:bold;color:white;">친구찾기</div>',
			styleHtmlContent: true
		}],
		searchForm : null
	},
	initialize : function(){
		this.searchForm = Ext.create('Rnx.view.user.FriendSearchForm');
		
	},
	show : function(){
		this.callParent();
		var index = this.getItems().length;
		
		this.insert(index, this.searchForm);
	}
});