class GameModel {

// 	private catPoint:WayPointData;
// 	private catPoint1:WayPointData;

// 	public endPoints:WayPointData[] = [];

// 	public endPoint:WayPointData;

// 	private pointData:CustomMap
// 	private static _Ins:GameModel = null
// 	public pointMax:number = 0;
	public static h:number = 9;
	public static w:number = 9;
// 	// public static catDefIndex:number = 40;
// 	// public static catDefX:number = 5;
// 	// public static carDefY:number = 5;
// 	public CatWayData:WayPointData;
// 	public CatWay1Data:WayPointData;

// 	public UIList:Object = new Object();

// 	public static get Ins():GameModel
// 	{
// 		if(null == this._Ins)
// 		{
// 			this._Ins = new GameModel() 
// 		}
// 		return this._Ins;
// 	}

// 	public constructor() 
// 	{
// 		this.pointData = new CustomMap(); 
// 		this.pointMax = 0;
// 		for(var i:number = GameModel.h;i>0;i--)
// 		{
// 			for(var j:number = GameModel.w;j>0;j--)
// 			{
// 				var data:WayPointData = WayPointData.creatData(this.pointMax,i,j);
// 				this.pointData.add(this.pointMax,data)
// 				this.pointData.add(i + "_" + j,data);
// 				if(i==1 || j==9 || i==9 || j==1)
// 				{
// 					this.endPoints.push(data);
// 				}
// 				// if(i == 1 && j  == 5)
// 				// {
// 				// 	this.endPoint = data;
// 				// }
// 				this.pointMax++
// 			}
// 		}
// 		this.initCatData();
// 		this.addEvent();
// 	}

// 	private initCatData():void
// 	{
//  		this.CatWayData = WayPointData.creatData(40,5,5);
//  		this.CatWayData.catIndex = 0;
// 		this.CatWay1Data = WayPointData.creatData(31,6,5);
// 		this.CatWay1Data.catIndex = 1;
// 	}

// 	private addEvent():void
// 	{
// 	    // var facade = mx.ApplicationFacade.getInstance();
//         // facade.sendNotification(UIWayPoint.POINT_CLICK);
// 		GlobalDispatcher.Ins.addEventListener(UIWayPoint.POINT_CLICK,this.UpdataData,this);
// 	}

// 	public nowStep:number = 0;

// 	private lastIndex:number = -1
// 	private UpdataData(e:CommonEvent):void
// 	{
// 		this.nowStep = this.nowStep + 1;
// 		var data:WayPointData = e.data;
// 		data.clickState();
// 		this.pointData.update(this.pointMax,data);
// 		this.pointData.update(data.i + "_" + data.j,data);

// 		 var facade = mx.ApplicationFacade.getInstance();
//         facade.sendNotification(UIGame.UPDATA,new CommonEvent(UIGame.UPDATA,data));
// 		//GlobalDispatcher.Ins.dispatchEvent(new CommonEvent(UIGame.UPDATA,data));
// 		var d:number[] = this.star.initPath(this);
// 		if(null == d)
// 		{
// 			d = this.star.CanMove(this);
// 			if(null == d)
// 			{
// 				var winData:ResultData = ResultData.creatData(true,this.nowStep);
// 				if(this.lastIndex!=-1)
// 				{
// 					var facade = mx.ApplicationFacade.getInstance();
//         			facade.sendNotification(UIGame.GAME_Win,new CommonEvent(UIGame.GAME_Win,winData));
// 					//GlobalDispatcher.Ins.dispatchEvent(new CommonEvent(UIGame.GAME_Win,winData));
// 				}else(this.lastIndex == -1);
// 				{
// 					this.lastIndex = this.nowStep + 1;
// 					d = this.star.CanMove(this);
// 					if(null == d)
// 					{
// 						winData = ResultData.creatData(true,this.nowStep);
// 						if(this.lastIndex!=-1)
// 						{
// 							var facade = mx.ApplicationFacade.getInstance();
//         					facade.sendNotification(UIGame.GAME_Win,new CommonEvent(UIGame.GAME_Win,winData));
// 							//GlobalDispatcher.Ins.dispatchEvent(new CommonEvent(UIGame.GAME_Win,winData));
// 						}
// 					}
// 				}
// 				return 
// 			}else
// 			{
// 				var facade = mx.ApplicationFacade.getInstance();
//         		facade.sendNotification(UIGame.GAME_Cat_Lose,new CommonEvent(UIGame.GAME_Cat_Lose,this.currCatIndex));
// 				//GlobalDispatcher.Ins.dispatchEvent(new CommonEvent(UIGame.GAME_Cat_Lose,this.currCatIndex));
// 			} 
// 		}
		
// 		var nowPoint:WayPointData;
// 		if(this.currCatIndex == 0)
// 		{
// 			this.catPoint = WayPointData.creatData(40,d[1],d[2]);
// 			nowPoint =  this.catPoint;
// 		}else
// 		{
// 			this.catPoint1 = WayPointData.creatData(40,d[1],d[2]);
// 			nowPoint =  this.catPoint1;
// 		}
// 		nowPoint.catIndex  = this.currCatIndex;
// 		console.log("this.currCatIndex:" + nowPoint.catIndex);
// 		console.log("this.i:" + nowPoint.i);
// 		console.log("this.j:" + nowPoint.j);

// 		var facade = mx.ApplicationFacade.getInstance();
//         facade.sendNotification(UIGame.UPDATA_CAT,new CommonEvent(UIGame.UPDATA_CAT,nowPoint));
// 		//GlobalDispatcher.Ins.dispatchEvent(new CommonEvent(UIGame.UPDATA_CAT,nowPoint));

// 		if(d[2] == 9 || d[1] == 1 || d[1] == 9 || d[2] == 1 )
// 		{
// 			var loseData:ResultData = ResultData.creatData(false,this.nowStep);

// 			var facade = mx.ApplicationFacade.getInstance();
//         	facade.sendNotification(UIGame.GAME_Lose,new CommonEvent(UIGame.GAME_Lose,loseData));
// 			//GlobalDispatcher.Ins.dispatchEvent(new CommonEvent(UIGame.GAME_Lose,loseData));
// 		}
// 	}
// 	public get currCatIndex():number
// 	{
// 		if(this.lastIndex>0)
// 		{
// 			return this.lastIndex%2
// 		}
// 		return this.nowStep%2;
// 	}

// 	public get currCatPoint():WayPointData
// 	{
// 		if(this.currCatIndex == 0)
// 		{
// 			return this.catPoint;
// 		}
// 		return this.catPoint1;
// 	}

// 	public get otherCatPoint():WayPointData
// 	{
// 		if(this.currCatIndex == 0)
// 		{
// 			return this.catPoint1;
// 		}
// 		return this.catPoint;
// 	}

// 	private minHasNum:number = 7;
// 	private maxHasNum:number = 11;
// 	public reSetData():CustomMap
// 	{		
// 		this.nowStep = 0;
// 		this.lastIndex = -1
// 		this.catPoint = null
// 		this.catPoint1 = null

// 		this.pointMax = 0;
// 		for(var i:number = GameModel.h;i>0;i--)
// 		{
// 			for(var j:number = GameModel.w;j>0;j--)
// 			{
// 				var data:WayPointData = WayPointData.creatData(this.pointMax,i,j);
// 				this.pointData.update(this.pointMax,data)
// 				this.pointData.update(data.i + "_" + data.j,data);
// 				this.pointMax++
// 			}
// 		}

// 		var randHasNum:number = this.minHasNum +  Math.ceil( Math.random() * (this.maxHasNum - this.minHasNum) );
// 		var hasList:number[] = [];
// 		var randHasNum:number  = 30;
// 		while(randHasNum>0)
// 		{
// 			var hasIndex:number = Math.ceil( Math.random() * this.pointMax );
// 			if(-1 == hasList.indexOf(hasIndex) && hasIndex!=81 && hasIndex!=40 && hasIndex!=31)
// 			{
// 				hasList.push(hasIndex)
// 				randHasNum--;
// 			}
// 		}
// 		var hasLen:number = hasList.length;
// 		console.log("障碍物体  数量： " + hasLen);
// 		for (var has:number = 0;has<hasLen;has++)
// 		{
// 			var data:WayPointData = this.pointData.get(hasList[has]);
// 			data.clickState();
// 		}
// 		return this.pointData
// 	}


// 	private star:AStar = new AStar();
// 	public updataCat():void
// 	{
// 		if(null == this.catPoint)
// 		{
			
			
// 			this.catPoint = this.CatWayData.copy();
// 			this.catPoint1 = this.CatWay1Data.copy();
// 			var facade = mx.ApplicationFacade.getInstance();
//         	facade.sendNotification(UIGame.UPDATA_CAT_Bir,new CommonEvent(UIGame.UPDATA_CAT_Bir,this.catPoint));
//         	facade.sendNotification(UIGame.UPDATA_CAT_Bir,new CommonEvent(UIGame.UPDATA_CAT_Bir,this.catPoint1));

// 			// GlobalDispatcher.Ins.dispatchEvent(new CommonEvent(UIGame.UPDATA_CAT_Bir,this.catPoint));

// 			// GlobalDispatcher.Ins.dispatchEvent(new CommonEvent(UIGame.UPDATA_CAT_Bir,this.catPoint1));
// 		}
// 	}

// 	public getNode(i:number,j:number):WayPointData
// 	{
// 		return this.pointData.get(i + "_" + j);
// 	}

}