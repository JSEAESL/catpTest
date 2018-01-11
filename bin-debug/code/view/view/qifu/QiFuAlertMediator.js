/**
 *   @author qianjun
 *   @date 2017.8.23
 *   @desc  Mediator
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
    var QiFuAlertMediator = (function (_super) {
        __extends(QiFuAlertMediator, _super);
        function QiFuAlertMediator(viewComponent) {
            return _super.call(this, QiFuAlertMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(QiFuAlertMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(QiFuAlertMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.SignProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        QiFuAlertMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CPOP,
            ];
        };
        QiFuAlertMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CPOP:
                    view.fresh_view();
                    break;
            }
        };
        QiFuAlertMediator.NAME = "QiFuAlertMediator";
        return QiFuAlertMediator;
    }(puremvc.Mediator));
    mx.QiFuAlertMediator = QiFuAlertMediator;
    __reflect(QiFuAlertMediator.prototype, "mx.QiFuAlertMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=QiFuAlertMediator.js.map