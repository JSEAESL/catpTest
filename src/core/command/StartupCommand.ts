
module mx {

	export class StartupCommand extends puremvc.MacroCommand{

	

		//携带的消息会依次传递给子消息
		public initializeMacroCommand():void{
			this.addSubCommand(ModelPrepCommand);
			this.addSubCommand(ViewPrepCommand);
			this.addSubCommand(ControllerPrepCommand);
		}
	}
}