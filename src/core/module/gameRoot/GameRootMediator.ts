module mx {
	export class GameRootMediator extends BasicMediator
	{
		public static NAME : string = "GameRootMediator";
		public constructor(viewComponent : any)
        {
            super(GameRootMediator.NAME, viewComponent);
        }
		  private get view() : GameRoot
        {
            return <GameRoot><any> (this.viewComponent);
        }
        
        public listNotificationInterests() : Array<any>
        {
            return [
                //SIGN_NAME.ENTER_GAME_ROOT,
                UIGame.UPDATA,
                UIGame.UPDATA_CAT,
                UIGame.UPDATA_CAT_Bir,
                UIGame.GAME_Cat_Lose,
                UIGame.GAME_Win,
                UIGame.GAME_Lose,
                UIGame.RE_START_GAME
            ];
        }

        public handleNotification(notification : puremvc.INotification) : void
        {
            var data:any = notification.getBody();
            switch(notification.getName())
            {
                case UIGame.RE_START_GAME:
                    this.reStarGame();
                    break;
                case UIGame.UPDATA:
                    this.UpdataData(data)
                    break;
                case UIGame.UPDATA_CAT:
                    this.UpdataCat(data)
                    break;
                case UIGame.UPDATA_CAT_Bir:
                    this.UpdataCatBir(data)
                    break;
                case UIGame.GAME_Cat_Lose:
                    this.catLose(data)
                    break;
                case UIGame.GAME_Win:
                    this.showWin(data)
                    break;
                case UIGame.GAME_Lose:
                    this.showLose(data)
                    break;
            }
		}

        	private catLose(e:CommonEvent):void
            {
                this.view.catLose(e.data);
            }

            private showWait():void
            {
                this.view.wait.visible = true;
            }

            private hideWait():void
            {
                this.view.wait.visible = false;
            }

            private showWin(e:CommonEvent):void
            {
                this.showWait();
                var data:ResultData = e.data;
                this.sendNotification(SIGN_NAME.GAME_RESULT_RUN,data);
                //SceneUtil.getInstance().showUIResult(data);
            }

            private showLose(e:CommonEvent):void
            {
                this.showWait();
                var data:ResultData = e.data;
                this.sendNotification(SIGN_NAME.GAME_RESULT_RUN,data);
            }



		protected init():void
		{
            this.initGame();
            GameModel.Ins.updataCat();
		}

        private clickHandler():void
        {
            //this.sendNotification(SIGN_NAME.ENTER_GAME_ROOT);
        }
	
        protected addEvent():void
        {
            // GlobalDispatcher.Ins.addEventListener(,,this);
            // GlobalDispatcher.Ins.addEventListener(,,this);
            // GlobalDispatcher.Ins.addEventListener(,,this);
            // GlobalDispatcher.Ins.addEventListener(,,this);
            // GlobalDispatcher.Ins.addEventListener(,,this);
            // GlobalDispatcher.Ins.addEventListener(,,this);
            this.view.restart_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reStarGame,this)
        }
        
        private reStarGame(e:egret.TouchEvent = null):void
        {
            GameModel.Ins.reSetData();
            this.initGame();
            GameModel.Ins.updataCat();
        }

        private UpdataCat(e:CommonEvent):void
        {
            var pointdata:WayPointData = e.data;
            this.view.UpdataCat(pointdata);
        }
        
        private UpdataCatBir(e:CommonEvent):void
        {
            var pointdata:WayPointData = e.data;
            this.view.UpdataCatBir(pointdata);
        }

        private initGame(e:any = null):void
        {
            this.hideWait();
            let data:CustomMap =  GameModel.Ins.reSetData();
            var dataMax:number = GameModel.Ins.pointMax;
            var vo:WayPointData;
            this.view.score_t.text = GameModel.Ins.nowStep + "";
            for (var i:number = 0;i<dataMax;i++)
            {
                vo = data.get(i);
                this.view.updataPoint(vo);
            }
            this.view.cat.reStart();
            this.view.cat1.reStart();
        }




        private UpdataData(e:CommonEvent):void
        {
            this.view.score_t.text = GameModel.Ins.nowStep + "";
            var data:WayPointData = e.data;
            this.view.updataPoint(data);
        }


        protected removeEvent():void
        {
            //this.view.button_b.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickHandler,this)
        }

		protected removeOther():void
		{

		}

	}
}