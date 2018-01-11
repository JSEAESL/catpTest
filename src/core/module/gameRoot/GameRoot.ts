module mx {
	export class GameRoot extends BasicComponent 
	{
		public static NAME:string = "GameRoot";
		public restart_b:eui.Image;
		public score_t:eui.Label;
		public point_list:eui.List;

		public wait:eui.Image;
		public constructor() 
		{
			super();
			this.skinName = GameRoot.NAME + "Skin";
		}

		protected onAddTostage():void
		{
			console.log("GameRoot>>>onAddTostage");
			this.wait.visible = false;
			this.initRoot()
		    let facade = ApplicationFacade.getInstance();
            facade.registerMediator(new GameRootMediator(this));
		}

        private wayLayer:egret.DisplayObjectContainer;
        private catLayer:egret.DisplayObjectContainer;
		
		public cat:Cat
		public cat1:Cat
		private CatList:Cat[];
		private initRoot():void
		{
            this.wayLayer = new egret.DisplayObjectContainer();
            this.catLayer = new egret.DisplayObjectContainer();
            this.addChild(this.wayLayer)
            this.addChild(this.catLayer)
			this.initCat();
		}
			
		private initCat():void
		{
			this.CatList = [];
			this.cat = new Cat(0);
			this.cat1 = new Cat(1);
			this.CatList.push(this.cat);
			this.CatList.push(this.cat1);	
		}
		
		private pointList:eui.List;
		private UIList:Object = new Object();
        public updataPoint(vo:WayPointData):void
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

		public catLose(index:number):void
		{
			var cat = this.getCurrCat(index);
            cat.toWeiZhu();
		}

		public getCurrCat(index:number):Cat
        {
            return this.CatList[index];
        }

		public UpdataCatBir(pointdata:WayPointData):void
		{
			let offx:number = pointdata.j%2==0?22:0;
            var ccc:Cat = this.getCurrCat(pointdata.catIndex);
            ccc.x =pointdata.i*45 + this.pointList.x + offx;
            ccc.y =pointdata.j*45 + this.pointList.y;
            this.catLayer.addChild(ccc);
            var endY:number =  ccc.y
            ccc.y  = 0;
            var tw = egret.Tween.get( ccc );//.call(this.onComplete, this);
            tw.to( {y:endY}, 1000 );
		}


        public UpdataCat(pointdata:WayPointData):void
        {
            let offx:number = pointdata.j%2==0?22:0;
            var ccc:Cat = this.getCurrCat(pointdata.catIndex);
            ccc.x =pointdata.i*45 + this.pointList.x + offx;
            ccc.y =pointdata.j*45 + this.pointList.y;
            this.catLayer.addChild(ccc);
        }

		protected onRmovestage():void
		{
			let facade = ApplicationFacade.getInstance();
            facade.removeMediator(GameRootMediator.NAME);
		}
	}
}