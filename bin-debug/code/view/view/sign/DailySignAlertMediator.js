/**
 *   @author qianjun
 *   @date 2017.8.23
 *   @desc  Mediator
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
    var DailySignAlertMediator = (function (_super) {
        __extends(DailySignAlertMediator, _super);
        function DailySignAlertMediator(viewComponent) {
            return _super.call(this, DailySignAlertMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(DailySignAlertMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DailySignAlertMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.SignProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        DailySignAlertMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_SIGN,
            ];
        };
        DailySignAlertMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_SIGN:
                    view.fresh_pop();
                    break;
            }
        };
        DailySignAlertMediator.NAME = "DailySignAlertMediator";
        return DailySignAlertMediator;
    }(puremvc.Mediator));
    mx.DailySignAlertMediator = DailySignAlertMediator;
    __reflect(DailySignAlertMediator.prototype, "mx.DailySignAlertMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=DailySignAlertMediator.js.map