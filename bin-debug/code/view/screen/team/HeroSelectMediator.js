/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 团队主页界面Mediator
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
    var HeroSelectMediator = (function (_super) {
        __extends(HeroSelectMediator, _super);
        function HeroSelectMediator(viewComponent) {
            var _this = _super.call(this, HeroSelectMediator.NAME, viewComponent) || this;
            if (mx.MX_COMMON.IN_GUIDE) {
                if (Math.abs(mx.Tools.screen_height - mx.MX_COMMON.GS_HEIGHT) < 4) {
                    _this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                }
                else {
                    _this.view.g_g.addEventListener(eui.UIEvent.MOVE, _this.mx_test, _this);
                }
            }
            return _this;
        }
        HeroSelectMediator.prototype.mx_test = function (event) {
            this.view.g_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
            this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
        };
        Object.defineProperty(HeroSelectMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        HeroSelectMediator.prototype.onRemove = function () {
            this.view.g_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
        };
        HeroSelectMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.GUIDE_INFO,
            ];
        };
        HeroSelectMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.GUIDE_INFO:
                    this.show_guide(data);
                    break;
                default:
                    break;
            }
        };
        HeroSelectMediator.prototype.show_guide = function (gkey) {
            var view = this.view;
            var tar, evt;
            switch (gkey) {
                case "v_bd_l2"://编队-站位2
                    tar = view.hero_list.getChildAt(1);
                    evt = new eui.ItemTapEvent(eui.ItemTapEvent.ITEM_TAP);
                    evt.item = tar.data;
                    view.hero_list.dispatchEvent(evt);
                    this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                    break;
                case "v_bd_l3":
                    tar = view.hero_list.getChildAt(2);
                    evt = new eui.ItemTapEvent(eui.ItemTapEvent.ITEM_TAP);
                    evt.item = tar.data;
                    view.hero_list.dispatchEvent(evt);
                    this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                    break;
                case "v_bd_l4":
                    tar = view.hero_list.getChildAt(3);
                    evt = new eui.ItemTapEvent(eui.ItemTapEvent.ITEM_TAP);
                    evt.item = tar.data;
                    view.hero_list.dispatchEvent(evt);
                    break;
                case "v_bd_bc"://保存
                    tar = view.quere_b;
                    evt = new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP);
                    tar.dispatchEvent(evt);
                    break;
                default:
                    break;
            }
        };
        HeroSelectMediator.NAME = "HeroSelectMediator";
        return HeroSelectMediator;
    }(puremvc.Mediator));
    mx.HeroSelectMediator = HeroSelectMediator;
    __reflect(HeroSelectMediator.prototype, "mx.HeroSelectMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=HeroSelectMediator.js.map