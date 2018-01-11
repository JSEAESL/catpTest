/**
 *   @author cy
 *   @date 2017.10.19
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
    var WanBaPetAlertMediator = (function (_super) {
        __extends(WanBaPetAlertMediator, _super);
        function WanBaPetAlertMediator(viewComponent) {
            return _super.call(this, WanBaPetAlertMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(WanBaPetAlertMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        WanBaPetAlertMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CPOP
            ];
        };
        WanBaPetAlertMediator.prototype.handleNotification = function (notification) {
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CPOP:
                    view.fresh_view();
                    break;
            }
        };
        WanBaPetAlertMediator.NAME = "WanBaPetAlertMediator";
        return WanBaPetAlertMediator;
    }(puremvc.Mediator));
    mx.WanBaPetAlertMediator = WanBaPetAlertMediator;
    __reflect(WanBaPetAlertMediator.prototype, "mx.WanBaPetAlertMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=WanBaPetAlertMediator.js.map