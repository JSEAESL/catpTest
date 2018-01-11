/**
 *   @author cy
 *   @date 2017.3.13
 *   @desc jjc排行榜 Mediator
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
    var JJCPaiHangAlertMediator = (function (_super) {
        __extends(JJCPaiHangAlertMediator, _super);
        function JJCPaiHangAlertMediator(viewComponent) {
            return _super.call(this, JJCPaiHangAlertMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(JJCPaiHangAlertMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        JJCPaiHangAlertMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CPOP,
            ];
        };
        JJCPaiHangAlertMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            var type = notification.getType();
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CPOP:
                    view.init_friend_data(data);
                    break;
            }
        };
        Object.defineProperty(JJCPaiHangAlertMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.JingJiProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        JJCPaiHangAlertMediator.NAME = "JJCPaiHangAlertMediator";
        return JJCPaiHangAlertMediator;
    }(puremvc.Mediator));
    mx.JJCPaiHangAlertMediator = JJCPaiHangAlertMediator;
    __reflect(JJCPaiHangAlertMediator.prototype, "mx.JJCPaiHangAlertMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=JJCPaiHangAlertMediator.js.map