/**
 *  @dingyunfeng
 *  2018-1-4
 *  推广系统外部
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
    var TuiGuangWBViewMediator = (function (_super) {
        __extends(TuiGuangWBViewMediator, _super);
        function TuiGuangWBViewMediator(viewComponent) {
            return _super.call(this, TuiGuangWBViewMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(TuiGuangWBViewMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        TuiGuangWBViewMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CPOP,
                mx.MX_NOTICE.ZHUANPAN_START,
            ];
        };
        TuiGuangWBViewMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CPOP:
                    view.fresh_user_info(data);
                    break;
                case mx.MX_NOTICE.ZHUANPAN_START:
                    view.zhuanpan(data);
                    break;
            }
        };
        TuiGuangWBViewMediator.NAME = "TuiGuangWBViewMediator";
        return TuiGuangWBViewMediator;
    }(puremvc.Mediator));
    mx.TuiGuangWBViewMediator = TuiGuangWBViewMediator;
    __reflect(TuiGuangWBViewMediator.prototype, "mx.TuiGuangWBViewMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=TuiGuangWBViewMediator.js.map