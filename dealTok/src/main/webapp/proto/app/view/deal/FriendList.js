/**
 * Friend List
 */
Ext.define('Rnx.view.deal.FriendList', {
	extend: 'Ext.dataview.List',
	xtype: 'friendList',
	
	config: {
		title: '친구 선택',
		id: 'friendList',
		store: 'fStore',
		mode: 'MULTI',
		itemTpl: [
		   '<div><img id="test" style="height:37px;width:37px;" src="resources/images/headshots/{profile_img}"> <b>{nickname}</b> {address} </div>'
		],
		
		items:[
			{
				xtype:'toolbar',
				docked:'bottom',
				layout : {
					type : 'hbox',
					pack : 'right'
				},
				items: [
					{
						xtype: 'button',
						text: '선택 초기화',
						action: 'btn_FriendList_Reset'
					},
					{
						xtype: 'button',
						text: '선택 완료',
						action: 'btn_FriendList_Complete'
					}
				]
				
			}
		]
	}
});