/**
 *   @author cy
 *   @date 2017.11.29
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
    var ActyCYGGMainAlertMediator = (function (_super) {
        __extends(ActyCYGGMainAlertMediator, _super);
        function ActyCYGGMainAlertMediator(viewComponent) {
            return _super.call(this, ActyCYGGMainAlertMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(ActyCYGGMainAlertMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        ActyCYGGMainAlertMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CPOP,
                mx.MX_NOTICE.TIME_TICK,
                mx.MX_NOTICE.CURRENCY_CHANGED
            ];
        };
        ActyCYGGMainAlertMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var str;
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CPOP:
                case mx.MX_NOTICE.CURRENCY_CHANGED:
                    view.fresh_view();
                    break;
                case mx.MX_NOTICE.TIME_TICK:
                    view.fresh_time();
                    break;
            }
        };
        ActyCYGGMainAlertMediator.NAME = "ActyCYGGMainAlertMediator";
        return ActyCYGGMainAlertMediator;
    }(puremvc.Mediator));
    mx.ActyCYGGMainAlertMediator = ActyCYGGMainAlertMediator;
    __reflect(ActyCYGGMainAlertMediator.prototype, "mx.ActyCYGGMainAlertMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ActyCYGGMainAlertMediator.js.map