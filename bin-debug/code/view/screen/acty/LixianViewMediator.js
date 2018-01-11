/**
 *   @author qianjun
 *   @date 2016.12.20
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
    var LixianViewMediator = (function (_super) {
        __extends(LixianViewMediator, _super);
        function LixianViewMediator(viewComponent) {
            return _super.call(this, LixianViewMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(LixianViewMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        LixianViewMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_LIXIAN_LQ,
                mx.MX_NOTICE.SHOW_ALERT
            ];
        };
        LixianViewMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_LIXIAN_LQ:
                    this.view.show_list();
                    break;
                case mx.MX_NOTICE.SHOW_ALERT:
                    var dproxy = (this.facade.retrieveProxy(mx.DataProxy.NAME));
                    dproxy.check_lv_up();
                    break;
            }
        };
        LixianViewMediator.NAME = "LixianViewMediator";
        return LixianViewMediator;
    }(puremvc.Mediator));
    mx.LixianViewMediator = LixianViewMediator;
    __reflect(LixianViewMediator.prototype, "mx.LixianViewMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=LixianViewMediator.js.map