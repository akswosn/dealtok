/**
 * 
 */
 
Ext.define('Rnx.view.push.PushToolBar', {
	extend: 'Ext.Toolbar',
	xtype: 'pushToolBar',
	
	config: {
		docked: 'top',
		defaults: {
			width: '23%'
		},
		ui: 'none',
		items: [
			{
				text: 'PUSH DEAL 설정',
				action : 'btn_PushDeal_Setting'
			}
		]
	}
});