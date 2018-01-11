

module mx {

    export class ApplicationMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "ApplicationMediator";
        public static APP_VIEW_CHANGE:string = "ApplicationMediator_view_change"; //
        public static APP_VIEW_ADD:string = "ApplicationMediator_view_add";
        public constructor(viewComponent: any) {
            super(ApplicationMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [ApplicationMediator.APP_VIEW_CHANGE
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            let data : any = notification.getBody();
            let main = <AppContainer><any>(this.viewComponent);
            switch (notification.getName()) 
            {
                case ApplicationMediator.APP_VIEW_ADD:
                    main.add_view(data.viewName);
                    break;
                case ApplicationMediator.APP_VIEW_CHANGE:
                    main.change_view(data.viewName);
                    break;
                case SIGN_NAME.GAME_RESULT_RUN:
                    main.add_view(GameResult.NAME);
                    break;
                default:
                    break;
            }
        }


    }
}