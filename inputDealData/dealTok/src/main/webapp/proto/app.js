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
		'user.MyProfile',
    	//Deal
    	'deal.DealList', 'deal.DealDetail', 'deal.FriendList', 'deal.DealMessage', 'deal.SearchToolBar', 'deal.DealMain',
    	'deal.SearchCategory','deal.SearchArea','deal.SearchShop','deal.SearchDealMain','deal.SearchDealList'
    ],

    controllers: [
    	'MainController', 
    	
    	//Tolk
    	'tok.Main',
    	'tok.Tok',
    	'hottalk.HotTalk',
    	//Deal
    	'deal.DealController'
    ],

    stores: [
    	//Deal
    	'deal.DealStore', 'deal.FriendStore', 'deal.SearchDealStore',
    	//tok
    	'hottalk.HotTalkListStore',
    	'user.UserStore'
    ],

    viewport: {
        autoMaximize: true
    },
	
    loginSeq : null,
    
    loginUser : {},
    
    serverBaseUrl : '/dealTok',
    cometServerUrl : 'http://www.rionnex.com:3000/tok',
    //cometServerUrl : 'http://localhost:3000/tok',
    
    launch: function() {
    	//this.tokSocket = io.connect('http://112.220.201.202:3000/tok');
    	this.tokSocket = io.connect(this.cometServerUrl);
    	
        Ext.Viewport.add(
        	{ 
        		//xtype: 'tokCt'
        		xtype: 'login'
        	}
        );
    },
    
    getLoginUser : function(){
    	return this.loginUser;
    },
    
    setLoginUser : function(user){
    	this.loginSeq = user.userSeq;
    	this.loginUser = user;
    }
	
});