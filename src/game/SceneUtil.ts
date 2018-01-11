class SceneUtil {
	private static _instance:SceneUtil = null;
	private _currentUi:Widget;
	private _root:egret.DisplayObjectContainer;
	private showUIList:Array<Widget> = [];


	//单例
	public static getInstance():SceneUtil
	{
		if(this._instance == null)
		{
			this._instance = new SceneUtil();
		}
		return this._instance;
	}

	public constructor() {
		//egret.startTick(this.onTicker, this);
	}

	public setCurrentRoot(dim:egret.DisplayObjectContainer):void
	{
		this._root = dim;
	}

	//得到当前的ui
	public getCurrentUi():Widget
	{
		return this._currentUi;
	}

	public goGame():void
	{
		this.showUi(new UIGame());
	}

	public goLoginUi():void
	{
		if(RES.isGroupLoaded("loginui"))
		{
			this.showUi(new UILogin());
		}else
		{
			this.loadOnlyLoadGroup("loginui",()=>{ 
				this.showUi(new UILogin());
			 })
		}
	}

	public showUIResult(reData:ResultData):void
	{
		var ui:UIResult = new UIResult();
		this.addUi(ui);
		ui.setResultData(reData);
		ui.playGroup();
	}

	public addUi(ui:Widget,part:egret.DisplayObjectContainer = null):void
	{
		this.showUIList.push(ui);
		if(!part)
		{
			part  = this._root; 
		}
		part.addChild(ui);
	}

	public removeUi(ui:Widget):void
	{
		var index:number = this.showUIList.indexOf(ui);
		this.showUIList.splice(index,1);
		if(null != ui.parent)
		{
			ui.parent.removeChild(ui);
		}
		ui.disponse();
	}


	//移除当前ui
	private removeCurrUi():void
	{
		if(this._currentUi != null)
		{
			this._currentUi.parent.removeChild(this._currentUi);
			this._currentUi.disponse();
		}
	}
	
	public showUi(ui:Widget):void
	{
		this.removeCurrUi();
		this._currentUi = ui;
		this._root.addChild(this._currentUi);
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

}