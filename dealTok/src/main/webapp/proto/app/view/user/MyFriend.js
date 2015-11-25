/**
 * 
 */
Ext.define('Rnx.view.user.MyFriend', {
	extend : 'Ext.Panel',
	
	xtype:'myFriend',
	fullscreen : true,
	config : {
		layout: {
			type:'vbox'
		},
		showAnimation: {
			type:'slide'
		},
		items : [{
			xtype : 'toolbar',
			layout : {
				 type: 'hbox',
				 align : 'left'
			},
			items : [{
				xtype : 'panel',
				html : '<div style="font-weight:bold;color:white;">친구 관리</div>'
			}],
			styleHtmlContent: true
		},{
			xtype : 'panel',
			layout: {
				type:'hbox'
			},
			items : [{ 
				xtype:'spacer'
			},{
				xtype : 'button',
				text : '친구찾기',
				action : 'friendSearchForm'
			}]
		},{
			xtype : 'toolbar',
			layout : {
				 type: 'hbox'
			},
			items : [{
				xtype : 'panel',
				html : '<div style="font-weight:bold;color:white;">내친구들</div>'
			}],
			styleHtmlContent: true
		},{
            xtype: 'panel',
            layout : {
				 type: 'hbox'
			},
			defaults: {
			     required: true,
			     labelAlign: 'left',
			     labelWidth: '20%'
			},
        	items: [{
                xtype: 'searchfield',
                placeHolder: '친구이름...',
                label : '친구명 검색',
                width : '80%',
                id : 'searchMyFriend_field'
            }]
        },
        {
        	xtype : 'panel',
        	html : '<hr/>'
        }],
        friendStore : null,
		friendList : null
	},
	initialize : function(){
		this.friendStore = Ext.create('Ext.data.Store',{
			model : 'Rnx.model.user.UserModel',
			proxy:{
				type:'ajax',
				url : Rnx.app.serverBaseUrl + '/rnxApi/user/friendList/' + Rnx.app.loginSeq,
				reader:{
					type:'json',
					rootProperty:'friendList'
				}
			},
			autoLoad : false
		});
		
		this.friendList = Ext.create('Ext.dataview.List',{
			xtype : 'myFriendList',
			id: 'myFriendList',
        	store : this.friendStore,
        	itemTpl : '<div><img style="height:50px;width:50px;" src="'+Rnx.app.serverBaseUrl+'/proto/resources/images/headshots/{userImg}"> &nbsp {nickName}</div>',
        	flex : 1
		});
		
		//this.friendList.addListener( 'itemtap', this.friendProfile);
	},
	show : function(){
		this.friendStore.load();
		this.callParent();
		var index = this.getItems().length;
		this.insert(index, this.friendList);
	}
	
});