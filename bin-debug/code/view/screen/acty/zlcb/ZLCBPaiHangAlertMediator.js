/**
 *   @author qianjun
 *   @date 2017.3.13
 *   @desc zlcb排行榜 Mediator
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
    var ZLCBPaiHangAlertMediator = (function (_super) {
        __extends(ZLCBPaiHangAlertMediator, _super);
        function ZLCBPaiHangAlertMediator(viewComponent) {
            return _super.call(this, ZLCBPaiHangAlertMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(ZLCBPaiHangAlertMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        ZLCBPaiHangAlertMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_TIME,
                mx.MX_NOTICE.ZLCB_RANK_FRESH
            ];
        };
        ZLCBPaiHangAlertMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            var type = notification.getType();
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_TIME:
                    if (type == "zlcb") {
                        view.fresh_time();
                    }
                    break;
                case mx.MX_NOTICE.ZLCB_RANK_FRESH:
                    view.show_list();
                    break;
            }
        };
        ZLCBPaiHangAlertMediator.NAME = "ZLCBPaiHangAlertMediator";
        return ZLCBPaiHangAlertMediator;
    }(puremvc.Mediator));
    mx.ZLCBPaiHangAlertMediator = ZLCBPaiHangAlertMediator;
    __reflect(ZLCBPaiHangAlertMediator.prototype, "mx.ZLCBPaiHangAlertMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ZLCBPaiHangAlertMediator.js.map