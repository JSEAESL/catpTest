var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var mx;
(function (mx) {
    var ApplicationMediator = (function (_super) {
        __extends(ApplicationMediator, _super);
        function ApplicationMediator(viewComponent) {
            return _super.call(this, ApplicationMediator.NAME, viewComponent) || this;
        }
        ApplicationMediator.prototype.listNotificationInterests = function () {
            return [ApplicationMediator.APP_VIEW_CHANGE
            ];
        };
        ApplicationMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var main = (this.viewComponent);
            switch (notification.getName()) {
                case ApplicationMediator.APP_VIEW_ADD:
                    main.add_view(data.viewName);
                    break;
                case ApplicationMediator.APP_VIEW_CHANGE:
                    main.change_view(data.viewName);
                    break;
                case mx.SIGN_NAME.GAME_RESULT_RUN:
                    main.add_view(mx.GameResult.NAME);
                    break;
                default:
                    break;
            }
        };
        ApplicationMediator.NAME = "ApplicationMediator";
        ApplicationMediator.APP_VIEW_CHANGE = "ApplicationMediator_view_change"; //
        ApplicationMediator.APP_VIEW_ADD = "ApplicationMediator_view_add";
        return ApplicationMediator;
    }(puremvc.Mediator));
    mx.ApplicationMediator = ApplicationMediator;
    __reflect(ApplicationMediator.prototype, "mx.ApplicationMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ApplicationMediator.js.map