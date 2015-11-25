/**
 * Main view
 */
Ext.define('Rnx.view.MainView',{
	extend : 'Ext.navigation.View',
	
	xtype : 'mainView',
	
	stackCount : 0,
	
	config : {
		autoDestroy: false,
		
		navigationBar : {
			items : [
				{	
					xtype:'button',
					iconMask: true,
            		iconCls: 'more',
            		align:'right',
					action:'showMainSubMenu'
				}
			]
		},
		items: [
		    {
            	title : 'Oh My Coupon',
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
										id: 'btn_HotDeal',
										text: 'HOTDEAL',
										margin: '0 0 30px 0'
				    		   		},
				    		   		{
				    		   			xtype : 'button',
										id: 'btn_PushDeal',
										text: 'PUSHDEAL',
										margin: '0 0 30px 0'
				    		   		},
				    		   		{
										xtype:'button',
										id: 'main_tolk_Button',
										ui: 'decline', 
										text: 'TOK'
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