/**
 * 
 */
 
Ext.define('Rnx.view.deal.SearchArea',{
	extend: 'Ext.form.FormPanel',
	xtype: 'searchArea',
	
	config: {
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
						value: true
					},
					{
						xtype: 'checkboxfield',
						name: 'gyeonggi',
						label: '경기',
						value: true
					},
					{
						xtype: 'checkboxfield',
						name: 'gyeongnam',
						label: '경남',
						value: true
					},
					{
						xtype: 'checkboxfield',
						name: 'gyeongbuk',
						label: '경북',
						value: true
					},
					{
						xtype: 'checkboxfield',
						name: 'gwangju',
						label: '광주',
						value: true
					},
					{
						xtype: 'checkboxfield',
						name: 'daegu',
						label: '대구',
						value: true
					},
					{
						xtype: 'checkboxfield',
						name: 'daejeon',
						label: '대전',
						value: true
					},
					{
						xtype: 'checkboxfield',
						name: 'busan',
						label: '부산',
						value: true
					},
					{
						xtype: 'checkboxfield',
						name: 'seoul',
						label: '서울',
						value: true
					},
					{
						xtype: 'checkboxfield',
						name: 'ulsan',
						label: '울산',
						value: true
					},
					{
						xtype: 'checkboxfield',
						name: 'incheon',
						label: '인천',
						value: true
					},
					{
						xtype: 'checkboxfield',
						name: 'jeonnam',
						label: '전남',
						value: true
					},
					{
						xtype: 'checkboxfield',
						name: 'jeonbuk',
						label: '전북',
						value: true
					},
					{
						xtype: 'checkboxfield',
						name: 'jeju',
						label: '제주',
						value: true
					},
					{
						xtype: 'checkboxfield',
						name: 'chungnam',
						label: '충남',
						value: true
					},
					{
						xtype: 'checkboxfield',
						name: 'chungbuk',
						label: '충북',
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
	                	id: 'btn_SearchArea_Confirm'
	                },
	                {
	                	text: '취소',
	                	id: 'btn_SearchArea_Cancel'
	                }
	            ]
			}
		]
	}
});
