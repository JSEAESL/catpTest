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
/**
 * cy
 */
var mx;
(function (mx) {
    var ActyWSMainAlertMediator = (function (_super) {
        __extends(ActyWSMainAlertMediator, _super);
        function ActyWSMainAlertMediator(viewComponent) {
            return _super.call(this, ActyWSMainAlertMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(ActyWSMainAlertMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        ActyWSMainAlertMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CPOP,
                mx.MX_NOTICE.TIME_TICK,
                mx.MX_NOTICE.CURRENCY_CHANGED
            ];
        };
        ActyWSMainAlertMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var str;
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CPOP:
                case mx.MX_NOTICE.CURRENCY_CHANGED:
                    view.fresh_list();
                    break;
                case mx.MX_NOTICE.TIME_TICK:
                    view.fresh_time();
                    break;
            }
        };
        ActyWSMainAlertMediator.NAME = "ActyWSMainAlertMediator";
        return ActyWSMainAlertMediator;
    }(puremvc.Mediator));
    mx.ActyWSMainAlertMediator = ActyWSMainAlertMediator;
    __reflect(ActyWSMainAlertMediator.prototype, "mx.ActyWSMainAlertMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ActyWSMainAlertMediator.js.map