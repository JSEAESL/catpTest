/**
 *   @author cy
 *   @date 2017.3.21
 *   @desc 掠夺弹窗 Mediator
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
    var LDDRAlertMediator = (function (_super) {
        __extends(LDDRAlertMediator, _super);
        function LDDRAlertMediator(viewComponent) {
            var _this = _super.call(this, LDDRAlertMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(LDDRAlertMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        LDDRAlertMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.TIME_TICK,
                mx.MX_NOTICE.LUEDUO_GUISHU,
            ];
        };
        LDDRAlertMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            var type = notification.getType();
            switch (notification.getName()) {
                case mx.MX_NOTICE.TIME_TICK:
                    view.set_djs(data);
                    break;
                case mx.MX_NOTICE.LUEDUO_GUISHU:
                    view.set_guishu(data);
                    break;
            }
        };
        Object.defineProperty(LDDRAlertMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.LueDuoProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        LDDRAlertMediator.prototype.init_view = function () {
            var view = this.view;
            var proxy = this.proxy;
        };
        LDDRAlertMediator.NAME = "LDDRAlertMediator";
        return LDDRAlertMediator;
    }(puremvc.Mediator));
    mx.LDDRAlertMediator = LDDRAlertMediator;
    __reflect(LDDRAlertMediator.prototype, "mx.LDDRAlertMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=LDDRAlertMediator.js.map