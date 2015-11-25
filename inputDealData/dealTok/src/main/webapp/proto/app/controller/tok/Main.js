/**
 * 
 */
 
Ext.define('Rnx.controller.tok.Main',{
	extend : 'Ext.app.Controller',
	
	requires : ['Rnx.view.tok.NaviBar'],
	
	config :{
		refs:{
			mainView: 'mainView',
			tokMain : 'tokMain',
			tokMainTab : 'tokMainTab',
			tokNaviBar : 'tokNaviBar',
			tokNaviBackBtn : '#tokNaviBackBtn'
		},
		
		control :{
			tokNaviBackBtn:{
				tap : 'back'
			}
		}
	},
	
	showDetailView : function(item, target){
		
		/*var navibar = Ext.ComponentQuery.query('tokNaviBar', item)[0];
		
		if(typeof navibar === 'object'){
			navibar.setTitle(item.config.title);
		}
		
		if(typeof target !== 'undefined'){
			target.setActiveItem(item);
		}
		else{
			this.getTokMain().setActiveItem(item);
			console.log(item);
		}*/
		
		this.getMainView().getNavigationBar().setTitle(item.getTitle());
		
		console.log(this.getMainView().getNavigationBar());
		
		this.getMainView().push(item);
	},
	
	back : function(){
		this.getTokMain().setActiveItem(this.getTokMainTab());
	}
});