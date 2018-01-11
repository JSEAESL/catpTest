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
    var HeiShiShangJiaViewMediator = (function (_super) {
        __extends(HeiShiShangJiaViewMediator, _super);
        function HeiShiShangJiaViewMediator(viewComponent) {
            return _super.call(this, HeiShiShangJiaViewMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(HeiShiShangJiaViewMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        HeiShiShangJiaViewMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.HEISHI_SELECT_ZN,
            ];
        };
        HeiShiShangJiaViewMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.HEISHI_SELECT_ZN:
                    view.fresh_view(data);
                    break;
            }
        };
        HeiShiShangJiaViewMediator.NAME = "HeiShiShangJiaViewMediator";
        return HeiShiShangJiaViewMediator;
    }(puremvc.Mediator));
    mx.HeiShiShangJiaViewMediator = HeiShiShangJiaViewMediator;
    __reflect(HeiShiShangJiaViewMediator.prototype, "mx.HeiShiShangJiaViewMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=HeiShiShangJiaViewMediator.js.map