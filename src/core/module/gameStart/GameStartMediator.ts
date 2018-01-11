module mx {
	export class GameStartMediator extends BasicMediator  
    {
		public static NAME : string = "GameStartMediator";
		public constructor(viewComponent : any)
        {
            super(GameStartMediator.NAME, viewComponent);
            //this.addEvent();
        }

        private get view() : GameStart
        {
            return <GameStart><any> (this.viewComponent);
        }
        
        public listNotificationInterests() : Array<any>
        {
            return [
                SIGN_NAME.ENTER_GAME_ROOT,
            ];
        }

        public handleNotification(notification : puremvc.INotification) : void
        {
            switch(notification.getName())
            {
                case SIGN_NAME.ENTER_GAME_ROOT:
                    this.sendNotification(ApplicationMediator.APP_VIEW_CHANGE,{"viewName":"GameRoot"});
                break;
            }
		}

        private clickHandler():void
        {
            this.sendNotification(SIGN_NAME.ENTER_GAME_ROOT);
        }
	
        protected addEvent():void
        {
            this.view.button_b.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickHandler,this)
        }

        protected removeEvent():void
        {
            this.view.button_b.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickHandler,this)
        }
	}
}