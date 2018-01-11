/**
 @author cy
 *   @date 2016.11.3
 *   @desc 养心殿-一览
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
    var XQSendGiftViewMediator = (function (_super) {
        __extends(XQSendGiftViewMediator, _super);
        function XQSendGiftViewMediator(viewComponent) {
            return _super.call(this, XQSendGiftViewMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(XQSendGiftViewMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(XQSendGiftViewMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        XQSendGiftViewMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.ITEM_NUM_CHANGED,
                mx.MX_NOTICE.CURRENCY_CHANGED
            ];
        };
        XQSendGiftViewMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.ITEM_NUM_CHANGED:
                    view.fresh_view(data);
                    break;
                case mx.MX_NOTICE.CURRENCY_CHANGED:
                    view.fresh_currency();
                    break;
            }
        };
        XQSendGiftViewMediator.NAME = "XQSendGiftViewMediator";
        return XQSendGiftViewMediator;
    }(puremvc.Mediator));
    mx.XQSendGiftViewMediator = XQSendGiftViewMediator;
    __reflect(XQSendGiftViewMediator.prototype, "mx.XQSendGiftViewMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=XQSendGiftViewMediator.js.map