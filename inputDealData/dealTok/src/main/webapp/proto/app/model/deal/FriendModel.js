/**
 * Friend Model
 */
Ext.define('Rnx.model.deal.FriendModel', {
	extend: 'Ext.data.Model',
	
	config: {
		fields: [
            'friend_seq',
			'age',
			'nickname',
			'address',
			'profiel_img',
			'phone',
			'gender'
		]
	}
})