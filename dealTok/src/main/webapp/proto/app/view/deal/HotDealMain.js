/**
 * 
 */
 
Ext.define('Rnx.view.deal.HotDealMain',{
	extend: 'Ext.Panel',
	xtype: 'hotDealMain',
	config: {
		id: 'hotDealMain',
		layout : {
			type : 'card',
			
			animation : {
				type : 'slide',
				duration : 300
			}
		},
		
		items: [
			{
				xtype: 'dealToolBar'	
			},
			{
				xtype:'panel',
				id:'sortName_HotDeal',
				height : 30,
				padding : 5,
				docked : 'top',
				style: 'background-color: #5E99CC',
				items : [
					{
						html: ''
					}
				]
			},
			{
				xtype: 'hotDealList'	
			},
			{
				xtype: 'searchToolBar'	
			}
		]
	}
});