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
 * wzt、mx
 */
var mx;
(function (mx) {
    var TuJianDetailAlertMediator = (function (_super) {
        __extends(TuJianDetailAlertMediator, _super);
        function TuJianDetailAlertMediator(viewComponent) {
            return _super.call(this, TuJianDetailAlertMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(TuJianDetailAlertMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        TuJianDetailAlertMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CPOP,
            ];
        };
        TuJianDetailAlertMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var str;
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CPOP:
                    view.fresh_list();
                    break;
            }
        };
        TuJianDetailAlertMediator.NAME = "TuJianDetailAlertMediator";
        return TuJianDetailAlertMediator;
    }(puremvc.Mediator));
    mx.TuJianDetailAlertMediator = TuJianDetailAlertMediator;
    __reflect(TuJianDetailAlertMediator.prototype, "mx.TuJianDetailAlertMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=TuJianDetailAlertMediator.js.map