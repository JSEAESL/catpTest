/**
 *   @author wxw qianjun
 *   @date 2017.11.15
 *   @desc 活动主界面mediator
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
    var WxActyAlertMediator = (function (_super) {
        __extends(WxActyAlertMediator, _super);
        function WxActyAlertMediator(viewComponent) {
            return _super.call(this, WxActyAlertMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(WxActyAlertMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        WxActyAlertMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.UPDATE_ACTY,
            ];
        };
        WxActyAlertMediator.prototype.handleNotification = function (notification) {
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.UPDATE_ACTY:
                    view.fresh_list();
                    break;
            }
        };
        WxActyAlertMediator.NAME = "WxActyAlertMediator";
        return WxActyAlertMediator;
    }(puremvc.Mediator));
    mx.WxActyAlertMediator = WxActyAlertMediator;
    __reflect(WxActyAlertMediator.prototype, "mx.WxActyAlertMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=WxActyAlertMediator.js.map