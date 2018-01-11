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
*   @author qianjun
*   @date 2015.1.3
*   @desc 战斗加速
**/
var mx;
(function (mx) {
    var ZhandouJiasuView = (function (_super) {
        __extends(ZhandouJiasuView, _super);
        function ZhandouJiasuView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.speed = 1;
            return _this;
        }
        ZhandouJiasuView.mx_support = function () {
            return ["assets.zdjsu"];
        };
        ZhandouJiasuView.prototype.init_view_by_type = function () {
            var view = this;
            var data = this.adata || {};
            egret.localStorage.setItem("fight_speed", 'true');
            view.qxiao_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.qren_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.qren_click, this);
            view.sel_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            var speed = Number(egret.localStorage.getItem("play_speed"));
            if (!speed) {
                speed = 1;
                egret.localStorage.setItem("play_speed", "1");
            }
            this.speed = speed;
            view.sel_list.selectedIndex = speed - 1;
        };
        ZhandouJiasuView.prototype.close_self = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN);
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, ZhandouJiasuView.S_NAME);
        };
        ZhandouJiasuView.prototype.onTabChange = function (e) {
            this.speed = Number(e.item.speed);
        };
        ZhandouJiasuView.prototype.qren_click = function () {
            egret.localStorage.setItem("play_speed", this.speed + "");
            this.close_self();
        };
        ZhandouJiasuView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            this.sel_list.dataProvider = null;
            view.qxiao_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.qren_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.qren_click, this);
            view.sel_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
        };
        ZhandouJiasuView.S_NAME = "ZhandouJiasuView";
        return ZhandouJiasuView;
    }(mx.AlertView));
    mx.ZhandouJiasuView = ZhandouJiasuView;
    __reflect(ZhandouJiasuView.prototype, "mx.ZhandouJiasuView");
})(mx || (mx = {}));
//# sourceMappingURL=ZhandouJiasuView.js.map