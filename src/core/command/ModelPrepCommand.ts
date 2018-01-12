
module mx {

	export class ModelPrepCommand extends puremvc.SimpleCommand implements puremvc.ICommand{

	
		public execute(notification : puremvc.INotification) : void
        {
			this.facade.registerProxy(new GameModelProxy());
		}
	}
}