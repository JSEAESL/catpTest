/**
 *   @author qianjun
 *   @date 2016.12.20
 *   @desc mediator
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
    var WanBaVIPAlertMediator = (function (_super) {
        __extends(WanBaVIPAlertMediator, _super);
        function WanBaVIPAlertMediator(viewComponent) {
            return _super.call(this, WanBaVIPAlertMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(WanBaVIPAlertMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        WanBaVIPAlertMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CPOP
            ];
        };
        WanBaVIPAlertMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CPOP:
                    view.fresh_list();
                    break;
            }
        };
        WanBaVIPAlertMediator.NAME = "WanBaVIPAlertMediator";
        return WanBaVIPAlertMediator;
    }(puremvc.Mediator));
    mx.WanBaVIPAlertMediator = WanBaVIPAlertMediator;
    __reflect(WanBaVIPAlertMediator.prototype, "mx.WanBaVIPAlertMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=WanBaVIPAlertMediator.js.map