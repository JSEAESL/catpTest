class UIWayPoint extends Widget{

	public static POINT_CLICK:string = "UIWayPoint_POINT_CLICK"
	public constructor() {
		super();
		this.skinName = "UIWayPoint_eui"
	}

	public childrenCreated(){
		super.childrenCreated();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.pointClick,this)
	}
	private thisData:WayPointData;
	private pointClick(e:egret.TouchEvent):void
	{
		// var facade = mx.ApplicationFacade.getInstance();
        // facade.sendNotification(UIWayPoint.POINT_CLICK,new CommonEvent(UIWayPoint.POINT_CLICK,this.thisData));
		GlobalDispatcher.Ins.dispatchEvent(new CommonEvent(UIWayPoint.POINT_CLICK,this.thisData));
	}
	private tt:eui.Label
	public upData(data:WayPointData):void
	{
		this.thisData = data;
		this.currentState = data.state;
 		//this.tt.text = "x:" + this.thisData.i + "   y:" + this.thisData.j ;
	}
}


// class WayPointItemRenderer extends eui.ItemRenderer 
// {
// 	public constructor()
// 	{
// 		super();
// 		this.skinName = "UIWayPoint_eui"
// 	}

// 	public childrenCreated()
// 	{
// 		super.childrenCreated();
// 		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.pointClick,this)
// 		this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemove,this);
// 	}

// 	private pointClick(e:egret.TouchEvent):void
// 	{
// 		GlobalDispatcher.Ins.dispatchEvent(new CommonEvent(UIWayPoint.POINT_CLICK,this.mData));
// 	}

// 	private onRemove(e:Event):void
// 	{
// 		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.pointClick,this)
// 		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemove,this);
// 	}

// 	private mData:WayPointData;
// 	private tt:eui.Label;
// 	protected dataChanged(): void 
// 	{
// 		if(this.data)
// 		{
// 			this.mData = this.data;
// 			this.currentState = this.mData.state;
// 			this.tt.text = "x:" + this.mData.i + "   y:" + this.mData.j ;
// 		}
// 	}
// }