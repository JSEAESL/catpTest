class UILogin extends Widget {

	public constructor() {
		super();
		this.skinName = "UILogin_eui"
	}

	public childrenCreated(){
		super.childrenCreated();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.GameStart,this)
	}

	private GameStart(e:egret.TouchEvent):void
	{
        SceneUtil.getInstance().goGame();
	}

	public disponse():void
	{
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.GameStart,this)
	}
}