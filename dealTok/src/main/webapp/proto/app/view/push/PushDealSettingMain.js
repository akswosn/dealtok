/**
 * 
 */
 
Ext.define('Rnx.view.push.PushDealSettingMain',{
	extend: 'Ext.Panel',
	xtype: 'pushDealSettingMain',
	config: {
		id: 'pushDealSettingMain',
		layout : {
			type : 'card',
			
			animation : {
				type : 'slide',
				duration : 300
			}
		},
		
		items: [
			{
				title : 'PushDeal 설정',
				xtype: 'panel',
				layout: {
					type : 'vbox',
					pack : 'center'
				},
				items: [
				     {
			    	   xtype: 'panel',
				    	   
			    	   layout:
			    	   {
			    		   type : 'hbox'
		    		   },
		    		   items: [
		    		       	{ 
		    		    	   xtype:'spacer',
		    		    	   flex: 1
		    		       	},
		    		       	{
		    		       		xtype: 'panel',
		    		       		flex: 1,
		    		       		layout:
		    		       		{
		    		       			type: 'vbox'
		    		       		},
		    		       		items: [
			    		       		{
				    		   			xtype : 'button',
										id: 'btn_PushDeal_Category',
										text: '카테고리',
										margin: '0 0 30px 0'
				    		   		},
				    		   		{
				    		   			xtype : 'button',
										id: 'btn_PushDeal_Area',
										text: '지역',
										margin: '0 0 30px 0'
				    		   		},
				    		   		{
										xtype:'button',
										id: 'btn_PushDeal_Seller', 
										text: '판매처',
										margin: '0 0 30px 0'
									},
				    		   		{
										xtype:'button',
										id: 'btn_PushDeal_apply',
										ui: 'decline', 
										text: '적 용'
									}
		    		       		]
		    		       	},
							{ 
								xtype:'spacer',
								flex: 1
							}
						]
				    }
				]
			}
		]
	}
});