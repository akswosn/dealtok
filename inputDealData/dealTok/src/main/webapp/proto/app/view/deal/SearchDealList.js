/**
 * 
 */
Ext.define('Rnx.view.deal.SearchDealList',{
	extend: 'Ext.dataview.List',
	xtype: 'searchDealList',
	
	baseURL : 'N',
	
	config: {
		store: 'SDStore',
		id: 'searchDealList',	
		plugins: [
            { xclass: 'Ext.plugin.ListPaging' }
        ],
		itemTpl: [
			'<div><img  src="{dealImg}" width="100%"></div>',
			'<div> <table width="100%"><tr><td>{area} | {seller}</td><td align="right">{price_original}</td></tr></table> </div>',
			'<div> <table width="100%"><tr><td>{title}</td><td align="right">{price_now}</td></tr></table> </div>'
		]
	}
});