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
	    			    	      '<table>',
	    			    	      '<tr height="30px"><td> [ {seller} ] </td> <td colspan="2"> &nbsp; {title}</td></tr>',
	    			    	      '<tr height="30px"><td width="35%" align="center" rowspan="5"> <img src="{dealImg}" width="100%" height="150px"> </td>',
	    			    	      '<td width="35%"> &nbsp; 원가격</td><td width="30%">할인가격</td></tr>',
	    			    	      '<tr height="30px"><td> &nbsp; <span style="color:#999999">{price_original}</span></td><td><b style="color:red;font-weight;bold">[ {sale_percent}% ]</b> <span style="color:#999999">{price_now}</span></td></tr>',
	    			    	      '<tr height="30px"><td> &nbsp; 현재구매수</td><td><span style="color:#999999">{sell_count}</span></td></tr>',
	    			    	      '<tr height="30px"><td> &nbsp; 지역</td><td><span style="color:#999999">{area}</span></td></tr>',
	    			    	      '<tr height="30px"><td> &nbsp; 카테고리</td><td><span style="color:#999999">{category}</span></td></tr>',
	    			    	      '<tr><td>판매시작</td><td colspan="2"> <span style="color:#999999">{time_start}</span></td></tr>',
	    			    	      '<tr><td>판매종료</td><td colspan="2"> <span style="color:#999999">{time_end}</span></td></tr>',
	    			    	      '<tr><td colspan="3">판매 가능 최소 수량 : <span style="color:#999999">{count_min}</span></td></tr>',
	    			    	      '<tr><td colspan="3">판매 가능 최대 수량 : <span style="color:#999999">{count_max}</span></td></tr>',
	    			    	      '<tr><td colspan="3">판매처 : <span style="color:#999999">{seller}</span></td></tr>',
	    			    	      '<tr><td colspan="3">주소 : <span style="color:#999999">{addr}</span></td></tr>',
	    			    	      '<tr><td colspan="3">연락처 : <span style="color:#999999">{tel}</span></td></tr>',
	    			    	      '</table>'
	    			    	]
	    	         }
		    	],
		    	flex: 4
			},
			
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
			items : [{
		    	  xtype: 'button',
		    	  id: 'btn_DealDetail_DealTok',
		    	  text: 'TOK'
		       },{
		    	   xtype : 'button',
		    	   text : '상세',
		    	   id : 'btn_DealDetail_Detail'
		       },
		       {
		    	   xtype : 'button',
		    	   text : '리뷰',
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
		    	   text  : '공유',
		    	   id : 'btn_DealDetail_Shared'
		       },
		       {
		    	   xtype : 'button',
		    	   text  : '지도',
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