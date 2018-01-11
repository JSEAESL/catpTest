module mx {
	export class StartGameCommand extends puremvc.SimpleCommand implements puremvc.ICommand{
	    public static NAME:string = "StartGameCommand";
        public register() : void
        {
            this.facade.registerCommand(SIGN_NAME.GAME_START, StartGameCommand);
        }
        public execute(notification : puremvc.INotification) : void
        {

        }
	}
}