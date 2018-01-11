module mx {
	export class GameResult extends BasicComponent {
		public static NAME:string = "GameResult";
		public againImage:eui.Image;
		public heightScoreLabel:eui.Label;
		public scoreLabel:eui.Label;
		public constructor() 
		{
			super();
			this.skinName = GameStart.NAME + "Skin";
		}

		protected onAddTostage():void
		{
			console.log("GameStart>>>onAddTostage");
		    let facade = ApplicationFacade.getInstance();
            facade.registerMediator(new GameResultMediator(this));
		}

		protected onRmovestage():void
		{
			let facade = ApplicationFacade.getInstance();
            facade.removeMediator(GameResultMediator.NAME);
		}
	}
}