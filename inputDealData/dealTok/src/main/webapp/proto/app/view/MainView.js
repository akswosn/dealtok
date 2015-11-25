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
							    xtype : 'button',
								id: 'main_deal_Button',
								text: 'Deal',
							    flex: 3	
							},
							
							{ 
								xtype:'spacer',
								flex: 1
							},
							
							{
								xtype:'button',
								id: 'main_tolk_Button',
								ui: 'decline', 
								text: 'Tolk',
								flex : 3
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