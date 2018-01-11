
module mx {
    export class ControllerPrepCommand extends puremvc.SimpleCommand implements puremvc.ICommand{


        public execute(notification:puremvc.INotification):void{
           (new StartGameCommand()).register();
        }
    }
}