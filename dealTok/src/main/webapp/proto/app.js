/**
 * 
 */
var test = 5;
Ext.Loader.setConfig({
	enabled : true
});

Ext.application({
	
	name : 'Rnx',
	
	//phoneStartupScreen:  'resources/img/startup.png',
    //tabletStartupScreen: 'resources/img/startup_640.png',

    //glossOnIcon: false,
    
    /*icon: {
        57: 'resources/img/icon.png',
        72: 'resources/img/icon-72.png',
        114: 'resources/img/icon-114.png'
    },*/

    // Dependencies
	
	tokSocket : null,

    models: [
    	//Deal
    	'deal.DealModel', 'deal.FriendModel',
    	//tok
    	'hottalk.HotTalkListModel',
    	'user.UserModel'
    ],

    views: [
    	'login.Login',
    	'MainView',
    	
    	//Tolk
    	'Main',
    	'tok.Main',
    	'tok.MainTab',
    	'tok.List',
    	'tok.TokDetailCt',
    	'hottalk.List',
		'hottalk.DealList',
		'hottalk.InsertMsg',
		'user.Profile', 'user.ProfileUpdate',
    	//Deal
    	'deal.DealDetail', 'deal.FriendList', 'deal.DealMessage', 'deal.SearchToolBar',
    	'deal.HotDealMain','deal.HotDealList','deal.DealToolBar',
    	'deal.SearchDealCategory','deal.SearchDealArea','deal.SearchDealShop',
    	'push.PushDealMain','push.PushDealList','push.PushToolBar','push.PushDealSettingMain',
    	'push.PushDealCategory','push.PushDealArea','push.PushDealSeller',
    	
    	//intro, join
    	'Intro', 'login.JoinForm',
    	//친구 기능
    	'user.MyFriend','user.FriendSearch','user.FriendSearchForm','user.FriendSearchList'
    ],

    controllers: [
    	'MainController', 
    	
    	//Tolk
    	'tok.Main',
    	'tok.Tok',
    	'hottalk.HotTalk',
    	//Deal
    	'deal.DealController',
    	'user.UserController'
    ],

    stores: [
    	//Deal
    	'deal.HotDealStore', 'deal.FriendStore', 'deal.PushDealStore',
    	//tok
    	'hottalk.HotTalkListStore',
    	'user.UserStore','user.SearchFriendStore'
    	,'user.ProfileStore'
    ],

    viewport: {
        autoMaximize: true
    },
	
    loginSeq : null,
    
    loginUser : {},
    
    profileSeq : null,
    
    serverBaseUrl : '/dealTok',
    cometServerUrl : 'http://www.rionnex.com:3000/tok',
    //cometServerUrl : 'http://localhost:3000/tok',
    
    launch: function() {
    	//this.tokSocket = io.connect('http://112.220.201.202:3000/tok');
    	this.tokSocket = io.connect(this.cometServerUrl);
    	
        Ext.Viewport.add(
        	{ 
        		xtype: 'intro'
        	}
        );
    },
    
    getLoginUser : function(){
    	return this.loginUser;
    },
    
    setLoginUser : function(user){
    	this.loginSeq = user.userSeq;
    	this.loginUser = user;
    },
    
    setProfileSeq : function(profileSeq){
    	this.profileSeq = profileSeq;
    },
    getProfileSeq : function(){
    	return this.profileSeq;
    }
    
	
});