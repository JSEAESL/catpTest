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
/**
 * @author cy
 * @date 2017.10.16
 * 上龙国
 */
var mx;
(function (mx) {
    var ActyXXGScreen = (function (_super) {
        __extends(ActyXXGScreen, _super);
        function ActyXXGScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ActyXXGScreen.mx_support = function () {
            return ["assets.acty_xxg_main"];
        };
        ActyXXGScreen.prototype.init_view_by_type = function () {
            var arr = [{ "bg": "slcxuan_png" }, { "bg": "slfxuan_png" }, { "bg": "sldxuan_png" }];
            this.fun_list.itemRenderer = mx.SSButtonRender;
            this.fun_list.dataProvider = new eui.ArrayCollection(arr);
            this.smbg_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sm_click, this);
            this.closesm_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sm_click, this);
            this.sm_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sm_click, this);
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back_click, this);
            this.fun_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.tab_click, this);
            if (mx.Tools.check_user_locals(mx.MX_COMMON.MX_SLGXXIU)) {
                this.sming_g.visible = true;
            }
        };
        ActyXXGScreen.prototype.back_click = function (e) {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
        };
        ActyXXGScreen.prototype.sm_click = function (e) {
            this.sming_g.visible = !this.sming_g.visible;
        };
        ActyXXGScreen.prototype.tab_click = function (e) {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_XXG_INITXXIU,
                "type": e.itemIndex + 1
            });
        };
        ActyXXGScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.smbg_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sm_click, this);
            this.closesm_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sm_click, this);
            this.sm_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sm_click, this);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back_click, this);
            this.fun_list.dataProvider = null;
            this.fun_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.tab_click, this);
        };
        ActyXXGScreen.S_NAME = "ActyXXGScreen";
        return ActyXXGScreen;
    }(mx.AlertView));
    mx.ActyXXGScreen = ActyXXGScreen;
    __reflect(ActyXXGScreen.prototype, "mx.ActyXXGScreen");
})(mx || (mx = {}));
//# sourceMappingURL=ActyXXGScreen.js.map