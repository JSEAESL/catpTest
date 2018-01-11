/**
*	@author zen
*	@date 2014.12.28
*	@desc 引擎面门，用于启动整个项目
**/
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
    var ApplicationFacade = (function (_super) {
        __extends(ApplicationFacade, _super);
        function ApplicationFacade() {
            return _super.call(this) || this;
        }
        ApplicationFacade.getInstance = function () {
            if (this.instance == null) {
                this.instance = new ApplicationFacade();
            }
            return (this.instance);
        };
        ApplicationFacade.prototype.initializeController = function () {
            _super.prototype.initializeController.call(this);
            this.registerCommand(mx.MX_NOTICE.STARTUP, mx.StartupCommand);
        };
        /**
         * 启动PureMVC，在应用程序中调用此方法，并传递应用程序本身的引用
         * @param rootView:PureMVC应用程序的根视图root，包含其它所有的View Componet
         */
        ApplicationFacade.prototype.startUp = function (rootView) {
            this.sendNotification(mx.MX_NOTICE.STARTUP, rootView);
            this.removeCommand(mx.MX_NOTICE.STARTUP);
        };
        return ApplicationFacade;
    }(puremvc.Facade));
    mx.ApplicationFacade = ApplicationFacade;
    __reflect(ApplicationFacade.prototype, "mx.ApplicationFacade", ["puremvc.IFacade", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ApplicationFacade.js.map