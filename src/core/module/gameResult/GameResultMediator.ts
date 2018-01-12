module mx {
	export class GameResultMediator extends BasicMediator
	{
		public static NAME : string = "GameResultMediator";
		public constructor(viewComponent : any)
        {
            super(GameResultMediator.NAME, viewComponent);
            //this.addEvent();
        }
		  private get view() : GameResult
        {
            return <GameResult><any> (this.viewComponent);
        }
        
        public listNotificationInterests() : Array<any>
        {
            return [
                //SIGN_NAME.ENTER_GAME_ROOT,
            ];
        }

        private reStarGame(e:egret.TouchEvent):void
        {
            console.log("reStarGame");
            this.sendNotification(UIGame.RE_START_GAME);
        }

        private mData:ResultData;
        public setResultData(resultData:ResultData):void
        {
            this.mData = resultData;
            this.updataView()
        }

        private updataView():void
        {
            if(null != this.mData)
            {
                this.view.scoreLabel.text = this.mData.score + "";
                if(this.mData.state)
                {
                    this.view.currentState = "win";
                }else
                {
                    this.view.currentState = "lose";
                }
            }
            this.view.heightScoreLabel.text = 0 + ""
            var temp = egret.localStorage.getItem("WinStep")
            if(temp)
            {
                var winStep:number =  parseInt(temp);
                if(winStep!=0 && winStep!= NaN)
                {
                    this.view.heightScoreLabel.text = 100 - winStep + "";
                }
            }
            this.addEvent()
        }
        
        protected addEvent():void
        {
            this.view.againImage.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.reStarGame,this)
            this.view.againImage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.reStarGame,this)
        }

        protected removeEvent():void
        {
            this.view.againImage.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.reStarGame,this)
        }
	}
}