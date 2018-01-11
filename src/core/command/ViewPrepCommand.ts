

module mx {

	export class ViewPrepCommand extends puremvc.SimpleCommand implements puremvc.ICommand{
		public execute(notification:puremvc.INotification):void{
			let main:AppContainer = notification.getBody();
			this.facade.registerMediator(new ApplicationMediator(main));
			SceneUtil.getInstance().setCurrentRoot(main)
			main.enterGame();
		}
	}
}