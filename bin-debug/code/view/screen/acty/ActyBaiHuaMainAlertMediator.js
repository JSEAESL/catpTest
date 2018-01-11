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
    var ActyBaiHuaMainAlertMediator = (function (_super) {
        __extends(ActyBaiHuaMainAlertMediator, _super);
        function ActyBaiHuaMainAlertMediator(viewComponent) {
            return _super.call(this, ActyBaiHuaMainAlertMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(ActyBaiHuaMainAlertMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        ActyBaiHuaMainAlertMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CPOP,
            ];
        };
        ActyBaiHuaMainAlertMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CPOP:
                    view.fresh_view();
                    break;
            }
        };
        ActyBaiHuaMainAlertMediator.NAME = "ActyBaiHuaMainAlertMediator";
        return ActyBaiHuaMainAlertMediator;
    }(puremvc.Mediator));
    mx.ActyBaiHuaMainAlertMediator = ActyBaiHuaMainAlertMediator;
    __reflect(ActyBaiHuaMainAlertMediator.prototype, "mx.ActyBaiHuaMainAlertMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ActyBaiHuaMainAlertMediator.js.map