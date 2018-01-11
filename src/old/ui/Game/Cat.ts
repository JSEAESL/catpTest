class Cat extends egret.DisplayObjectContainer{
	public constructor(index:number) 
	{
		super();
		this.initData();
		this.mIndex = index; 
	}

	public mIndex:number = 0
	private stay:MovieClipAciton
	private weizhu:MovieClipAciton
	private stand:MovieClipAciton
	private showMC:egret.MovieClip;

	//private ttImage:eui.Image;

	private initData():void
	{
		this.stay = MovieClipAciton.creat("stay");
		this.weizhu = MovieClipAciton.creat("weizhu");
		this.stand = MovieClipAciton.creat("stand");
		this.defAciton()
		// var ttImage = new eui.Image("catTT_png");
		// this.addChild(ttImage);
		// ttImage.alpha = 0.2	
	}

	private defAciton():void
	{
		this.toStay();
		//this.toWeiZhu();
		//this.toStand();
	}

	public reStart():void
	{
		this.toStay();
	}

	public toStay():void
	{
		this.removeCurrAciton();
		this.showMC = this.stay.getMovieClip();
		this.addChild(this.showMC);	
		this.showMC.play(-1)
		console.log(this.showMC.width);
		console.log(this.showMC.height);
		this.showMC.x = -10; 
		this.showMC.y = -this.showMC.height*0.5  - 10;
		//mc1.gotoAndPlay( "start" ,3);
	}

	public toWeiZhu():void
	{
		this.removeCurrAciton();
		this.showMC = this.weizhu.getMovieClip();
		this.addChild(this.showMC);	
		this.showMC.play(-1)
		this.showMC.x = -10; 
		this.showMC.y = -this.showMC.height*0.5   - 10;

	}

	// public toStand():void
	// {
	// 	this.removeCurrAciton();
	// 	this.showMC = this.stand.getMovieClip();
	// 	this.addChild(this.showMC);	
	// 	this.showMC.play(-1)
	// 	//this.showMC.y = -this.showMC.height*0.5;
	// }

	private removeCurrAciton():void
	{
		if(null != this.showMC)
		{
			if(this.showMC.parent)
			{
				this.showMC.parent.removeChild(this.showMC);
			}
		}
		this.showMC = null;
	}

	public initFactory(dim:egret.MovieClipDataFactory,name:string):void
	{
		var data = RES.getRes( name + "_json");
		var txtr = RES.getRes( name + "_png");
		dim = new egret.MovieClipDataFactory( data, txtr );
	}
}
class MovieClipAciton
{
	private factory:egret.MovieClipDataFactory;
	private name:string;
	public constructor() 
	{
	}
	public static creat(name:string):MovieClipAciton
	{
		var result:MovieClipAciton = new MovieClipAciton()
		var data = RES.getRes( name + "_json");
		var txtr = RES.getRes( name + "_png");
		result.name = name;
		result.factory = new egret.MovieClipDataFactory( data, txtr );
		return result;
	}

	private MovieClip:egret.MovieClip
	public getMovieClip():egret.MovieClip
	{
		if(null == this.MovieClip)
		{
			this.MovieClip =  new egret.MovieClip( this.factory.generateMovieClipData( name ) );
		}
		return this.MovieClip
	}
}