/**
 * Deal Controller
 */
Ext.define('Rnx.controller.deal.DealController', {
	extend: 'Ext.app.Controller',
	config: {
		refs: {
			mainView: 'mainView',
			dealList: 'dealList',
			
			//button
			btn_HotDeal: '#btn_HotDeal',
			btn_PushDeal: '#btn_PushDeal',
			btn_PushDeal_Category: '#btn_PushDeal_Category',
			btn_PushDeal_Area: '#btn_PushDeal_Area',
			btn_PushDeal_Seller: '#btn_PushDeal_Seller',
			btn_PushDeal_apply: '#btn_PushDeal_apply',
			btn_DealDetail_DealTok: 'dealDetail #btn_DealDetail_DealTok',
			btn_DealDetail_Detail: 'dealDetail #btn_DealDetail_Detail',
			btn_DealDetail_Review: 'dealDetail #btn_DealDetail_Review',
			btn_DealDetail_Shared: 'dealDetail #btn_DealDetail_Shared',
			btn_DealDetail_Map: 'dealDetail #btn_DealDetail_Map',
			btn_DealMessage_Send: 'dealMessage #btn_DealMessage_Send',
			btn_Shared_Twitter : '#btn_Shared_Twitter',
			btn_Shared_Facebook : '#btn_Shared_Facebook'
		},
		control: {
			hotDealList: {
				initialize:function(list){
					if(!this.hotDealStore){
						this.hotDealStore = list.getStore();
						this.hotDealStore.on("beforeload", 
							function(store, oper){
								if(list.baseURL != 'N'){
									store.getProxy().setUrl(list.baseURL + store.getCount() + '/' + 5);	
								}	
							}
						);
					}
				},
				itemtap: 'onDealSelect'
			},
			pushDealList: {
				initialize:function(list){
					if(!this.pushDealStore){
						this.pushDealStore = list.getStore();
						this.pushDealStore.on("beforeload", 
							function(store, oper){
								if(list.baseURL != 'N'){
									store.getProxy().setUrl(list.baseURL + store.getCount() + '/' + 5);	
								}	
							}
						);
					}
				},
				itemtap: 'onDealSelect'
			},
			btn_HotDeal: {tap: 'onDealList_Latest'},
			btn_PushDeal: {tap: 'onPushDealList'},
			btn_PushDeal_apply: {tap: 'onPushDealApply'},
			btn_PushDeal_Category: {tap:'onPushDeal_Category'},
			btn_PushDeal_Area: {tap:'onPushDeal_Area'},
			btn_PushDeal_Seller: {tap:'onPushDeal_Seller'},
			btn_DealDetail_DealTok: {tap: 'onFriendList'},
			btn_DealMessage_Send: {tap: 'sendMsg'},
			btn_DealDetail_Detail : {tap: 'onDetailBtn'},
			btn_DealDetail_Review : {tap: 'onReviewBtn'},
			btn_DealDetail_Shared : {tap: 'onSharedBtn'},
			btn_DealDetail_Map : {tap: 'onMapBtn'},
			btn_Shared_Facebook: {tap: 'onSharedFacebook'},
			btn_Shared_Twitter: {tap: 'onSharedTwitter'},
			'button[action="btn_DealToolBar_Latest"]': {tap:'onDealList_Latest'},
			'button[action="btn_DealToolBar_Popularity"]': {tap:'onDealList_Popularity'},
			'button[action="btn_SearchToolBar_All"]': {tap: 'onDealListAll'},
			'button[action="btn_SearchToolBar_Category"]': {tap: 'onSearchCategory'},
			'button[action="btn_SearchToolBar_Area"]': {tap: 'onSearchArea'},
			'button[action="btn_SearchToolBar_Shop"]': {tap: 'onSearchShop'},
			'button[action="btn_SearchCategory_Confirm"]': {tap: 'onCategoryList'},
			'button[action="btn_SearchArea_Confirm"]': {tap: 'onAreaList'},
			'button[action="btn_SearchShop_Confirm"]': {tap: 'onShopList'},
			'button[action="btn_FriendList_Complete"]': {tap:'onFriendSelect'},
			'button[action="btn_FriendList_Reset"]': {tap:'deSelectFriend'},
			'button[action="btn_PushDeal_Setting"]': {tap:'onPushDealSettingMain'},
			'button[action="btn_PushDealCategory_Confirm"]': {tap:'setPushDeal_Category'},
			'button[action="btn_PushDealArea_Confirm"]': {tap:'setPushDeal_Area'},
			'button[action="btn_PushDealSeller_Confirm"]': {tap:'setPushDeal_Seller'},
			'button[action="btn_Cancel"]': {tap: 'onBack'}
		}
	},
	//선택한 Deal 상세화면을 보여준다.
	onDealSelect: function(list, index, node, record) {
		if(!this.dealDetail) {
			this.dealDetail = Ext.create('Rnx.view.deal.DealDetail');
		}
		this.dealDetail.latitude = record.get('latitude');
		this.dealDetail.longitude = record.get('longitude');
		this.dealDetail.config.dealDid =  record.get('did');
		this.dealDetail.setRecord(record);
		this.getMainView().push(this.dealDetail);
	},
	//Deal Tolk 친구 선택 화면을 보여준다.
	onFriendList: function() {
		Ext.Ajax.request({
			url: Rnx.app.serverBaseUrl + '/rnxApi/deal/friendList/' + Rnx.app.loginSeq,
			success: function(response, opts) {
				var JsonData = JSON.parse(response.responseText);
				this.friendStore = new Ext.data.Store({data: JsonData.list});
				Ext.getCmp('friendList').setStore(this.friendStore);
			}
		});
		if(!this.friendList) {
			this.friendList = Ext.create('Rnx.view.deal.FriendList');
		}
		this.getMainView().push(this.friendList);
	},
	//선택한 Friend에게 보낼 메세지 작성화면을 보여준다.
	onFriendSelect: function() {
		var selectRecords = this.friendList.getSelection();
		var friends_seq = "";
		var friends_name = "";
		var friends_phone = "";
		
		Ext.Array.each(selectRecords, function(friend, idx, friendList){
			if(idx > 0) {
				friends_seq += ',';
				friends_name += ',';
				friends_phone += ';';
			}
			friends_seq += friend.get('friend_seq'); 
			friends_name += friend.get('nickname');
			friends_phone += friend.get('phone');
		});
		this.dealMessage = Ext.create('Rnx.view.deal.DealMessage', {
			listeners:{
				deactivate:function(form){
					form.destroy();
				}
			}
		});
		this.dealMessage.config.friend_seq = friends_seq;
		this.dealMessage.config.friends_phone = friends_phone;
		this.dealMessage.setRecord(friends_name);
		Ext.getCmp('msgBody').setTitle(friends_name+'에게..');
		this.getMainView().push(this.dealMessage);
	},
	//친구목록 초기화
	deSelectFriend: function() {this.friendList.deselectAll();},
	//메세지를 보내고 Deal 상세화면을 보여준다.
	sendMsg: function() {
		var friends_phone = this.dealMessage.config.friends_phone;
		var msg = escape(encodeURIComponent(Ext.getCmp("deal_msg").getValue()));
		Ext.Msg.confirm('확인','메세지를 보내겠습니까?', function(btn){
			if(btn=='yes'){
				Ext.Ajax.request({
					url: Rnx.app.serverBaseUrl + '/rnxApi/deal/sendMsg/' + Rnx.app.loginSeq + '/' 
					+ this.dealMessage.config.friend_seq + '/' + this.dealDetail.config.dealDid + '/' + Ext.getCmp("deal_msg").getValue(),
					scope:this,
					success: function(response, opts) {
						window.open(Rnx.app.serverBaseUrl+'/proto/sendSMS.jsp?phone='+friends_phone+'&msg='+msg, 'SMS 발송','scrollbars=yes,toolbar=yes,resizable=yes');
						Ext.Msg.alert('성공','메세지를 보냈습니다.');
						this.getMainView().pop(2);
					},
					failure: function(response, opts) {
						Ext.Msg.alert('성공','메세지를 보내는데 실패했습니다.');
					}
				});	
			}
		}, this);
	},
	//Deal Detail 상세보기
	onDetailBtn : function(e){
		var link = this.dealDetail.getRecord().get('link')
		window.open('moveToCommerce.jsp?link='+escape(link),'new','scrollbars=yes,toolbar=yes,resizable=yes');
	},
	onReviewBtn : function(){
		var title = this.dealDetail.getRecord().get('title');
		window.open('http://cafeblog.search.naver.com/search.naver?where=post&sm=tab_jum&ie=utf8&query='+title,'new','scrollbars=yes,toolbar=yes,resizable=yes');
	},
	onSharedBtn : function(e){this.dealDetail.sharedPopup.showBy(e);},
	onMapBtn : function(btn){
		if(this.dealDetail.map.getHidden()){
			btn.setText('지도닫기');
			this.dealDetail.map.setHidden(false);
		}else{
			btn.setText('지도보기');
			this.dealDetail.map.setHidden(true);
		}
	},
	onSharedFacebook : function(e){
		var link = this.dealDetail.getRecord().get('link');
		var title = this.dealDetail.getRecord().get('title');
		var dealImg = this.dealDetail.getRecord().get('dealImg');
		/* 모바일 사용 안됨
		var url = 'http://www.facebook.com/share.php?s=100&p[url]='+encodeURIComponent(link)
			+'&p[images][0]='+encodeURIComponent(dealImg)
			+'&p[title]='+encodeURIComponent('DealTok ' + title)
			+'target="_blank"';
		 * */
		var url = 'http://www.facebook.com/share.php?u='+encodeURIComponent(link)
			+'&amp;t='+encodeURIComponent('DealTok-'+title)
			+'&amp;i='+encodeURIComponent(dealImg)
			+'&amp;d=DealTok';
		window.open(url, 'facebook', 'new', 'scrollbars=yes,toolbar=yes,resizable=yes');
	},
	onSharedTwitter : function(e){
		var link = this.dealDetail.getRecord().get('link');
		var title = this.dealDetail.getRecord().get('title');
		var url = 'https://twitter.com/share?url='+encodeURIComponent(link) 
			+ '&text='+ encodeURIComponent('DealTok '+title, 'new', 'scrollbars=yes,toolbar=yes,resizable=yes');
		window.open(url, 'twitter');
	},
	//Category 검색화면을 보여준다.
	onSearchCategory : function(){
		if(!this.searchCategory){
			this.searchCategory = Ext.create('Rnx.view.deal.SearchDealCategory', {title : '카테고리 검색'});	
		}else{
			this.getMainView().remove(this.searchCategory);
		}
		if(this.getMainView().kind == 'category'){
			this.getMainView().push(this.searchCategory);
		}else{
			this.getMainView().push(this.searchCategory.reset());
		}
	},
	//지역 검색화면을 보여준다.
	onSearchArea : function(){
		if(!this.searchArea){
			this.searchArea = Ext.create('Rnx.view.deal.SearchDealArea', {title : '지역 검색'});	
		}else{
			this.getMainView().remove(this.searchArea);
		}
		if(this.getMainView().kind == 'area'){
			this.getMainView().push(this.searchArea);
		}else{
			this.getMainView().push(this.searchArea.reset());
		}
	},
	//판매처 검색화면을 보여준다.
	onSearchShop : function(){
		if(!this.searchShop){
			this.searchShop = Ext.create('Rnx.view.deal.SearchDealShop', {title : '판매처 검색'});
		}else{
			this.getMainView().remove(this.searchShop);
		}
		if(this.getMainView().kind == 'shop'){
			this.getMainView().push(this.searchShop);
		}else{
			this.getMainView().push(this.searchShop.reset());
		}
	},	
	//모두보기 목록화면을 보여준다.
	onDealListAll : function() {
		this.getMainView().kind = '';
		var searchDealList = this.hotDealMain.down('#hotDealList');
		searchDealList.baseURL = Rnx.app.serverBaseUrl + '/rnxApi/deal/hotDeal/' + this.getMainView().sort + '/';
		searchDealList.getStore().removeAll();
		searchDealList.getStore().load();
		this.hotDealMain.down('#sortName_HotDeal').setItems(
			{html: this.getMainView().sortName + ' - 모두보기'}
		);
	},
	//최신순 DEAL 목록화면을 보여준다.
	onDealList_Latest : function() {
		this.getMainView().kind = '';
		if(!this.hotDealMain) {
			this.hotDealMain = Ext.create('Rnx.view.deal.HotDealMain', {title : 'HOT DEAL'});
		}
		this.getMainView().sortName = '최신순';
		this.getMainView().sort = 'latest';
		var searchDealList = this.hotDealMain.down('#hotDealList');
		searchDealList.baseURL = Rnx.app.serverBaseUrl + '/rnxApi/deal/hotDeal/' + this.getMainView().sort + '/';
		searchDealList.getStore().removeAll();
		searchDealList.getStore().load();
		this.hotDealMain.down('#sortName_HotDeal').setItems({html: '최신순 - 모두보기'});
		this.getMainView().push(this.hotDealMain);
	},
	//인기순 DEAL 목록화면을 보여준다.
	onDealList_Popularity: function(list, idx, target, record) {
		this.getMainView().kind = '';
		this.getMainView().sortName = '인기순';
		this.getMainView().sort = 'popularity';
		var searchDealList = this.hotDealMain.down('#hotDealList');
		searchDealList.baseURL = Rnx.app.serverBaseUrl + '/rnxApi/deal/hotDeal/' + this.getMainView().sort + '/';
		searchDealList.getStore().removeAll();
		searchDealList.getStore().load();
		this.hotDealMain.down('#sortName_HotDeal').setItems({html: '인기순 - 모두보기'});		
	},
	//카테고리 목록화면을 보여준다.
	onCategoryList : function() {
		this.getMainView().kind = 'category';
		var formValues = this.searchCategory.getValues();
		var searchDealList = this.hotDealMain.down('#hotDealList');
		searchDealList.baseURL = Rnx.app.serverBaseUrl + '/rnxApi/deal/searchDealList/'
			+formValues.health
			+'/'+formValues.culture
			+'/'+formValues.education
			+'/'+formValues.food
			+'/'+formValues.online
			+'/'+formValues.life
			+'/'+formValues.travel
			+'/'+formValues.event
			+'/'+formValues.party
			+'/'+ this.getMainView().sort + '/';
		searchDealList.getStore().removeAll();
		searchDealList.getStore().load();
		this.hotDealMain.down('#sortName_HotDeal').setItems({html: this.getMainView().sortName + ' - 카테고리 검색'});
		this.getMainView().pop();
	},
	//지역 목록화면을 보여준다.
	onAreaList : function() {
		this.getMainView().kind = 'area';
		var formValues = this.searchArea.getValues();
		var searchDealList = this.hotDealMain.down('#hotDealList');
		searchDealList.baseURL = Rnx.app.serverBaseUrl + '/rnxApi/deal/searchDealList/'
			+formValues.gangwon
			+'/'+formValues.gyeonggi
			+'/'+formValues.gyeongnam
			+'/'+formValues.gyeongbuk
			+'/'+formValues.gwangju
			+'/'+formValues.daegu
			+'/'+formValues.daejeon
			+'/'+formValues.busan
			+'/'+formValues.seoul
			+'/'+formValues.ulsan
			+'/'+formValues.incheon
			+'/'+formValues.jeonnam
			+'/'+formValues.jeonbuk
			+'/'+formValues.jeju
			+'/'+formValues.chungnam
			+'/'+formValues.chungbuk
			+'/'+ this.getMainView().sort + '/';
		searchDealList.getStore().removeAll();
		searchDealList.getStore().load();
		this.hotDealMain.down('#sortName_HotDeal').setItems({html: this.getMainView().sortName + ' - 지역 검색'});
		this.getMainView().pop();
	},
	//판매처 목록화면을 보여준다.
	onShopList : function() {
		this.getMainView().kind = 'shop';
		var formValues = this.searchShop.getValues();
		var searchDealList = this.hotDealMain.down('#hotDealList');
		searchDealList.baseURL = Rnx.app.serverBaseUrl + '/rnxApi/deal/searchDealList/'
			+formValues.wemakeprice
			+'/'+formValues.coupang
			+'/'+formValues.ticketmonster
			+'/'+formValues.stylecoupons
			+'/'+formValues.groupon
			+'/'+formValues.ilgongil
			+'/'+formValues.daylect
			+'/'+formValues.nowshop
			+'/'+formValues.chanuri
			+'/'+formValues.tboom
			+'/' + this.getMainView().sort + '/';
		searchDealList.getStore().removeAll();
		searchDealList.getStore().load();
		this.hotDealMain.down('#sortName_HotDeal').setItems({html: this.getMainView().sortName + ' - 판매처 검색'});
		this.getMainView().pop();
	},
	//PushDeal 목록화면을 보여준다.
	onPushDealList : function() {
		if(!this.pushDealMain) {
			this.pushDealMain = Ext.create('Rnx.view.push.PushDealMain', {title : 'PUSH DEAL'});
		}
		var pushDealList = this.pushDealMain.down('#pushDealList');
		pushDealList.baseURL = Rnx.app.serverBaseUrl + '/rnxApi/deal/pushDeal/' + Rnx.app.loginSeq + '/';
		pushDealList.getStore().removeAll();
		pushDealList.getStore().load();
		this.getMainView().push(this.pushDealMain);
	},
	//PushDeal 설정 Main
	onPushDealSettingMain:  function() {
		if(!this.pushDealSettingMain){
			this.pushDealSettingMain = Ext.create('Rnx.view.push.PushDealSettingMain');
		}
		this.getMainView().push(this.pushDealSettingMain);
	},
	//PushDeal Category 설정화면을 보여준다.
	onPushDeal_Category : function(){
		if(!this.pushDealCategory){
			this.pushDealCategory = Ext.create('Rnx.view.push.PushDealCategory', {title : 'PUSH DEAL - 카테고리 설정'});	
		}else{
			this.getMainView().remove(this.pushDealCategory.reset());
		}
		Ext.Ajax.request({
			url: Rnx.app.serverBaseUrl + '/rnxApi/deal/pushDealInfo/' + Rnx.app.loginSeq + '/category',
			success: function(response, opts) {
				var JsonData = JSON.parse(response.responseText);
				for(var i=0; i<JsonData.info.length; i++){
					if(JsonData.info[i].second_kind == '건강/레저'){Ext.getCmp('health').check();}
					if(JsonData.info[i].second_kind == '공연/전시/문화'){Ext.getCmp('culture').check();}
					if(JsonData.info[i].second_kind == '교육/취미'){Ext.getCmp('education').check();}
					if(JsonData.info[i].second_kind == '맛집/카페'){Ext.getCmp('food').check();}
					if(JsonData.info[i].second_kind == '모바일/온라인'){Ext.getCmp('online').check();}
					if(JsonData.info[i].second_kind == '뷰티/생활'){Ext.getCmp('life').check();}
					if(JsonData.info[i].second_kind == '여행/숙박'){Ext.getCmp('travel').check();}
					if(JsonData.info[i].second_kind == '이벤트/기타'){Ext.getCmp('event').check();}
					if(JsonData.info[i].second_kind == '주점/파티'){Ext.getCmp('party').check();}
				}
			}
		});
		this.getMainView().push(this.pushDealCategory);
	},
	//PushDeal Area 설정화면을 보여준다.
	onPushDeal_Area : function(){
		if(!this.pushDealArea){
			this.pushDealArea = Ext.create('Rnx.view.push.PushDealArea', {title : 'PUSH DEAL - 지역 설정'});	
		}else{
			this.getMainView().remove(this.pushDealArea.reset());
		}
		Ext.Ajax.request({
			url: Rnx.app.serverBaseUrl + '/rnxApi/deal/pushDealInfo/' + Rnx.app.loginSeq + '/area',
			success: function(response, opts) {
				var JsonData = JSON.parse(response.responseText);
				for(var i=0; i<JsonData.info.length; i++){
					if(JsonData.info[i].second_kind == '강원'){Ext.getCmp('gangwon').check();}
					if(JsonData.info[i].second_kind == '경기'){Ext.getCmp('gyeonggi').check();}
					if(JsonData.info[i].second_kind == '경남'){Ext.getCmp('gyeongnam').check();}
					if(JsonData.info[i].second_kind == '경북'){Ext.getCmp('gyeongbuk').check();}
					if(JsonData.info[i].second_kind == '광주'){Ext.getCmp('gwangju').check();}
					if(JsonData.info[i].second_kind == '대구'){Ext.getCmp('daegu').check();}
					if(JsonData.info[i].second_kind == '대전'){Ext.getCmp('daejeon').check();}
					if(JsonData.info[i].second_kind == '부산'){Ext.getCmp('busan').check();}
					if(JsonData.info[i].second_kind == '서울'){Ext.getCmp('seoul').check();}
					if(JsonData.info[i].second_kind == '울산'){Ext.getCmp('ulsan').check();}
					if(JsonData.info[i].second_kind == '인천'){Ext.getCmp('incheon').check();}
					if(JsonData.info[i].second_kind == '전남'){Ext.getCmp('jeonnam').check();}
					if(JsonData.info[i].second_kind == '전북'){Ext.getCmp('jeonbuk').check();}
					if(JsonData.info[i].second_kind == '제주'){Ext.getCmp('jeju').check();}
					if(JsonData.info[i].second_kind == '충남'){Ext.getCmp('chungnam').check();}
					if(JsonData.info[i].second_kind == '충북'){Ext.getCmp('chungbuk').check();}
				}
			}
		});
		this.getMainView().push(this.pushDealArea);
	},
	//PushDeal Sellery 설정화면을 보여준다.
	onPushDeal_Seller : function(){
		if(!this.pushDealSeller){
			this.pushDealSeller = Ext.create('Rnx.view.push.PushDealSeller', {title : 'PUSH DEAL - 판매자 설정'});	
		}else{
			this.getMainView().remove(this.pushDealSeller.reset());
		}
		Ext.Ajax.request({
			url: Rnx.app.serverBaseUrl + '/rnxApi/deal/pushDealInfo/' + Rnx.app.loginSeq + '/seller',
			success: function(response, opts) {
				var JsonData = JSON.parse(response.responseText);
				for(var i=0; i<JsonData.info.length; i++){
					if(JsonData.info[i].second_kind == '위메프'){Ext.getCmp('wemakeprice').check();}
					if(JsonData.info[i].second_kind == '쿠팡'){Ext.getCmp('coupang').check();}
					if(JsonData.info[i].second_kind == '티켓몬스터'){Ext.getCmp('ticketmonster').check();}
					if(JsonData.info[i].second_kind == '스타일쿠폰'){Ext.getCmp('stylecoupons').check();}
					if(JsonData.info[i].second_kind == '그루폰'){Ext.getCmp('groupon').check();}
					if(JsonData.info[i].second_kind == '일공일'){Ext.getCmp('ilgongil').check();}
					if(JsonData.info[i].second_kind == '데이렉트닷컴'){Ext.getCmp('daylect').check();}
					if(JsonData.info[i].second_kind == '지금샵'){Ext.getCmp('nowshop').check();}
					if(JsonData.info[i].second_kind == '차누리'){Ext.getCmp('chanuri').check();}
					if(JsonData.info[i].second_kind == '티붐'){Ext.getCmp('tboom').check();}
				}
			}
		});
		this.getMainView().push(this.pushDealSeller);
	},
	//PushDeal Category 설정 저장
	setPushDeal_Category: function() {
		var formValues = this.pushDealCategory.getValues();
		Ext.Msg.confirm('확인','설정 내용을 저장하시겠습니까?', function(btn){
			if(btn=='yes'){
				Ext.Ajax.request({
					url: Rnx.app.serverBaseUrl + '/rnxApi/deal/pushDeal/category/'
					+formValues.health
					+'/'+formValues.culture
					+'/'+formValues.education
					+'/'+formValues.food
					+'/'+formValues.online
					+'/'+formValues.life
					+'/'+formValues.travel
					+'/'+formValues.event
					+'/'+formValues.party
					+'/'+ Rnx.app.loginSeq + '/',
					scope:this,
					success: function(response, opts) {
						Ext.Msg.alert('성공','PUSH DEAL설정을 저장하였습니다.');
						this.getMainView().pop();
					},
					failure: function(response, opts) {
						Ext.Msg.alert('성공','PUSH DEAL설정을 실패했습니다. 관리자에게 문의하시기 바랍니다.');
					}
				});	
			}
		}, this);
	},
	//PushDeal Area 설정 저장
	setPushDeal_Area: function() {
		var formValues = this.pushDealArea.getValues();
		Ext.Msg.confirm('확인','설정 내용을 저장하시겠습니까?', function(btn){
			if(btn=='yes'){
				Ext.Ajax.request({
					url: Rnx.app.serverBaseUrl + '/rnxApi/deal/pushDeal/area/'
					+formValues.gangwon
					+'/'+formValues.gyeonggi
					+'/'+formValues.gyeongnam
					+'/'+formValues.gyeongbuk
					+'/'+formValues.gwangju
					+'/'+formValues.daegu
					+'/'+formValues.daejeon
					+'/'+formValues.busan
					+'/'+formValues.seoul
					+'/'+formValues.ulsan
					+'/'+formValues.incheon
					+'/'+formValues.jeonnam
					+'/'+formValues.jeonbuk
					+'/'+formValues.jeju
					+'/'+formValues.chungnam
					+'/'+formValues.chungbuk
					+'/'+Rnx.app.loginSeq + '/',
					scope:this,
					success: function(response, opts) {
						Ext.Msg.alert('성공','PUSH DEAL설정을 저장하였습니다.');
						this.getMainView().pop();
					},
					failure: function(response, opts) {
						Ext.Msg.alert('성공','PUSH DEAL설정을 실패했습니다. 관리자에게 문의하시기 바랍니다.');
					}
				});	
			}
		}, this);
	},
	//PushDeal Seller 설정 저장
	setPushDeal_Seller: function() {
		var formValues = this.pushDealSeller.getValues();
		Ext.Msg.confirm('확인','설정 내용을 저장하시겠습니까?', function(btn){
			if(btn=='yes'){
				Ext.Ajax.request({
					url: Rnx.app.serverBaseUrl + '/rnxApi/deal/pushDeal/seller/'
					+formValues.wemakeprice
					+'/'+formValues.coupang
					+'/'+formValues.ticketmonster
					+'/'+formValues.stylecoupons
					+'/'+formValues.groupon
					+'/'+formValues.ilgongil
					+'/'+formValues.daylect
					+'/'+formValues.nowshop
					+'/'+formValues.chanuri
					+'/'+formValues.tboom
					+'/'+Rnx.app.loginSeq + '/',
					scope:this,
					success: function(response, opts) {
						Ext.Msg.alert('성공','PUSH DEAL설정을 저장하였습니다.');
						this.getMainView().pop();
					},
					failure: function(response, opts) {
						Ext.Msg.alert('성공','PUSH DEAL설정을 실패했습니다. 관리자에게 문의하시기 바랍니다.');
					}
				});	
			}
		}, this);
	},
	//PushDeal 설적 적용, 목록화면을 보여준다.
	onPushDealApply: function() {
		var pushDealList = this.pushDealMain.down('#pushDealList');
		pushDealList.baseURL = Rnx.app.serverBaseUrl + '/rnxApi/deal/pushDeal/' + Rnx.app.loginSeq + '/';
		pushDealList.getStore().removeAll();
		pushDealList.getStore().load();
		this.getMainView().push(this.pushDealMain);
		this.getMainView().pop();
	},
	onBack : function(){this.getMainView().pop();}
});
	