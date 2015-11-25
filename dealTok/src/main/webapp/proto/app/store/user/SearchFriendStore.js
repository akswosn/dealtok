/**
 * Hot Talk List Store 
 */

Ext.define('Rnx.store.user.SearchFriendStore',{
	extend : 'Ext.data.Store',
	xtype : 'friendSearchStore',
	
	config : {
		storeId : 'friendSearchStore',
		fields: [ 
			{name : 'userSeq', type : 'int'},		//user��ȣ
			{name : 'uid', type : 'string'},		//user ���̵�
			{name : 'phone', type : 'string'},		//����ȣ
			{name : 'age', type : 'int'},			//����
			{name : 'gender', type : 'string'},		//����
			{name : 'nickName', type : 'string'},	//����
			{name : 'passwd', type : 'string'},		//��й�ȣ
			{name : 'userImg', type : 'string'},	//�̹��� ���ϸ�
			{name : 'address', type : 'string'},	//�ּ�
			{name : 'isFriend', type : 'string'},	//ģ������
		],
		proxy : {
			type: 'ajax',
			url : Rnx.app.serverBaseUrl + '/rnxApi/user/friendSearch/',
			reader: {
			    type: 'json',
			    rootProperty: 'friendSearch'
			}
		},
		autoload : false
	}
});
