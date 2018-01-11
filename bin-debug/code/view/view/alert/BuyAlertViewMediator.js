/**
 *   @author qianjun
 *   @date 2014.12.28
 *   @desc 界面Mediator
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
    var BuyAlertViewMediator = (function (_super) {
        __extends(BuyAlertViewMediator, _super);
        function BuyAlertViewMediator(viewComponent) {
            return _super.call(this, BuyAlertViewMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(BuyAlertViewMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        BuyAlertViewMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.BUY_NUM_FRESH,
            ];
        };
        BuyAlertViewMediator.prototype.handleNotification = function (notification) {
            var view = this.view;
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.BUY_NUM_FRESH:
                    view.fresh_cishu(data);
                    break;
                default:
                    break;
            }
        };
        BuyAlertViewMediator.NAME = "BuyAlertViewMediator";
        return BuyAlertViewMediator;
    }(puremvc.Mediator));
    mx.BuyAlertViewMediator = BuyAlertViewMediator;
    __reflect(BuyAlertViewMediator.prototype, "mx.BuyAlertViewMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=BuyAlertViewMediator.js.map