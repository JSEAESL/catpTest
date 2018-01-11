/**
 *   @author cy
 *   @date 2017.9.21
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
    var ActyBaiHuaXXiuAlertMediator = (function (_super) {
        __extends(ActyBaiHuaXXiuAlertMediator, _super);
        function ActyBaiHuaXXiuAlertMediator(viewComponent) {
            return _super.call(this, ActyBaiHuaXXiuAlertMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(ActyBaiHuaXXiuAlertMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        ActyBaiHuaXXiuAlertMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_TIME,
            ];
        };
        ActyBaiHuaXXiuAlertMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_TIME:
                    var ntype = notification.getType();
                    if (ntype == "xxiu") {
                        this.view.fresh_time();
                    }
                    break;
            }
        };
        ActyBaiHuaXXiuAlertMediator.NAME = "ActyBaiHuaXXiuAlertMediator";
        return ActyBaiHuaXXiuAlertMediator;
    }(puremvc.Mediator));
    mx.ActyBaiHuaXXiuAlertMediator = ActyBaiHuaXXiuAlertMediator;
    __reflect(ActyBaiHuaXXiuAlertMediator.prototype, "mx.ActyBaiHuaXXiuAlertMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ActyBaiHuaXXiuAlertMediator.js.map