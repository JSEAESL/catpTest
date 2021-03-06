/**
   @author qianjun、dingyunfeng
*   @date 2016.9.5
*   @desc 换装+评分界面mediator
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
    var ZhuanPanCJViewMediator = (function (_super) {
        __extends(ZhuanPanCJViewMediator, _super);
        function ZhuanPanCJViewMediator(viewComponent) {
            return _super.call(this, ZhuanPanCJViewMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(ZhuanPanCJViewMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        ZhuanPanCJViewMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.ZHUANPAN_START,
            ];
        };
        ZhuanPanCJViewMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.ZHUANPAN_START:
                    view.zhuanpan(data);
                    break;
                default:
                    break;
            }
        };
        ZhuanPanCJViewMediator.NAME = "ZhuanPanCJViewMediator";
        return ZhuanPanCJViewMediator;
    }(puremvc.Mediator));
    mx.ZhuanPanCJViewMediator = ZhuanPanCJViewMediator;
    __reflect(ZhuanPanCJViewMediator.prototype, "mx.ZhuanPanCJViewMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ZhuanPanCJViewMediator.js.map