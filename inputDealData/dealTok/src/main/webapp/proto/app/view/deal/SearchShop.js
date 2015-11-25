/**
 * 
 */
 
Ext.define('Rnx.view.deal.SearchShop',{
	extend: 'Ext.form.FormPanel',
	xtype: 'searchShop',
	
	config: {
		items: [
			{
				xtype: 'fieldset',
				defaults: {
                    required: true,
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                instructions: '원하는 판매처를 모두 Check하세요.',
                items: [
                	{
						xtype: 'checkboxfield',
						name: 'groupon',
						label: '구루폰',
						value: true
					},
                	{
						xtype: 'checkboxfield',
						name: 'wemakeprice',
						label: '위메프',
						value: true
					},
					{
						xtype: 'checkboxfield',
						name: 'ticketmonster',
						label: '티켓몬스터',
						value: true
					}
                ]
			},
			{
				xtype: 'toolbar',
	            docked: 'bottom',
	            defaults: {
					width: '50%'
				},
	            items: [
	                {
	                	text: '확인',
	                	id: 'btn_SearchShop_Confirm'
	                },
	                {
	                	text: '취소',
	                	id: 'btn_SearchShop_Cancel'
	                }
	            ]
			}
		]
	}
});
