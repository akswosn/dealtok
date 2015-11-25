/**
 * 
 */
Ext.define('Rnx.view.push.PushDealList',{
	extend: 'Ext.dataview.List',
	xtype: 'pushDealList',
	
	baseURL : 'N',
	config: {
		store: 'PDStore',
		id: 'pushDealList',	
		plugins: [
            {
            	xclass: 'Ext.plugin.ListPaging',
            	loadTpl: '<div align="center"><b>&nbsp;<br>더보기<br>&nbsp;</b></div>'
            }
        ],
		itemTpl: [
			'<div><img  src="{dealImg}" width="100%"></div>',
			'<div> <table width="100%"><tr><td>{area} | {seller}</td><td align="right"><span style="color:gray;text-decoration:line-through">{price_original} 원 </span></td></tr></table> </div>',
			'<div> <table width="100%"><tr><td>{title}</td><td align="right">{price_now} 원</td></tr></table> </div>'
		]
	}
});