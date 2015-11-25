/**
 * 
 */
 
Ext.define('Rnx.view.tok.NaviBar', {
	extend : 'Ext.Toolbar',
	
	xtype : 'tokNaviBar',
	
	config : {
		
		title : 'qwer',
		
		items : [{
			id : 'tokNaviBackBtn',
			xtype:'button',
			ui : 'back',
			text : 'Back'
		}]
	}
});