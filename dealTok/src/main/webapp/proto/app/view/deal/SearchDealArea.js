/**
 * 
 */
 
Ext.define('Rnx.view.deal.SearchDealArea',{
	extend: 'Ext.form.FormPanel',
	xtype: 'searchDealArea',
	
	config: {
		id: 'searchDealArea',
		items: [
			{
				xtype: 'fieldset',
				defaults: {
                    required: true,
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                instructions: '원하는 지역을 모두 Check하세요.',
                items: [
                	{
						xtype: 'checkboxfield',
						name: 'gangwon',
						label: '강원',
						value: false
					},
					{
						xtype: 'checkboxfield',
						name: 'gyeonggi',
						label: '경기',
						value: false
					},
					{
						xtype: 'checkboxfield',
						name: 'gyeongnam',
						label: '경남',
						value: false
					},
					{
						xtype: 'checkboxfield',
						name: 'gyeongbuk',
						label: '경북',
						value: false
					},
					{
						xtype: 'checkboxfield',
						name: 'gwangju',
						label: '광주',
						value: false
					},
					{
						xtype: 'checkboxfield',
						name: 'daegu',
						label: '대구',
						value: false
					},
					{
						xtype: 'checkboxfield',
						name: 'daejeon',
						label: '대전',
						value: false
					},
					{
						xtype: 'checkboxfield',
						name: 'busan',
						label: '부산',
						value: false
					},
					{
						xtype: 'checkboxfield',
						name: 'seoul',
						label: '서울',
						value: false
					},
					{
						xtype: 'checkboxfield',
						name: 'ulsan',
						label: '울산',
						value: false
					},
					{
						xtype: 'checkboxfield',
						name: 'incheon',
						label: '인천',
						value: false
					},
					{
						xtype: 'checkboxfield',
						name: 'jeonnam',
						label: '전남',
						value: false
					},
					{
						xtype: 'checkboxfield',
						name: 'jeonbuk',
						label: '전북',
						value: false
					},
					{
						xtype: 'checkboxfield',
						name: 'jeju',
						label: '제주',
						value: false
					},
					{
						xtype: 'checkboxfield',
						name: 'chungnam',
						label: '충남',
						value: false
					},
					{
						xtype: 'checkboxfield',
						name: 'chungbuk',
						label: '충북',
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
	                	action: 'btn_SearchArea_Confirm'
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
