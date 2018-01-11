module mx {
	export class GameStart extends BasicComponent {
		public static NAME:string = "GameStart";
		public button_b:eui.Image;
		public constructor() 
		{
			super();
			this.skinName = GameStart.NAME + "Skin";
		}

		protected onAddTostage():void
		{
			console.log("GameStart>>>onAddTostage");
		    let facade = ApplicationFacade.getInstance();
            facade.registerMediator(new GameStartMediator(this));
		}

		protected onRmovestage():void
		{
			let facade = ApplicationFacade.getInstance();
            facade.removeMediator(GameStartMediator.NAME);
		}
	}
}