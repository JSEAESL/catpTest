class UIGame extends Widget {

	public static RE_START_GAME:string = "RE_START_GAME";
	public static UPDATA:string =  "UIGame_updata";
	public static UPDATA_CAT:string =  "UIGame_updata_cat";

	public static UPDATA_CAT_Bir:string =  "UIGame_updata_cat_Bir";

	public static RE_GAME:string =  "UIGame_re_game";


	public static GAME_Win:string =  "UIGame_GAME_Win";
	public static GAME_Lose:string =  "UIGame_GAME_Lose";
	public static GAME_Cat_Lose:string = "UIGame_GAME_Cat_Lose";
	private pointList:eui.List;
	private reStartImage:eui.Image;
	private StepLabel:eui.Label
	public constructor() {
		super();
		this.skinName = "UIGame_eui"
	}

	private wayLayer:egret.DisplayObjectContainer;
	private catLayer:egret.DisplayObjectContainer

	public childrenCreated(){
		super.childrenCreated();

		this.wayLayer = new egret.DisplayObjectContainer();
		this.catLayer = new egret.DisplayObjectContainer();
		this.initCat();
		//this.initList();
		this.addChild(this.wayLayer)
		this.addChild(this.catLayer)
		this.addEvent();
		this.initGame();

		// let gProxy = <mx.GameModelProxy><any>(this.facade.retrieveProxy(GameModelProxy.NAME));
		// GameModel.Ins.updataCat();
		//console.log("childrenCreated");
		//this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.GameStart,this)
	}

	// private initList():void
	// {
	// 	this.pointList.itemRenderer = WayPointItemRenderer;
	// 	this.pointList.dataProvider = new eui.ArrayCollection([]);
	// }


	private cat:Cat
	private cat1:Cat
	private CatList:Cat[];
	private initCat():void
	{
		this.CatList = [];
		this.cat = new Cat(0);
		this.cat1 = new Cat(1);
		this.CatList.push(this.cat);
		this.CatList.push(this.cat1);	
	}


	private addEvent():void
	{
		// GlobalDispatcher.Ins.addEventListener(UIGame.UPDATA,this.UpdataData,this);
		// GlobalDispatcher.Ins.addEventListener(UIGame.UPDATA_CAT,this.UpdataCat,this);
		// GlobalDispatcher.Ins.addEventListener(UIGame.UPDATA_CAT_Bir,this.UpdataCatBir,this);

		// GlobalDispatcher.Ins.addEventListener(UIGame.GAME_Cat_Lose,this.catLose,this);
		// GlobalDispatcher.Ins.addEventListener(UIGame.GAME_Win,this.showWin,this);
		// GlobalDispatcher.Ins.addEventListener(UIGame.GAME_Lose,this.showLose,this);
		this.reStartImage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reStarGame,this)
	}

	private removeEvent():void
	{
		// GlobalDispatcher.Ins.removeEventListener(UIGame.UPDATA,this.UpdataData,this);
		// GlobalDispatcher.Ins.removeEventListener(UIGame.UPDATA_CAT,this.UpdataCat,this);
		// GlobalDispatcher.Ins.removeEventListener(UIGame.GAME_Win,this.showWin,this);
		// GlobalDispatcher.Ins.removeEventListener(UIGame.GAME_Lose,this.showLose,this);
		this.reStartImage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.reStarGame,this)
	}


	private catLose(e:CommonEvent):void
	{
		var cat = this.getCurrCat(e.data);
		cat.toWeiZhu();
	}

	private showWin(e:CommonEvent):void
	{
		this.removeEvent();
		var data:ResultData = e.data;
		SceneUtil.getInstance().showUIResult(data);
	}

	private showLose(e:CommonEvent):void
	{
		this.removeEvent();
		var data:ResultData = e.data;
		SceneUtil.getInstance().showUIResult(data);
	}

	private reStarGame(e:egret.TouchEvent):void
	{
		//GameModel.Ins.reSetData();
		this.removeEvent();
		this.addEvent();
		this.initGame();
		//GameModel.Ins.updataCat();
	}


	private UpdataCat(e:CommonEvent):void
	{
		var pointdata:WayPointData = e.data;
		let offx:number = pointdata.j%2==0?22:0;
		var ccc:Cat = this.getCurrCat(pointdata.catIndex);
		ccc.x =pointdata.i*45 + this.pointList.x + offx;
		ccc.y =pointdata.j*45 + this.pointList.y;
		this.catLayer.addChild(ccc);
	}

	public getCurrCat(index:number):Cat
	{
		return this.CatList[index];
	}
	
	private UpdataCatBir(e:CommonEvent):void
	{
		var pointdata:WayPointData = e.data;
		let offx:number = pointdata.j%2==0?22:0;
		var ccc:Cat = this.getCurrCat(pointdata.catIndex);
		ccc.x =pointdata.i*45 + this.pointList.x + offx;
		ccc.y =pointdata.j*45 + this.pointList.y;
		this.catLayer.addChild(ccc);

		this.removeEvent();
		var endY:number =  ccc.y
		ccc.y  = 0;
        var tw = egret.Tween.get( ccc ).call(this.onComplete, this);
        tw.to( {y:endY}, 1000 );
	}

	private onComplete():void
	{  
		this.addEvent();
	}

	private initGame(e:any = null):void
	{
		//let data:CustomMap =  GameModel.Ins.reSetData();
		//console.log();
		//var dataMax:number = GameModel.Ins.pointMax;
		var vo:WayPointData;
		//console.log("dataMax" + dataMax);
		//this.StepLabel.text = GameModel.Ins.nowStep + "";
		// for (var i:number = 0;i<dataMax;i++)
		// {
		// 	//vo = data.get(i);
		// 	this.updataPoint(vo);
		// }
		//this.cellList.dataProvider = new eui.ArrayCollection([]);
		this.cat.reStart();
		this.cat1.reStart();
	}

	private UIList:Object = new Object();
	private updataPoint(vo:WayPointData):void
	{
		var point:UIWayPoint
		if(!this.UIList.hasOwnProperty(vo.index + ""))
		{
			point= new UIWayPoint();
			let offx:number = vo.j%2==0?22:0;
			point.x =vo.i*45 + this.pointList.x + offx;
			point.y =vo.j*45 + this.pointList.y;
			this.UIList[vo.index] = point;
			this.wayLayer.addChild(point);
		}else
		{
			point = this.UIList[vo.index];
		}
		//console.log("com" );
		point.upData(vo);
	}


	private UpdataData(e:CommonEvent):void
	{
		//this.StepLabel.text = GameModel.Ins.nowStep + "";
		var data:WayPointData = e.data;
		this.updataPoint(data);
	}

}