class AppMain {
	public constructor() {
	}
	private static _ins:AppMain;

	private root:egret.DisplayObjectContainer;

	public static Start( _root:egret.DisplayObjectContainer):void
	{	
		if(null == this._ins)
		{
			this._ins = new AppMain();
		}
		this._ins.root = _root;
		this._ins.start();
	}


	private loadOnlyLoadGroup(n,loadEndCall:Function = null):void
	{
		ResUtils.getInstance().loadGroupWithPro(n, 
		()=>{ 
			if(loadEndCall != null)
			{
				loadEndCall.call(this);
			}
		}, 
		null,
		this);
	}

	private start() 
	{	
		//old Enter
		//GameConfig.stage
		// SceneUtil.getInstance().setCurrentRoot(this.root)
        // SceneUtil.getInstance().goLoginUi();
		
		//new Enter
		if(RES.isGroupLoaded("loginui"))
		{
			this.initApp();
		}else
		{
			this.loadOnlyLoadGroup("loginui",()=>{ 
				this.initApp();
			 })
		}
	}

	private initApp():void
	{
		//初始化UIStage
		console.log("initApp");
        let appContainer: mx.AppContainer = new mx.AppContainer();
        GameConfig.stage.addChild(appContainer);
        //初始化MVC结构
        mx.ApplicationFacade.getInstance().startUp(appContainer);
	}

	
}