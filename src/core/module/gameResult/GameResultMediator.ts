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

        public handleNotification(notification : puremvc.INotification) : void
        {
            switch(notification.getName())
            {
                // case SIGN_NAME.ENTER_GAME_ROOT:
                //     this.sendNotification(ApplicationMediator.APP_VIEW_CHANGE,{"viewName":});
                // break;
            }
		}

        private reStarGame(e:egret.TouchEvent):void
        {
            //SceneUtil.getInstance().goGame();
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
        }
        
        protected addEvent():void
        {
            this.view.againImage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.reStarGame,this)
        }

        protected removeEvent():void
        {
            //this.view.button_b.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickHandler,this)
        }
	}
}