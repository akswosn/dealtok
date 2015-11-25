/**
 * 
 */
 
Ext.define('Rnx.view.tok.TokDetailCt', {
	extend : 'Ext.Panel',
	
	xtype : 'tokDetailCt',
	
	requires : ['Rnx.view.tok.NaviBar'],
	
	config : {
		
		title : null,
		
		tokItem : {},
		
		layout : 'vbox',
		scrollable:true,
		
		
		items : [
			/*{
				xtype : 'tokNaviBar',
				docked : 'top'
			},*/
			{
				xtype : 'panel',
				id :'dealDetail',
				hidden : true,
				docked:'top',
				//height : 200,
				items:[
					{
						xtype : 'panel',
						id : 'dealItem',
						html : 'Deal 영역..'
						
					},
					{
						xtype : 'panel',
						layout: 'hbox',
						docked:'bottom',
						
						scrollable : {
			                direction: 'horizontal',
			                directionLock: true
			            },
			            
			            items : [
			            	{
								xtype: 'listitemheader',
								cls : 'rnx-item-header',
								html: '대화 참여자'
							},
							{
								xtype:'panel',
								layout: 'hbox',
								id : 'userImgPanel',
								items:[
					            	/*{ html : '<img src="http://sstatic.naver.net/people/28/20071005181335197040222.jpg" width="70" height="70"/>&nbsp;' },
					            	{ html : '<img src="http://sstatic.naver.net/people/28/20071005181335197040222.jpg" width="70" height="70"/>&nbsp;' },
					            	{ html : '<img src="http://sstatic.naver.net/people/28/20071005181335197040222.jpg" width="70" height="70"/>&nbsp;' },
					            	{ html : '<img src="http://sstatic.naver.net/people/28/20071005181335197040222.jpg" width="70" height="70"/>&nbsp;' },
					            	{ html : '<img src="http://sstatic.naver.net/people/28/20071005181335197040222.jpg" width="70" height="70"/>&nbsp;' },
					            	{ html : '<img src="http://sstatic.naver.net/people/28/20071005181335197040222.jpg" width="70" height="70"/>&nbsp;' },
					            	{ html : '<img src="http://sstatic.naver.net/people/28/20071005181335197040222.jpg" width="70" height="70"/>&nbsp;' },
					            	{ html : '<img src="http://sstatic.naver.net/people/28/20071005181335197040222.jpg" width="70" height="70"/>&nbsp;' },
					            	{ html : '<img src="http://sstatic.naver.net/people/28/20071005181335197040222.jpg" width="70" height="70"/>&nbsp;' },
					            	{ html : '<img src="http://sstatic.naver.net/people/28/20071005181335197040222.jpg" width="70" height="70"/>&nbsp;' },
					            	{ html : '<img src="http://sstatic.naver.net/people/28/20071005181335197040222.jpg" width="70" height="70"/>&nbsp;' },
					            	{ html : '<img src="http://sstatic.naver.net/people/28/20071005181335197040222.jpg" width="70" height="70"/>&nbsp;' },
					            	{ html : '<img src="http://sstatic.naver.net/people/28/20071005181335197040222.jpg" width="70" height="70"/>&nbsp;' },
					            	{ html : '<img src="http://sstatic.naver.net/people/28/20071005181335197040222.jpg" width="70" height="70"/>&nbsp;' },
					            	{ html : '<img src="http://sstatic.naver.net/people/28/20071005181335197040222.jpg" width="70" height="70"/>&nbsp;' }*/
								]
							}
		          		],
							
						//style: 'background-color: #759E60',
						height : 95
					}
				]
			},
			{ 
				xtype:'button',
				text : 'more',
				docked:'top',
				action : 'toggleDetailInfo'
			},
			{
				xtype: 'listitemheader',
				cls : 'rnx-item-header',
				docked:'top',
				html: 'TokList'
			},
			{
				xtype : 'list',
				title :'Toklist',
				id :'tokList',
				scrollable:false,
				store : Ext.create('Ext.data.Store',{
					fields : [
						'profileImg', 'message', 'createTime', 'userSeq', 'nickName'
					],
					proxy:{
						type:'ajax',
						url : ' ',
						reader:{
							type:'json',
							rootProperty:'list'
						}
					},
					
					autoLoad : false
				}),
				
				itemTpl : ''
			},
			{
				xtype:'panel',
				id : 'msgFieldPanel',
				layout:'fit',
				docked:'bottom',
				height:50,
				items:[
					{
						xtype:'formpanel',
						height:50,
						padding:3,
						layout:{
							type:'hbox'
						},
						items:[
							{
								xtype:'textareafield',
								id : 'tokMsgField',
								name:'message',
								style:'background-color:#4BB2B6;',
								width: '100%'
							},
							{
								xtype:'button',
								docked:'right',
								action:'sendTok',
								iconMask:true,
								iconCls:'chat4'
							}
						]
					}
				]
			}
		]
	}
})