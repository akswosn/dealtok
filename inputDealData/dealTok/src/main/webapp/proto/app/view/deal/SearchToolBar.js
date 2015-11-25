/**
 * 
 */
 
Ext.define('Rnx.view.deal.SearchToolBar', {
	extend: 'Ext.Toolbar',
	xtype: 'searchToolBar',
	
	config: {
		docked: 'bottom',
		defaults: {
			width: '25%'
		},
		items: [
			{
				text: '모두보기',
				id: 'btn_SearchToolBar_All'
			},
			{
				text: '카테고리',
				id: 'btn_SearchToolBar_Category'
			},
			{
				text: '지역',
				id: 'btn_SearchToolBar_Area'
			},
			{
				text: '판매처',
				id: 'btn_SearchToolBar_Shop'
			}
		]
	}
});