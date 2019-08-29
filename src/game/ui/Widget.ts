class Widget extends eui.Component{
	public constructor() {
		super();
	}

	public disponse():void
	{
		
	}

	public setParent(parent:egret.DisplayObjectContainer):Widget
	{
		parent.addChild(this);
		return this;
	}

	public setPosition(px:number,py:number):Widget
	{
		this.x = px;
		this.y = py;
		return this;
	}

	public playGroup():void
	{
		
	}

	public update(timeStamp:number):void
	{
		
	}
}