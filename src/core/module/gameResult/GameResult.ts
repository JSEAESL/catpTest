module mx {
	export class GameResult extends BasicComponent {
		public static NAME:string = "GameResult";
		public againImage:eui.Image;
		public heightScoreLabel:eui.Label;
		public scoreLabel:eui.Label;
		public constructor(cd ?: any) 
		{
			super(cd);
			this.skinName = GameResult.NAME + "Skin";
		}

		protected onAddTostage():void
		{
			console.log("GameStart>>>onAddTostage");
		    let facade = ApplicationFacade.getInstance();
			let med:GameResultMediator = new GameResultMediator(this)
            facade.registerMediator(med);
			med.setResultData(this.adata);
		}

		protected onRmovestage():void
		{
			let facade = ApplicationFacade.getInstance();
            facade.removeMediator(GameResultMediator.NAME);
		}
	}
}