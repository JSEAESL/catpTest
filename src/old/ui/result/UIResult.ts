class UIResult extends Widget{
	private againImage:eui.Image;
	private heightScoreLabel:eui.Label;
	private scoreLabel:eui.Label;

	public constructor() 
	{
		super();
		this.skinName = "UIResult_eui"
	}

	public childrenCreated()
	{
		super.childrenCreated();
	}

	private reStarGame(e:egret.TouchEvent):void
	{
        SceneUtil.getInstance().goGame();
	}

	private mData:ResultData;
	public setResultData(resultData:ResultData):void
	{
		this.mData = resultData;
	}

	public playGroup():void
	{
		this.againImage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.reStarGame,this)
		if(null != this.mData)
		{
			this.scoreLabel.text = this.mData.score + "";
			if(this.mData.state)
			{
				this.currentState = "win";
			}else
			{
				this.currentState = "lose";
			}
		}
		this.heightScoreLabel.text = 0 + ""
		var temp = egret.localStorage.getItem("WinStep")
		if(temp)
		{
			var winStep:number =  parseInt(temp);
			if(winStep!=0 && winStep!= NaN)
			{
				this.heightScoreLabel.text = 100 - winStep + "";
			}
		}
	}

	public disponse():void
	{
		this.againImage.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.reStarGame,this)
	}
}