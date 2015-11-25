/**
 * 
 */
 
Ext.define('Rnx.view.deal.DealToolBar', {
	extend: 'Ext.Toolbar',
	xtype: 'dealToolBar',
	
	config: {
		docked: 'top',
		defaults: {
			width: '49%'
		},
		ui: 'none',
		items: [
			{
				text: '최신순',
				action : 'btn_DealToolBar_Latest'
			},
			{
				text: '인기순',
				action: 'btn_DealToolBar_Popularity'
			}
		]
	}
});