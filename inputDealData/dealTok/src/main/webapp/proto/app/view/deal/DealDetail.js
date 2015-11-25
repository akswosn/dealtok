/**
 * Deal Detail
 */
Ext.define('Rnx.view.deal.DealDetail', {
	extend: 'Ext.Panel',
	xtype: 'dealDetail',
	fullscreen : true,
	config: {
		title : '상품 상세정보',
		layout: 'vbox',
		items: [
		    {
		    	xtype : 'list',
		    	items : [
	    	         {
	    	        	 id: 'dealName',
	    			    	tpl: [
	    			    	      /*
	    			    	      '<div style="text-align:center"> {title} </div>',
	    			    	      '<div style="text-align:center"> <img  src="{dealImg}"> </div>',
	    			    	      '<div style="text-align:center"> {content} </div>'
	    			    	       * */
	    			    	      '<table height="50%">',
	    			    	      '<tr style="width:100%;background-color:#fff">',
	    			    	      '<td width="33%"> [ {seller} ] </td> <td colspan="2">{title}</td></tr>',
	    			    	      '<tr><td colspan="3" align="center"> <img src="{dealImg}" width="100%"> </td></tr>',
	    			    	      '<tr style="background-color:#777"><td colspan="3" align="center">{time_end}</td></tr>',
	    			    	      '<tr style="background-color:#fff"><td colspan="2">{sell_count} 명 구매 </td><td align="right"> <span style="color:gray;text-decoration:line-through">{price_original} 원 </span> {price_now} 원 </td></tr>',
	    			    	      '<tr style="background-color:#999"><td>지역</td> <td width="33%">{area}</td><td align="right">  </td></tr>',
	    			    	      '</table>'
	    			    	]
	    	         }
		    	],
		    	flex: 4
			},
			
			{
				items: [
				    {
				    	layout: {
				    		type: 'hbox',
				    		pack: 'center'
				    	},
				    	items: [
				    	    {
						    	xtype: 'spacer',
						    	flex: 1
						    },
					    	{
						    	xtype: 'button',
						    	id: 'btn_DealDetail_DealTok',
						    	text: 'DEAL TALK',
						    	flex: 3
						    },
						    {
						    	xtype: 'spacer',
						    	flex: 1
						    }
				    	]
					}
				]
			}
		],
		
		record: null,
		map : null,
		infoWindow : null,
		sharedPopup : null
	},
	updateRecord: function(newRecord) {
		if(newRecord)
		{
			this.down('#dealName').setData(newRecord.data);
		}
	},
	initialize : function() {
		this.map = Ext.create('Ext.Map',{
			iconCls: 'locate',
			layout: 'vbox',
			showAnimation: {
				type:'pop',
				duration : 500
			},
			hidden : true,
			flex : 4
		});
		
		
		this.sharedPopup =  Ext.create('Ext.Panel', {
             centered : true,
             modal:true,
             hideOnMaskTap:true,
             showAnimation: {
 				type:'pop',
 				duration : 500
 			 },
        	items : [{
        		xtype : 'button',
        		text : '트위터',
        		ui : 'confirm',
        		id : 'btn_Shared_Twitter'
        	},{
        		xtype : 'button',
        		text : '페이스북',
        		ui : 'action',
        		id : 'btn_Shared_Facebook'
        	}]
		});
		
		var toolbar = Ext.create('Ext.Toolbar',{
			layout: {
				pack : 'center'
			},
			items : [
		       {
		    	   xtype : 'button',
		    	   text : '상세보기',
		    	   id : 'btn_DealDetail_Detail'
		       },
		       {
		    	   xtype : 'button',
		    	   text : '리뷰보기',
		    	   id : 'btn_DealDetail_Review'
		       },
		       /* 지원 안됨
		       {
		    	   xtype : 'button',
		    	   text : '전화걸기' 
		       },
		        * */
		       {
		    	   xtype : 'button',
		    	   text  : '공유하기',
		    	   id : 'btn_DealDetail_Shared'
		       },
		       {
		    	   xtype : 'button',
		    	   text  : '지도보기',
		    	   id : 'btn_DealDetail_Map'
		       }
			]
		});
		this.infoWindow = new google.maps.InfoWindow({
			content : '위도 경도 정보가 없습니다.',
			size: new google.maps.Size(10,3) 
		});
		this.add(this.map);
		this.add(toolbar);
		
	},
	show : function(){
		if(!this.latitude){
			this.latitude = 0;
		}
		if(!this.longitude){
			this.longitude = 0;
		}
		var mapView = this.map;
		//좌표변경
		var position = new google.maps.LatLng(this.latitude, this.longitude), marker;
		var alertWindow = this.infoWindow;
		this.callParent();
		
		mapView.setMapOptions({
			center: position,
			zoom : 16,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
		});
		
		marker = new google.maps.Marker({
	        position: position,
	        map: mapView.getMap(),
	        visible: true
		});
		
		if(this.latitude == 0 && this.longitude == 0){
			alertWindow.setPosition(position);
			alertWindow.open(mapView.getMap());
		}
		
		setTimeout(function() {
			mapView.getMap().panTo(position);
        }, 2000);
	}
	
});