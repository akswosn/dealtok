/**
 * 
 */
 
Ext.define('Rnx.view.deal.SearchToolBar', {
	extend: 'Ext.Toolbar',
	xtype: 'searchToolBar',
	
	config: {
		docked: 'bottom',
		defaults: {
			width: '23%'
		},
		ui: 'none',
		items: [
			{
				text: '모두보기',
				action : 'btn_SearchToolBar_All'
			},
			{
				text: '카테고리',
				action: 'btn_SearchToolBar_Category'
			},
			{
				text: '지역',
				action: 'btn_SearchToolBar_Area'
			},
			{
				text: '판매처',
				action: 'btn_SearchToolBar_Shop'
			}
		]
	}
});