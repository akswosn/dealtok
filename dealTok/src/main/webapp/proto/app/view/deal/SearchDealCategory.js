/**
 * 
 */
 
Ext.define('Rnx.view.deal.SearchDealCategory',{
	extend: 'Ext.form.Panel',
	xtype: 'searchDealCategory',
	
	config: {
		id: 'searchDealCategory',
		items: [
			{
				xtype: 'fieldset',
				defaults: {
                    required: true,
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                instructions: '원하는 카테고리를 모두 Check하세요.',
                items: [
                	{
						xtype: 'checkboxfield',
						name: 'health',
						label: '건강/레저',
						value: false
					},
                	{
						xtype: 'checkboxfield',
						name: 'culture',
						label: '공연/전시/문화',
						value: false
					},
					{
						xtype: 'checkboxfield',
						name: 'education',
						label: '교육/취미',
						value: false
					},
					{
						xtype: 'checkboxfield',
						name: 'food',
						label: '맛집/카페',
						value: false
					},
					{
						xtype: 'checkboxfield',
						name: 'online',
						label: '모바일/온라인',
						value: false
					},
					{
						xtype: 'checkboxfield',
						name: 'life',
						label: '뷰티/생활',
						value: false
					},
					{
						xtype: 'checkboxfield',
						name: 'travel',
						label: '여행/숙박',
						value: false
					},
					{
						xtype: 'checkboxfield',
						name: 'event',
						label: '이벤트/기타',
						value: false
					},
					{
						xtype: 'checkboxfield',
						name: 'party',
						label: '주점/파티',
						value: false
					}
                ]
			},
			{
				xtype: 'toolbar',
	            docked: 'bottom',
	            defaults: {
					width: '49%'
				},
	            items: [
	                {
	                	text: '확인',
	                	action: 'btn_SearchCategory_Confirm'
	                },
	                {
	                	text: '취소',
	                	action: 'btn_Cancel'
	                }
	            ]
			}
		]
	}
});
