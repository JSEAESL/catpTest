/**
   @author dingyunfeng
*   @date 2018.1.5
*   @desc 推广员主界面mediator
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
    var TuiGuangYuanViewMediator = (function (_super) {
        __extends(TuiGuangYuanViewMediator, _super);
        function TuiGuangYuanViewMediator(viewComponent) {
            return _super.call(this, TuiGuangYuanViewMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(TuiGuangYuanViewMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        TuiGuangYuanViewMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CPOP,
            ];
        };
        TuiGuangYuanViewMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CPOP:
                    view.fresh_view(); //抽奖结束、加好友刷新
                    break;
                default:
                    break;
            }
        };
        TuiGuangYuanViewMediator.NAME = "TuiGuangYuanViewMediator";
        return TuiGuangYuanViewMediator;
    }(puremvc.Mediator));
    mx.TuiGuangYuanViewMediator = TuiGuangYuanViewMediator;
    __reflect(TuiGuangYuanViewMediator.prototype, "mx.TuiGuangYuanViewMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=TuiGuangYuanViewMediator.js.map