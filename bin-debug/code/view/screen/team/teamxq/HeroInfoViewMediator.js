/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 主页界面Mediator
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
    var HeroInfoViewMediator = (function (_super) {
        __extends(HeroInfoViewMediator, _super);
        function HeroInfoViewMediator(viewComponent) {
            return _super.call(this, HeroInfoViewMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(HeroInfoViewMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        HeroInfoViewMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.ITEM_NUM_CHANGED,
                mx.MX_NOTICE.GUIDE_INFO,
            ];
        };
        HeroInfoViewMediator.prototype.handleNotification = function (notification) {
            var view = this.view;
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.ITEM_NUM_CHANGED:
                    view.fresh_num(data);
                    break;
                case mx.MX_NOTICE.GUIDE_INFO:
                    this.show_guide(data);
                    break;
                default:
                    break;
            }
        };
        HeroInfoViewMediator.prototype.show_guide = function (gkey) {
            var view = this.view;
            switch (gkey) {
                case "v_xx_dh":
                    var tar = view.get_b;
                    var evt = new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP);
                    tar.dispatchEvent(evt);
                    break;
            }
        };
        HeroInfoViewMediator.NAME = "HeroInfoViewMediator";
        return HeroInfoViewMediator;
    }(puremvc.Mediator));
    mx.HeroInfoViewMediator = HeroInfoViewMediator;
    __reflect(HeroInfoViewMediator.prototype, "mx.HeroInfoViewMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=HeroInfoViewMediator.js.map